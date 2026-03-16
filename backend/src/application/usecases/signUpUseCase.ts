import { IUserRepository } from "../repositories/iUserRepository"
import bcrypt from "bcrypt"

export class SignupUser {

  constructor(private userRepo: IUserRepository) {}

  async signup(name: string, email: string, password: string, role: "user"|"host") {

    const existingUser = await this.userRepo.findByEmail(email)

    if (existingUser) {
      throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
      userName:name,
      email,
      password: hashedPassword,
      role,
      creditBalance: 100,
      createdAt: new Date()
    }

    return await this.userRepo.createUser(user)

  }

}