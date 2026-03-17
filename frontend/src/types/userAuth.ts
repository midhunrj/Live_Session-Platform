export interface User {
  _id?: string;
  email: string;
  userName: string;
  password: string;
  role:string,
  creditBalance?:number
}
export interface Session {
  _id?: string;
  hostId: string;
  title: string;          
  description?: string;     
  status: "active" | "ended";
  startedAt: Date;
  endedAt?: Date;
  totalViewers: number;
  totalCredits: number;
}
export interface Transaction {
  _id: string
  senderId: string
  hostId: string
  credits: number
  createdAt: string
}
export interface RegisterPayload {
  email: string;
  password: string;
  userName: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}