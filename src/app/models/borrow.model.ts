import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowBooks = new Schema<IBorrow>({
    book: {type: Schema.Types.ObjectId, ref: 'Books', required: true},
    quantity: {type: Number, required:true, min: 1},
    dueDate: {type: Date, required: true},
},
{timestamps: true})

export const BorrowBooks = model<IBorrow>('BorrowBooks', borrowBooks);