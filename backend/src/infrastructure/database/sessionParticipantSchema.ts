import mongoose from "mongoose";

const sessionParticipantSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  joinedAt: {
    type: Date,
    default: Date.now
  }
});

export const SessionParticipantModel = mongoose.model(
  "SessionParticipant",
  sessionParticipantSchema
);