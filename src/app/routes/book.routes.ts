import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook, } from '../controllers/book.controller';

const BooksRouter = express.Router();

BooksRouter.post('/books', createBook);
BooksRouter.get('/books', getBooks);
BooksRouter.get('/books/:id', getBookById);
BooksRouter.put('/edit-book/:id', updateBook);
BooksRouter.delete('/books/:id', deleteBook);

export default BooksRouter