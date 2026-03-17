import axios from "axios";
import type { Session } from "../types/userAuth";
import { userServices } from "../utils/userInterceptor";


export const createSession = async (sessionData:Session): Promise<Session> => {
  const res = await userServices.post("/session/create", sessionData);
  return res.data;
};


export const getHostSessions = async (hostId: string): Promise<Session[]> => {
  const res = await userServices.get(`/session/host/${hostId}`);
  return res.data;
};
export const getActiveSessions = async (): Promise<Session[]> => {
  console.log("getactivesession");
  
  const res = await userServices.get("/session/active");
  console.log(res,"result active session");
  
  return res.data.data;
};

export const getSessionStats = async (sessionId: string): Promise<Session> => {
  const res = await userServices.get(`/session/${sessionId}`);
  return res.data;
};

export const joinSession = async (sessionId: string, userId: string) => {
  return userServices.post(`/session/${sessionId}/join`, { userId });
};

export const leaveSession = async (sessionId: string, userId: string) => {
  return userServices.post(`/session/${sessionId}/leave`, { userId });
};

export const getViewerCount = async (sessionId: string): Promise<number> => {
  const res = await userServices.get(`/session/${sessionId}/viewers`);
  return res.data.count;
};