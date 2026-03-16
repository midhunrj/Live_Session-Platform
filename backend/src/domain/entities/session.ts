// import mongoose from "mongoose";

// export interface Session {
//   _id?: mongoose.Types.ObjectId;
//   hostId: string;
//   status: string|"active" | "ended";
//   startedAt: Date;
//   endedAt?: Date;
//   // duration?: number;
//   totalViewers: number;
//   totalCredits: number;
// }

import mongoose from "mongoose";

export interface Session {
  _id?: mongoose.Types.ObjectId;
  hostId: string;
  title: string;           // Add this
  description?: string;     // Add this (optional)
  status: "active" | "ended";
  startedAt: Date;
  endedAt?: Date;
  totalViewers: number;
  totalCredits: number;
}