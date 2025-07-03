import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook, } from '../controllers/book.controller';

const BooksRouter = express.Router();

BooksRouter.post('/books', createBook);
BooksRouter.get('/books', getBooks);
BooksRouter.get('/books/:bookId', getBookById);
BooksRouter.patch('/books/:bookId', updateBook);
BooksRouter.delete('/books/:bookId', deleteBook);

export default BooksRouter