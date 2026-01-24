// const express = require('express'); -->syntax for CommonJS
import express from 'express'; // --> syntax for ES6 modules
import { ENV } from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';

const app = express();

const __dirname = path.resolve();



app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Api is running suceessfully' });
});
app.get('/books', (req, res) => {
    res.status(200).json({ message: 'this is the books end point' });
});




// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}



const startServer = async ()=>{
  try{
   await connectDB();
    app.listen(ENV.PORT, () =>console.log(`Server is running on port ${ENV.PORT}`));
  }catch(error){
    console.error('Failed to start server:', error);
  }
}

startServer();