import mongoose from "mongoose";
const choiceSchema=mongoose.Schema({
    choice:{
        type:String,
        required:true
    },
    votes:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],pollid:{
        type:mongoose.Types.ObjectId,
        ref:"Poll"
    }
})
export default mongoose.model("Choice",choiceSchema);