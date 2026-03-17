import { ITransactionRepository } from "../../application/repositories/iTransactionRepository";
import { Transaction } from "../../domain/entities/transaction";
import { TransactionModel } from "../database/creditTransactionSchema";

export class TransactionRepository implements ITransactionRepository
{
    async saveTransaction(transactionData: Transaction): Promise<void> {
      console.log("creating transaction",transactionData);
      
   const newTransaction= await TransactionModel.create(transactionData);
   console.log(newTransaction,"newTransact");
   
  }

  async getTransactions(sessionId: string): Promise<any[]> {
    console.log("getting transaction");
    
    return await TransactionModel.find({ sessionId }).sort({ timestamp: -1 });
  }
}