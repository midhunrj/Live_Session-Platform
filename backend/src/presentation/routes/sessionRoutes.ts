import express from "express";
import { SessionController } from "../controllers/sessionController";

import { StartingSessionUsecase } from "../../application/usecases/startSession";
import { JoinSessionUsecase } from "../../application/usecases/joinSession";
import { EndSessionUsecase } from "../../application/usecases/endSession";
import { SessionStats } from "../../application/usecases/getSessionStats";

import { SessionRepository } from "../../infrastructure/sessionRepository";

const sessionRouter = express.Router();

const sessionRepo = new SessionRepository();

const startSessionUsecase = new StartingSessionUsecase(sessionRepo);
const joinSessionUsecase = new JoinSessionUsecase(sessionRepo);
const endSessionUsecase = new EndSessionUsecase(sessionRepo);
const sessionStatsUsecase = new SessionStats(sessionRepo);

const sessionController = new SessionController(
  startSessionUsecase,
  joinSessionUsecase,
  endSessionUsecase,
  sessionStatsUsecase
);

sessionRouter.post("/create", sessionController.startSession.bind(sessionController));

sessionRouter.get("/active", sessionController.getActiveSessions.bind(sessionController));

sessionRouter.post("/:sessionId/end", sessionController.endSession.bind(sessionController));

sessionRouter.post("/:sessionId/join", sessionController.joinSession.bind(sessionController));

sessionRouter.post("/:sessionId/leave", sessionController.leaveSession.bind(sessionController));

sessionRouter.get("/:sessionId", sessionController.getSessionStats.bind(sessionController));

sessionRouter.get("/:sessionId/viewers", sessionController.getViewerCount.bind(sessionController));

sessionRouter.get("/host/:hostId", sessionController.getHostSessions.bind(sessionController));

sessionRouter.get("/:sessionId/participants", sessionController.getParticipants.bind(sessionController));

// // Get active session for a specific host
// sessionRouter.get("/host/:hostId/active", sessionController.getActiveHostSession.bind(sessionController));

export default sessionRouter;