// import mongoose from "mongoose";

// const sessionSchema = new mongoose.Schema({
//   hostId: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ["active", "ended"],
//     default: "active"
//   },
//   startedAt: {
//     type: Date,
//     default: Date.now
//   },
//   endedAt: {
//     type: Date
//   },
//   totalViewers: {
//     type: Number,
//     default: 0
//   },
//   totalCredits: {
//     type: Number,
//     default: 0
//   }
// });

// export const SessionData = mongoose.model("Session", sessionSchema);

import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  hostId: {
    type: String,
    required: true
  },
  title: {              // Add this field
    type: String,
    required: true
  },
  description: {        // Add this field
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["active", "ended"],
    default: "active"
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: {
    type: Date
  },
  totalViewers: {
    type: Number,
    default: 0
  },
  totalCredits: {
    type: Number,
    default: 0
  }
});

export const SessionData = mongoose.model("Session", sessionSchema);