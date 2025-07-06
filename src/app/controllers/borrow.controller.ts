import { Request, Response } from "express";
import { Books } from "../models/book.model";
import { BorrowBooks } from "../models/borrow.model";

// Borrow a book
export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { quantity, dueDate } = req.body;
    const bookId = req.params.bookId;

    const book = await Books.findById(bookId);

    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
      return;
    }

     if (quantity > book.copies) {
       res.status(400).json({
        success: false,
        message: `Cannot borrow more than ${book.copies} copies`,
      });
    }

    book.copies -= quantity;
    book.updateAvailability?.(); 
    await book.save();

    const borrow = await BorrowBooks.create({ book: bookId, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
};

// Borrow summary report
export const borrowSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const summary = await BorrowBooks.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
