import mongoose from "mongoose";

export interface SessionParticipant
{
  _id?:mongoose.Types.ObjectId,
  userId:mongoose.Types.ObjectId,
  sessionId:mongoose.Types.ObjectId,
  joinedAt:Date
}