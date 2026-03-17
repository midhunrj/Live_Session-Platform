export interface ITransactionRepository{
    saveTransaction(transactionData: any): Promise<void> 
    getTransactions(sessionId: string): Promise<any[]> 
}