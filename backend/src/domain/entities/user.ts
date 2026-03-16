import mongoose from "mongoose";

export interface User {
  _id?: mongoose.Types.ObjectId;
  userName: string;
  email: string;
  password:string;
  role: "user" | "host";
  creditBalance?: number;
  created_at?: Date;
}