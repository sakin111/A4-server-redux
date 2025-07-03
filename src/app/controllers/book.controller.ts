import { Request, Response } from "express";
import { Books } from "../models/book.model";


// Create a new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Books.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
};

// Get books with optional filter
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter = req.query.filter ? { genre: req.query.filter } : {};
    const sortBy = req.query.sortBy as string || 'createdAt';
    const sortOrder = req.query.sort === 'desc' ? -1 : 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const books = await Books.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};


// Get book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Books.findById(req.params.bookId);


    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Books.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
      return;
    }
     await Books.updateBookAvailability(req.params.bookId);


    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.bookId;
    const book = await Books.findByIdAndDelete(id);

    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error,
    });
  }
};
