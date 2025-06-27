import express from "express";
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import cookieParser  from "cookie-parser";
app.use(cookieParser());

app.use(express.json());
const PORT = 4000 || process.env.PORT;

app.listen(PORT , ()=>{
    console.log(`App is listening at Port no ${PORT}`);
})

import auth from "./routes/auth.js";
app.use("/api/v1" , auth);

import dbconnect from "./config/database.js";

dbconnect();

app.get("/", (req,res)=>{
    res.send("kya hall chal !!");
})

import errorHandler from "./middlewares/errorHandler.js";
app.use(errorHandler);
