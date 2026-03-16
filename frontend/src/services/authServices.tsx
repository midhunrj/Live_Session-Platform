import axios from "axios";
import type { LoginPayload, RegisterPayload } from "../types/userAuth";
import { userServices } from "../utils/userInterceptor";




export const registerUser = async (data: RegisterPayload) => {
  const res = await userServices.post("/register", data);
  console.log("return of register",res)
  return res.data;
};

export const loginUser = async (data: LoginPayload) => {
    console.log("hey hi ");
    
  const res = await userServices.post("/login", data);
  console.log(res,"return of login");
  
  return res.data;
};