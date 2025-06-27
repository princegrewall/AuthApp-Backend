import auth from "../models/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
//import { options } from ("../routes/authModel.js");
import dotenv from 'dotenv';
import { z } from "zod";
import crypto from "crypto";
dotenv.config();

const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["Admin", "Student", "Visitor"]).optional()
});

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required")
});

export const signup  = async(req,res) =>{
    try{
        const parsed = signupSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: parsed.error.errors.map(e => e.message).join(", ")
            });
        }
        const {name , email , password , role} = parsed.data;
        const exitingUser = await auth.findOne({email});

        if(exitingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }
         let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password',
            });
        }

        //create entry for User
        const user = await auth.create({
            name,email,password:hashedPassword,role
        })

        // Generate JWT
        const payload = {
            email: user.email,
            role: user.role,
            id: user._id 
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
            token
        });
    }
    catch(error){
       return  res.status(400).json({
            success : false,
            message : error.message || "Error in Signup controller"
        })
    }
}

export const login = async(req,res) =>{
    try{
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: parsed.error.errors.map(e => e.message).join(", ")
            });
        }
        const {email , password} = parsed.data;
        let user = await auth.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email is not present in database"
            });
        }
        const payload = {
            email: user.email,
            role: user.role,
            id: user._id 
        };
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user = user.toObject(); 
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            return res.cookie("myCookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User Logged in successfully',
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    }
    catch(error){
       return res.status(400).json({
            success : false,
            message : error.message || "Error in login controller"
        })
    }
};

// Get Current User API (Protected)
export const getCurrentUser = async (req, res) => {
    try {
        const user = await auth.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Error fetching user info"
        });
    }
};


//export default {login , signup};
