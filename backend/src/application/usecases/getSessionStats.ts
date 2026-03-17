import { Session } from "../../domain/entities/session";

export class SessionStats {
  constructor(private sessionRepo: any) {}

  async getSessionStats(sessionId: string) {
    return this.sessionRepo.findById(sessionId);
  }

  async getViewerCount(sessionId: string) {
    const session = await this.sessionRepo.findById(sessionId);
    return session?.totalViewers || 0;
  }

  async getActiveSessions() {
    return this.sessionRepo.findActiveSessions();
  }
   
  async getSessionsByHost(hostId: string):Promise<Session[]|[]> {

  const sessions = await this.sessionRepo.findByHostId(hostId);

  return sessions;

}
}