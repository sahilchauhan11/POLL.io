import mongoose from "mongoose";
import pollModel from "../models/pollModel.js";
import choiceModel from "../models/choiceModel.js";
import userModel from "../models/userModel.js";
import { io } from "../index.js";
// Click on a choice
export async function choiceclick(req, res) {
    const choiceClickId = req.params.id; 
    const userId = req.id;  
    try {

        // Find the clicked choice
        const choice = await choiceModel.findById(choiceClickId);
        if (!choice) {
            return res.status(400).json({ success: false, message: "Choice not found" });
        }

        // Check if the user has already voted for this choice
        if (!choice.votes.includes(mongoose.Types.ObjectId(userId))) {
            // Add the user to the votes of the new choice
            choice.votes.push(mongoose.Types.ObjectId(userId));
            await choice.save();
        } else {
            io.emit("pollUpdated", poll);
            // User has already voted for this choice
            return res.status(200).json({ success: true, message: "Choice already selected" });
        }

        // Find the poll associated with the choice
        const pollId = choice.pollid.toString();
       

        // Find the user
        const user = await userModel.findById(userId).select("-password -email");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update the user's choiceId
        const existingVoteIndex = user.choicesId.findIndex(item => item.pollId === pollId);
        if (existingVoteIndex !== -1) {
            const previousChoiceId = user.choicesId[existingVoteIndex].choiceId.toString();

            // Remove the userId from the previous choice's votes
            const previousChoice = await choiceModel.findById(previousChoiceId);
            if (previousChoice) {
                previousChoice.votes = previousChoice.votes.filter(vote => vote.toString() !== userId);
                await previousChoice.save();
            }

            // Update the user's choiceId
            user.choicesId[existingVoteIndex].choiceId = choiceClickId;
        } else {
            // If no previous vote exists, add the new vote
            user.choicesId.push({ choiceId: choiceClickId, pollId: pollId });
        }
        const poll = await pollModel.findById(pollId);
        if (!poll) {
            return res.status(404).json({ success: false, message: "Poll not found" });
        }
        await poll.populate("options");
await poll.save()
        // Save the user data after updating their choice
        await user.save();

        // Emit the updated poll to all connected clients
        io.emit("pollUpdated", poll);
        return res.status(200).json({ success: true, message: "Choice updated successfully", poll });
    } catch (error) {
       
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
