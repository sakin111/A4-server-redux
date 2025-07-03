import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';


const dotenv = require('dotenv')
dotenv.config()

let server : Server
const Port = process.env.PORT || 5000;

const name = process.env.db_name
const password = process.env.db_password




async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${name}:${password}@cluster0.ubtwufv.mongodb.net/Library?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('mongodb connected successfully');
      server = app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
 
    
  } catch (error) {
    console.error('Failed to connect to MongoDB or start server:', error);
    process.exit(1); // Exit the process with failure code
  }
}


main()

