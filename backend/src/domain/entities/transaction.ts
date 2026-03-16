export interface Transaction {
  _id?: string;
  session_id: string;
  sender_id: string;
  host_id: string;
  credits: number;
  created_at: Date;
}