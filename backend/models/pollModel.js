import mongoose from "mongoose";
const pollSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "Choice"
        }],
        default: [],
     
    },
    
}, { timestamps: true });
export default mongoose.model("Poll", pollSchema);