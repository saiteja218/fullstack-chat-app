import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path:"./src/.env"})
// console.log(process.env.MONGO_URI);

const mongoURI = process.env.MONGO_URI  ;  

export const connectDB=async ()=>{
    try{
        // console.log("MongoDB URI:", mongoURI);  
        const conn= await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(err){
        console.log(`MongoDB connection Error: ${err.message}`)
      
    }
}   
   