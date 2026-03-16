import axios from "axios";
import type { Transaction } from "../types/userAuth";
import { userServices } from "../utils/userInterceptor";



export const sendCredits = async (
  sessionId: string,
  senderId: string,
  hostId: string,
  amount: number
) => {
  return userServices.post("/credits/send", {
    sessionId,
    senderId,
    hostId,
    amount
  });
};

export const getTransactions = async (
  sessionId: string
): Promise<Transaction[]> => {
  const res = await userServices.get(`/credits/${sessionId}`);
  return res.data;
};