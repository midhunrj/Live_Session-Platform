import { Request, Response } from "express";
import { CreditsUsecase } from "../../application/usecases/creditsUsecase";

export class CreditController {
  constructor(private creditsUsecase: CreditsUsecase) {}

  async send(req: Request, res: Response) {
    try {
      const { senderId, sessionId,hostId, amount } = req.body;
           console.log(req.body,"credit send request");
           
      if (!senderId || !sessionId || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: "senderId, sessionId, and credits are required" 
        });
      }

      await this.creditsUsecase.sendCredits(senderId, sessionId,hostId, amount);
       console.log("passstatus in credits");
       
      res.status(200).json({ 
        success: true,
        message: "Credits sent successfully" 
      });

    } catch (error: any) {
      res.status(400).json({ 
        success: false,
        message: error.message 
      });
    }
  }

  async getTransactions(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;

      if (!sessionId) {
        return res.status(400).json({ 
          success: false, 
          message: "sessionId is required" 
        });
      }

      const transactions = await this.creditsUsecase.getTransactions(sessionId as string);
         console.log("returning transactions",transactions);
         
      res.status(200).json({
        success: true,
        data: transactions
      });
    } catch (error: any) {
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
}