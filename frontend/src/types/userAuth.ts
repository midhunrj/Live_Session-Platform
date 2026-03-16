export interface User {
  _id?: string;
  email: string;
  userName: string;
  password: string;
  role:string,
  creditBalance?:number
}
export interface Session {
  _id: string
  host_id: string
  title: string
  description: string
  status: "active" | "ended"
  total_viewers: number
  total_credits_received: number
  started_at: string
  ended_at?: string
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