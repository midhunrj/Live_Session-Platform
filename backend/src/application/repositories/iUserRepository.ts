import { User } from "../../domain/entities/user";


export interface IUserRepository {
   createUser(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>;
  updateCredits(userId: string, amount: number): Promise<void>;
}