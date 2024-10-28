import express from "express";
import { createPoll, findPoll } from "../controllers/pollController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router=express.Router();
router.get("/",(req,res)=>{
    res.send("home page")
})
router.post("/create",isAuthenticated,createPoll)
router.get("/find/:id",isAuthenticated,findPoll)
export default router;