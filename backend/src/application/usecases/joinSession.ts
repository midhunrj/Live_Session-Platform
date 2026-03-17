export class JoinSessionUsecase {
  constructor(private sessionRepo: any) {}

  async JoinSession(sessionId: string, userId: string) {

    const session = await this.sessionRepo.findById(sessionId);

    if (!session || session.status !== "active") {
      throw new Error("Session not active");
    }

    const existingParticipant = await this.sessionRepo.findParticipant(sessionId, userId);
    if (existingParticipant) {
      console.log("User already in session");
      return; 
    }

    await this.sessionRepo.addParticipant(sessionId, userId);

    await this.sessionRepo.incrementViewers(sessionId);
  }

async leaveSession(sessionId: string, userId: string) {
  const session = await this.sessionRepo.findById(sessionId);
  
  if (!session) {
    throw new Error("Session not found");
  }
  
  await this.sessionRepo.removeParticipant(sessionId, userId);
  await this.sessionRepo.decrementViewers(sessionId);
}
}