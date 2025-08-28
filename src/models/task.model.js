import mongoose,{Schema}  from "mongoose";

const taskSchema=new Schema({
    title:{
        type:String,
        required: true,
        trim:false
    },
    description:{
        type:String,
        required: true,
        trim:false
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required: "true"
    }

},{timestamps: true})

export const Task= mongoose.model("Task", taskSchema)

