import { IUserRepository } from "../repositories/iUserRepository"
import bcrypt from "bcrypt"

export class LoginUser {

  constructor(private userRepo: IUserRepository) {}

  async login(email: string, password: string) {

    const user = await this.userRepo.findByEmail(email)

    if (!user) {
      throw new Error("Invalid credentials")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      throw new Error("Invalid credentials")
    }

    return user
  }

}