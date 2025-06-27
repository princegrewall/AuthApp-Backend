import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const dbconnect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
    })
    .then(()=>{console.log("DataBase is connected successfully")})
    .catch((error)=>{console.log("DataBase not connected")});
}

export default dbconnect;