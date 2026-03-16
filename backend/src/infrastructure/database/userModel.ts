import mongoose, { Mongoose } from "mongoose";

const userData=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["host","user"],
        required:true,
    },
    creditBalance:{
        type:Number,
        required:true
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
})
export const userModel=mongoose.model("user",userData)