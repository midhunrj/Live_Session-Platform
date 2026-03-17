export interface Transaction {
  _id?: string;
  sessionId: string;
  senderId: string;
  hostId: string;
  credits: number;
  created_at: Date;
}