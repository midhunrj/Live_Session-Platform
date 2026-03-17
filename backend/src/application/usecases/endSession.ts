export class EndSessionUsecase {
  constructor(private sessionRepo: any) {}

  async endSession(sessionId: string) {

    console.log("greg");
    
    const session = await this.sessionRepo.findById(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }
      console.log("prejo");
      
    await this.sessionRepo.endSession(sessionId);
  }
}