import { model, Schema } from "mongoose";
import { IBook, IBookModel } from "../interfaces/book.interfaces";


const bookSchema = new Schema<IBook>({
    title :{type:String, required : true},
    author:{type: String, required : true},
    genre: {type: String, enum:['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'], required: true},
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: { type: Number, required: true,
         min:[0, 'copies must me a positive number']},
    available: { type: Boolean, default: true },
   
},
{timestamps: true})

bookSchema.statics.updateBookAvailability = async function (bookId: string) {
const book= await this .findById(bookId)
if(book){
    book.available = book.copies > 0 ;
    book.save();
}
};

bookSchema.pre('save', function(next){
    this.available = this.copies > 0;
    console.log(`[PRE] Book "${this.title}" is being saved with availability: ${this.available}`);
    next();
})

bookSchema.post('save', function (doc) {
  console.log(`[POST] Book "${doc.title}" saved successfully with availability: ${doc.available}`);
});

export const Books = model<IBook, IBookModel>('Books', bookSchema);