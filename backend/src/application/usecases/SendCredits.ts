import { ISessionRepository } from "../repositories/iSessionRepository";
import { IUserRepository } from "../repositories/iUserRepository";

export class CreditsUsecase {

  constructor(
    private userRepo: IUserRepository,
    private sessionRepo: ISessionRepository
    
  ) {}

  async sendCredits(senderId: string, sessionId: string, credits: number) {

    const sender = await this.userRepo.findById(senderId);

    if (!sender) {
      throw new Error("User not found");
    }

    if (sender.creditBalance! < credits) {
      throw new Error("Insufficient credits");
    }

    const session = await this.sessionRepo.findById(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    await this.userRepo.updateCredits(senderId, -credits);
    await this.userRepo.updateCredits(session.hostId, credits);

    await this.sessionRepo.addCredits(sessionId, credits);
  }
}