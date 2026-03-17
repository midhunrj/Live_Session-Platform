import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true
  },

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  credits: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const TransactionModel = mongoose.model(
  "CreditTransaction",
  TransactionSchema
);