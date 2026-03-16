export class EndSessionUsecase {
  constructor(private sessionRepo: any) {}

  async endSession(sessionId: string) {

    const session = await this.sessionRepo.findById(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    await this.sessionRepo.endSession(sessionId);
  }
}