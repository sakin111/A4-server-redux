import { Schema } from "mongoose";
import { IBook } from "./book.interfaces";


export interface IBorrow extends Document{
book: Schema.Types.ObjectId | IBook;
quantity: number;
dueDate: Date;
}