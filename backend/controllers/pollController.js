import mongoose from "mongoose";
import pollModel from "../models/pollModel.js";
import choiceModel from "../models/choiceModel.js";
export const createPoll = async (req, res) => {
   
    try {
        const { question, options } = req.body;
        if (!question || !options.length) {
            return res.status(400).json({ success: false, message: "incomplete poll" })
        }
        const userid = req.id;
        const poll = await pollModel.create({ question:question });
       
        await Promise.all(options.map(async (element) => {
            if(element){
            const option = await choiceModel.create({ choice: element, pollid: poll._id });
            poll.options.push(option._id);
            console.log(option)}
        }));
        await poll.save();
        return res.status(200).json({ success: true, message: "poll created",poll })
    } catch (err) {
        
        return res.status(500).json({ success: false, message: err.message })
    }
}
export const findPoll=async(req,res)=>{
   try {
    const pollId=req.params.id;
    const poll= await pollModel.findById(pollId);
  
    if(!poll){
       

        return res.status(404).json({success:false,message:"no such poll"});
    }
    await poll.populate("options")
    return res.status(200).json({success:true,poll,message:"poll found"})
   } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
   }
}