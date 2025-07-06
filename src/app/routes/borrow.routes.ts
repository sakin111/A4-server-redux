import express from 'express';
import { borrowBook, borrowSummary } from '../controllers/borrow.controller';

const BorrowRouter = express.Router();
BorrowRouter.post('/borrow/:bookId', borrowBook);
BorrowRouter.get('/borrow', borrowSummary);


export default BorrowRouter;