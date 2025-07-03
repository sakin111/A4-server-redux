import mongoose, { Model } from "mongoose";

export interface IBook extends Document{
  _id : mongoose.Types.ObjectId;
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
    createdAt: Date; 
  updatedAt: Date; 
  updateAvailability(): void;
}


export interface IBookModel extends Model<IBook> {
   updateBookAvailability(bookId:string): Promise<IBook>;
}