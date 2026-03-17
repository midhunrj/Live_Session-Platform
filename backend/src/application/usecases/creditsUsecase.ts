import { Transaction } from "../../domain/entities/transaction";
import { ITransactionRepository } from "../repositories/iTransactionRepository";
import { ISessionRepository } from "../repositories/iSessionRepository";
import { IUserRepository } from "../repositories/iUserRepository";

export class CreditsUsecase {

  constructor(
    private userRepo: IUserRepository,
    private sessionRepo: ISessionRepository,
    private transactionRepo:ITransactionRepository
    
  ) {}

  async sendCredits(senderId: string, sessionId: string,hostId:string, credits: number) {

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
     console.log("reached at updating credits");
     
    await this.userRepo.updateCredits(senderId, -credits);
    await this.userRepo.updateCredits(hostId, credits);

    await this.sessionRepo.addCredits(sessionId, credits);

     await this.transactionRepo.saveTransaction({
      sessionId,
      senderId,
      hostId,
       credits,
      timestamp: new Date()
    });
  }

  async getTransactions(sessionId: string): Promise<Transaction[]> {
   
    return await this.transactionRepo.getTransactions(sessionId);
  }
}