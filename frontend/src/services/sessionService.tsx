import axios from "axios";
import type { Session } from "../types/userAuth";
import { userServices } from "../utils/userInterceptor";


export const createSession = async (sessionData: {
  title: string;
  description: string;
  host_id: string;
}): Promise<Session> => {
  const res = await userServices.post("/session/create", sessionData);
  return res.data;
};

// Get all sessions for a host
export const getHostSessions = async (hostId: string): Promise<Session[]> => {
  const res = await userServices.get(`/session/host/${hostId}`);
  return res.data;
};
export const getActiveSessions = async (): Promise<Session[]> => {
  const res = await userServices.get("/session/active");
  return res.data;
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