import express from "express";
import { CreditController } from "../controllers/creditController";

import { SessionRepository } from "../../infrastructure/sessionRepository";
import { CreditsUsecase } from "../../application/usecases/SendCredits";
import { UserRepository } from "../../infrastructure/repository/userRepository";

const creditRouter = express.Router();

const userRepo = new UserRepository();
const sessionRepo = new SessionRepository();

const sendCreditsUsecase = new CreditsUsecase(userRepo, sessionRepo);

const creditController = new CreditController(sendCreditsUsecase);

creditRouter.post("/send", creditController.send.bind(creditController));

export default creditRouter;