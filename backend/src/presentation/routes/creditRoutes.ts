import express from "express";
import { CreditController } from "../controllers/creditController";

import { SessionRepository } from "../../infrastructure/sessionRepository";
import { CreditsUsecase } from "../../application/usecases/creditsUsecase";
import { UserRepository } from "../../infrastructure/repository/userRepository";
import { TransactionRepository } from "../../infrastructure/repository/TransactionRepository";

const creditRouter = express.Router();

const userRepo = new UserRepository();
const transactRepo=new TransactionRepository()
const sessionRepo = new SessionRepository();

const sendCreditsUsecase = new CreditsUsecase(userRepo, sessionRepo,transactRepo);

const creditController = new CreditController(sendCreditsUsecase);

creditRouter.post("/send", creditController.send.bind(creditController));

creditRouter.get("/:sessionId", creditController.getTransactions.bind(creditController))

export default creditRouter;