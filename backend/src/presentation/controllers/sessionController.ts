import { Request, Response } from "express";
import { StartingSessionUsecase,} from "../../application/usecases/startSession";
import { JoinSessionUsecase } from "../../application/usecases/joinSession";
import { EndSessionUsecase } from "../../application/usecases/endSession";
import { SessionStats } from "../../application/usecases/getSessionStats";
import { Session } from "../../domain/entities/session";

export class SessionController {

  constructor(private startingSession: StartingSessionUsecase,
    private joiningSession: JoinSessionUsecase,
    private endOfSession: EndSessionUsecase,
    private sessionStats: SessionStats
  ) {}

  // async start(req: Request, res: Response) {

  //   try {
  //     const { hostId } = req.body;

  //     const session = await this.startingSession.startSession(hostId);

  //     res.json(session);

  //   } catch (error:any) {

  //     res.status(400).json({ message: error.message });
  //   }
  // }
   async startSession (req: Request, res: Response) {
    try {

      let { hostId } = req.body;
      console.log(req.body,"rsnnksnk");
      hostId=req.body._id

      const session = await this.startingSession.startSession(hostId,req.body as any);
      console.log("returning new session data",session);
      
      return res.status(201).json({
        success: true,
        data: session
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message
      });

    }
  }

  async endSession(req: Request, res: Response) {
    try {

      const { sessionId } = req.body;

      await this.endOfSession.endSession(sessionId);

      return res.status(200).json({
        success: true,
        message: "Session ended successfully"
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message
      });

    }
  }


  async joinSession(req: Request, res: Response) {
   try {

      const { sessionId } = req.params;
      const { userId } = req.body;

      await this.joiningSession.JoinSession(sessionId as string, userId);

      return res.status(200).json({
        success: true,
        message: "User joined session"
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message
      });

    }
  };

  async getSessionStats(req: Request, res: Response){
   try {

      const { sessionId } = req.params;

      const session = await this.sessionStats.getSessionStats(sessionId as string);

      return res.status(200).json({
        success: true,
        data: session
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message
      });

    }
  }

  async getViewerCount(req: Request, res: Response) {
    try {

      const { sessionId } = req.params;

      const viewers = await this.sessionStats.getViewerCount(sessionId as string);

      return res.status(200).json({
        success: true,
        count: viewers
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message
      });

    }
  }

  async getActiveSessions(req: Request, res: Response) {
    try {
      console.log("comeon active");
      
      const sessions = await this.sessionStats.getActiveSessions();
      console.log("return active",sessions);
      
      return res.status(200).json({
        success: true,
        data: sessions
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message
      });

    }
  }    

}