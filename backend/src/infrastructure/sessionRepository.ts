
import { ISessionRepository } from "../application/repositories/iSessionRepository"
import { Session } from "../domain/entities/session";
import { SessionParticipant } from "../domain/entities/sessionParticipant";
import { SessionData } from "./database/sessionModel";
import { SessionParticipantModel } from "./database/sessionParticipantSchema";
import { userModel } from "./database/userModel";

export class SessionRepository implements ISessionRepository {
   async createSession(session:Session):Promise<Session>
   {
    console.log("jango njn vanne");
    
  //     const createdSession = await SessionData.create(session);
      
  //    console.log(createdSession,"createdsession");
     
  // return createdSession.toObject() as Session
  try {
      const createdSession = await SessionData.create(session);
      console.log("createdsession:", createdSession);
      return createdSession.toObject() as Session;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    }
   }
    async endsession(sessionId:string):Promise<void>
    {
         await  SessionData.findByIdAndUpdate(sessionId, {
      status: "ended",
      endedAt: new Date()
    });
    }
    async findById(sessionId:string):Promise<Session|null>
    {
       const session_id=await SessionData.findById(sessionId)
       return session_id as any
    }
    async findActiveSessionByHost(hostId: string): Promise<Session | null>
    {
       const session=await SessionData.findOne({hostId,status:"Active"})
       console.log(session,"session active data");
       
       return session as Session
    }
    async incrementViewers(sessionId:string):Promise<void>
    {
        await SessionData.findByIdAndUpdate(
            sessionId,
            {$inc:{totalViewers:1}}
        )
    }
    async addCredits(sessionId:string,credits:number):Promise<void>
      {
        await SessionData.findByIdAndUpdate(sessionId,
            {$inc:{totalCredits:credits}}
        )
      }

      async addParticipant(sessionId: string, userId: string):Promise<SessionParticipant> {
    return SessionParticipantModel.create({
      sessionId,
      userId
    });
  }

  async findActiveSessions() {
    
    const activeSessions=await SessionData.find({ status: "active" });
    console.log("activesession from repository",activeSessions);
    const hostIds = [...new Set(activeSessions.map(s => s.hostId))];
    

    const hosts = await userModel.find({ 
      _id: { $in: hostIds } 
    }).lean();
    
    const hostMap = new Map(
      hosts.map(host => [host._id.toString(), host])
    );
    
     return activeSessions.map(session => ({
    _id: session._id.toString(),
    hostId: session.hostId,
    title: session.title,
    description: session.description || '',
    status: session.status as "active" | "ended",
    startedAt: session.startedAt,
    endedAt: session.endedAt || undefined,
    totalViewers: session.totalViewers || 0,
    totalCredits: session.totalCredits || 0,
    profiles: {
      userName: hostMap.get(session.hostId)?.userName || 'Unknown'
    }
  }));
  }
  

async removeParticipant(sessionId: string, userId: string): Promise<void> {
  await SessionParticipantModel.findOneAndDelete({
    sessionId,
    userId,
    leftAt: null
  });
}

async decrementViewers(sessionId: string): Promise<void> {
  await SessionData.findByIdAndUpdate(
    sessionId,
    { $inc: { totalViewers: -1 } }
  );
}

async findByHostId(hostId: string): Promise<Session[]> {

  const sessions = await SessionData.find({ hostId }).sort({ createdAt: -1 });

   return sessions.map(session => {
      const sessionObj = session.toObject();
      return {
        ...sessionObj,
        _id: sessionObj._id,
        endedAt: sessionObj.endedAt || undefined 
      } as Session;
    });

}
  
}