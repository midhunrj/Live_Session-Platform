import { Session } from "../../domain/entities/session";
import { SessionParticipant } from "../../domain/entities/sessionParticipant";

export interface ISessionRepository {
    createSession(session:Session):Promise<Session>
    endsession(sessionId:string):Promise<void>
    findById(sessionId:string):Promise<Session|null>
    findActiveSessionByHost(hostId: string): Promise<Session | null>
    incrementViewers(sessionId:string):Promise<void>
    addCredits(sessionId:string,credits:number):Promise<void>

    addParticipant(sessionId:string,userId:string):Promise<SessionParticipant>


}


// export interface ISessionRepository {
//   ;
//   createSession(session: Session): Promise<Session>;
//   endSession(sessionId: string): Promise<void>;
//   findById(sessionId: string): Promise<Session | null>;
//   incrementViewers(sessionId: string): Promise<void>;
//   addCredits(sessionId: string, credits: number): Promise<void>;
// }