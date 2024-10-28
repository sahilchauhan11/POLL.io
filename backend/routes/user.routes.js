import express from "express";
import {  loginUser,logout,register } from "../controllers/userController.js";
const router=express.Router();

router.post("/login",loginUser)
router.get("/logout",logout)
router.post("/register",register)
export default router; 