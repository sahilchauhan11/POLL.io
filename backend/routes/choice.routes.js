import express from "express";
import { choiceclick } from "../controllers/choiceController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router=express.Router();


router.get("/:id",isAuthenticated,choiceclick);
export default router;