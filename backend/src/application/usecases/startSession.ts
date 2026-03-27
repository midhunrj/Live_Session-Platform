
import { Session } from "../../domain/entities/session";
import { ISessionRepository } from "../repositories/iSessionRepository";

export class StartingSessionUsecase {
  constructor(private sessionRepo: ISessionRepository) {}

  async startSession(hostId: string,sessionData:any) {

    const activeSession = await this.sessionRepo.findActiveSessionByHost(hostId);

    if (activeSession) {
      throw new Error("Host already has an active session");
    }
console.log("jknkjnkj");

    const newSessionData =  {
      hostId: hostId, 
      title: sessionData.title,
      description: sessionData.description,
      status: "active" as "active",
      startedAt:  sessionData.startedAt || new Date(),
      totalViewers:  sessionData.totalViewers || 0,
      totalCredits:  sessionData.totalCredits || 0
    };
    return await this.sessionRepo.createSession(newSessionData);
  }
}