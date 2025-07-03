"# A3-assignment" 
# A3-assignment

A RESTful API for managing a library's books and borrowing system, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- Add, update, delete, and retrieve books
- Borrow books and track borrow records
- Get summary reports of borrowed books
- Input validation and error handling

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)

## Project Structure

```
src/
  app/
    controllers/
      book.controller.ts
      borrow.controller.ts
    interfaces/
      book.interfaces.ts
      borrow.interface.ts
    models/
      book.model.ts
      borrow.model.ts
    routes/
      book.routes.ts
      borrow.routes.ts
    utils/
      errorHandler.ts
  app.ts
  server.ts
README.md
package.json
tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd A3-assignment
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure MongoDB connection in `src/server.ts`.

### Running the Server

Start the development server:
```sh
npm run dev
```

The server will run on [http://localhost:5000](http://localhost:5000).

## API Endpoints

### Books

- `POST   /api/books`         - Create a new book
- `GET    /api/books`         - Get all books (with optional filters)
- `GET    /api/books/:bookId` - Get a book by ID
- `PATCH  /api/books/:bookId` - Update a book
- `DELETE /api/books/:bookId` - Delete a book

### Borrow

- `POST   /api/borrow`        - Borrow a book  
  Example request body:
  ```json
  {
    "book": "<bookId>",
    "quantity": 1,
    "dueDate": "2025-07-01"
  }
  ```
  Example success response:
  ```json
  {
    "success": true,
    "message": "Book borrowed successfully",
    "data": {
      "_id": "...",
      "book": "...",
      "quantity": 1,
      "dueDate": "2025-07-01T00:00:00.000Z",
      "__v": 0
    }
  }
  ```

- `GET    /api/borrow`        - Get borrow summary report  
  Example response:
  ```json
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": {
          "title": "Book Title",
          "isbn": "1234567890"
        },
        "totalQuantity": 3
      }
    ]
  }
  ```

## Error Handling

All errors are returned in JSON format with appropriate HTTP status codes.  
Example error response:
```json
{
  "success": false,
  "message": "Validation failed",
  "error": { /* error details */ }
}
```

