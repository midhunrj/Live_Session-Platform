export class JoinSessionUsecase {
  constructor(private sessionRepo: any) {}

  async JoinSession(sessionId: string, userId: string) {

    const session = await this.sessionRepo.findById(sessionId);

    if (!session || session.status !== "active") {
      throw new Error("Session not active");
    }

    await this.sessionRepo.addParticipant(sessionId, userId);

    await this.sessionRepo.incrementViewers(sessionId);
  }
  // In joinSession.ts
async leaveSession(sessionId: string, userId: string) {
  const session = await this.sessionRepo.findById(sessionId);
  
  if (!session) {
    throw new Error("Session not found");
  }
  
  await this.sessionRepo.removeParticipant(sessionId, userId);
  await this.sessionRepo.decrementViewers(sessionId);
}
}