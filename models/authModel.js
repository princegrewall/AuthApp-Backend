import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type  : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    createdAt :{
        type : Date,
        required : true,
        default : Date.now
    },
    updatedAt :{
        type : Date,
        required : true,
        default : Date.now
    },
    role:{
        type:String,
        enum:["Admin", "Student", "Visitor"]
    }
});

const auth = mongoose.model("auth" , SignupSchema)
export default auth;
