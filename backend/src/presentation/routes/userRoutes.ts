import express from "express"

import { UserController } from "../controllers/userController"
import { UserRepository } from "../../infrastructure/repository/userRepository"
import { SignupUser } from "../../application/usecases/signUpUseCase"
import { LoginUser } from "../../application/usecases/loginUsecase"

const userRouter = express.Router()

const userRepo = new UserRepository()

const signupUsecase = new SignupUser(userRepo)
const loginUsecase = new LoginUser(userRepo)

const userController = new UserController(
  signupUsecase,
  loginUsecase
)

userRouter.post("/register", userController.signup.bind(userController))

userRouter.post("/login", userController.login.bind(userController))
userRouter.post("/logout", userController.logout.bind(userController))

export default userRouter