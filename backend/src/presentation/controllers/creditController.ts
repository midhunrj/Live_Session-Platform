import { Request, Response } from "express";
import { CreditsUsecase } from "../../application/usecases/SendCredits";

export class CreditController {

  constructor(private sendingCredits: CreditsUsecase) {}

  async send(req: Request, res: Response) {

    try {

      const { senderId, sessionId, credits } = req.body;

      await this.sendingCredits.sendCredits(senderId, sessionId, credits);

      res.json({ message: "Credits sent successfully" });

    } catch (error:any) {

      res.status(400).json({ message: error.message });
    }
  }
}
