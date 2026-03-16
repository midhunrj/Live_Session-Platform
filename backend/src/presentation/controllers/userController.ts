import { Request, Response, NextFunction } from "express"
import { SignupUser } from "../../application/usecases/signUpUseCase"
import { LoginUser } from "../../application/usecases/loginUsecase"


export class UserController {

  constructor(
    private signupUsecase: SignupUser,
    private loginUsecase: LoginUser
  ) {}

  async signup(req: Request, res: Response, next: NextFunction) {

    try {

        console.log(req.body,"req body");
        
      const { userName, email, password, role } = req.body

      const user = await this.signupUsecase.signup(
        userName,
        email,
        password,
        role
      )

      res.status(201).json({
        success: true,
        data: user
      })

    } catch (error) {
      next(error)
    }

  }

  async login(req: Request, res: Response, next: NextFunction) {

    try {

      const { email, password } = req.body
console.log(req.body,"request of login")
      const user = await this.loginUsecase.login(email, password)
       console.log(user,"result user")
      res.status(200).json({
        success: true,
        data: user
      })

    } catch (error) {
      next(error)
    }

  }

  async logout(req: Request, res: Response) {

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });

}

}