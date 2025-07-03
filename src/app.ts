
import { Application, Request, Response, } from "express";
import express from "express";
import BooksRouter from "./app/routes/book.routes";
import BorrowRouter from "./app/routes/borrow.routes";
import { errorHandler } from "./app/utils/errorHandler";

const app : Application = express()


app.use(express.json());
app.use('/api', BooksRouter);
app.use('/api',BorrowRouter);
app.use(errorHandler);

app.get("/" ,(req : Request, res: Response) =>{
    res.status(200).json({
        message: "Welcome to the Express Application"
    })
})
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});


export default app;