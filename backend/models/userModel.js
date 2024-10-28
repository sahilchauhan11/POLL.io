import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    choicesId:[{
    choiceId:String,
    pollId:String
    }]
    
    
    
}, { timestamps: true })
export default mongoose.model("User", userSchema);