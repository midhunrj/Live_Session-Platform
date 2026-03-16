import { IUserRepository } from "../../application/repositories/iUserRepository"
import { User } from "../../domain/entities/user"
import { userModel } from "../database/userModel"


export class UserRepository implements IUserRepository {

  async createUser(user: User): Promise<User> {

    const newUser = await userModel.create(user)

    return newUser.toObject() as User
  }

  async findByEmail(email: string): Promise<User | null> {

    return await userModel.findOne({ email }).lean()

  }

  async findById(userId: string): Promise<User | null> {

    return await userModel.findById(userId).lean()

  }

  async updateCredits(userId: string, amount: number): Promise<void> {

    await userModel.findByIdAndUpdate(userId, {
      $inc: { creditBalance: amount }
    })

  }

}