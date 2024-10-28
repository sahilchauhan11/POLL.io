import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import choiceModel from "../models/choiceModel.js";
import jwt from "jsonwebtoken";
export async function register(req, res) {
    let { username, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required", success: false });
    }

    try {
        let user = await userModel.findOne({ email }).select("-password");
        if (user) {

            return res.status(400).json({ message: "User already exists", success: false });

        }
        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err;
                password = hash;
                user = await userModel.create({ username, email, password: hash });
                const token = jwt.sign({ userId: user._id, email,  }, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res.status(201).cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 30 * 24 * 60 * 60 * 1000 }).json({ message: "User created successfully", success: true ,user});
            }) 
        })
  
    }
    catch (err) {
        return res.status(500).json({ message: err.message, success: false });
    }

}
export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" })
           
        }
        bcrypt.compare(password, user.password, (err, success) => {
            if (success) {
                const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
                
                return res.status(200).cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 30 * 24 * 60 * 60 * 1000 }).json({ success: true, message: "user  found", user })
            } else {
                return res.status(200).json({ success: false, message: "incorrect credentials" })
            }
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
export  async function getProfile(req, res) {
    try {
        const userId = req.id;
        const porfileId = req.params.porfileId;
        const user = await userModel.findById(userId).select("-password");
        const clickedProfile = await userModel.findById(porfileId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" })
        }
        if (!clickedProfile) {
            return res.status(400).json({ success: false, message: "profile not found" })
        }
        if (userId == porfileId) {
            return res.status(201).json({ profile: clickedProfile, success: true });
        }
       
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
export default async function getAllvoter(req, res) {
    try {
        const choiceId = req.params.id;
        const userId = req.id;
        const user = await userModel.findById(userId);
        const choices = await choiceModel.findById(choiceId).populate("votes").select("-password");
        const poll = await pollModel.findById(choice.pollid); 
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" })
        }
        if (poll && poll.owner.toString() === userId.toString()) {
         
            return res.status(200).json({ success: true, choices });

        }

        return res.status(403).json({ success: false, message: "Unauthorized access" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

}
export async function logout(req,res){
    try{
       
        return res.cookie("token", "", {
            httpOnly: true,
          
            sameSite: 'strict',
            maxAge: 0  // Effectively deletes the cookie
        }).json({
            message: 'Logged out successfully.',
            success: true
        });
    }catch(err){
       return res.status(500).json({message:"Internal server error",success:false});
    }
}

