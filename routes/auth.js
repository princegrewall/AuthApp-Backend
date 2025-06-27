import express from "express";
const router = express.Router();

import { login , signup, getCurrentUser} from "../controllers/auth.js";
import {auth, isStudent,isAdmin} from "../middlewares/auth.js";

router.post("/auth/signup", signup);
router.post("/auth/login" , login); 

router.get("/student", auth, isStudent, (req,res) => {
    return res.json({
        success:true,
        message:'Welcome to the Protected route for Students',
    });
} );

router.get("/admin", auth, isAdmin, (req,res) => {
    return res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});

router.get("/auth/me", auth, getCurrentUser);

export default router;