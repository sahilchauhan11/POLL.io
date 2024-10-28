import mongoose from "mongoose";
import pollModel from "../models/pollModel.js";
import choiceModel from "../models/choiceModel.js";
export const createPoll = async (req, res) => {
   
    try {
        console.log("working")
        const { question, options } = req.body;
        if (!question || !options.length) {
            return res.status(400).json({ success: false, message: "incomplete poll" })
        }
        console.log(question);
        console.log(options);
        const userid = req.id;
        console.log(userid)
        const poll = await pollModel.create({ question:question });
        console.log(poll)
       
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
    console.log(pollId)
    const poll= await pollModel.findById(pollId);
  
    if(!poll){
       

        return res.status(404).json({success:false,message:"no such poll"});
    }
    console.log(poll);
    await poll.populate("options")
 console.log("after", "populating")
        console.log(poll);
    return res.status(200).json({success:true,poll,message:"poll found"})
   } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
   }
}