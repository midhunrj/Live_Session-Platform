import React, { useState, useEffect } from "react";
import { Video, VideoOff, Users, Coins, LogOut, TrendingUp } from "lucide-react";
import { useAuthContext } from "../context/authContext";
import type { Session } from "../types/userAuth";
import { useNavigate } from "react-router-dom";
import { createSession, endingSession, getHostSessions, getParticipants, getSessionStats } from "../services/sessionService";

const HostPage = () => {

  const { user, logout } = useAuthContext();

  const [activeSession, setActiveSession] = useState<Session|null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [activeViewers, setActiveViewers] = useState(0);
  const [participants, setParticipants] = useState<any[]>([]);
  const [error, setError] = useState("");
  const navigate=useNavigate()
  const getRealUserId = () => {
    console.log("realuerID",user);
    
    return user?.data?._id || user?._id;
  };

useEffect(() => {
  if (!activeSession?._id) return;

  const interval = setInterval(async () => {
    try {
      const statsRes = await getSessionStats(activeSession._id!);
      console.log(statsRes, "status response");
      
      setActiveViewers(statsRes.data.totalViewers);
      setActiveSession(prev =>
        prev ? {
          ...prev,
          totalCredits: statsRes.data.totalCredits,
          totalViewers: statsRes.data.totalViewers
        } : prev
      );
    } catch (err) {
      console.error("Stats error", err);
    }

    try {
      console.log("heiloo");
      const participantsRes = await getParticipants(activeSession._id!);
      console.log("participant response", participantsRes);
      
      if (participantsRes?.data && Array.isArray(participantsRes.data)) {
        setParticipants(participantsRes.data);
      } else if (Array.isArray(participantsRes)) {
        setParticipants(participantsRes);
      } else {
        setParticipants([]);
      }
    } catch (err) {
      console.error("Participants error", err);
      setParticipants([]); 
    }
  }, 3000);

  return () => clearInterval(interval);
}, [activeSession]);


useEffect(() => {
  const fetchSessions = async () => {
    const hostId = getRealUserId();
    if (!hostId) return;

    try {
      const res = await getHostSessions(hostId);
      console.log("result of sessions by host", res);
      
      // Handle different response structures
      const sessionsData = res?.data || res || [];
      setSessions(Array.isArray(sessionsData) ? sessionsData : []);


      const active = sessionsData.find((s: Session) => s.status === "active");
      if (active) {
        setActiveSession(active);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessions([]);
    }
  };

  fetchSessions();
}, []);

console.log(activeSession,"Activesession");
console.log(sessions,"sessions");


console.log(user,"userData in hostpage");
  const startSession = async(e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (activeSession) {
      setError("You already have an active session");
      return;
    }

    const newSession:Session = {
       hostId: getRealUserId(),
      title,
      description,
      status: "active",
      totalViewers: 0,
      totalCredits: 0,
      startedAt: new Date()
    };
const res = await createSession(newSession);
console.log("res in host page",res);

setActiveSession(res.data);
setSessions((prev) => [res.data, ...prev]);

    setTitle("");
    setDescription("");
    setError("");
  };

const setLogout=()=>
{
  logout()
  navigate('/')
}

  const endSession = async () => {
  if (!activeSession?._id) return;

  try {
    await endingSession(activeSession._id);

    const updatedSessions = sessions.map((s) =>
      s._id === activeSession._id
        ? { ...s, status: "ended" as const, endedAt: new Date() }
        : s
    );

    setSessions(updatedSessions);
    setActiveSession(null);
    setActiveViewers(0);

  } catch (err) {
    console.error("Error ending session", err);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      <div className="max-w-7xl mx-auto p-6">



        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Host Dashboard
            </h1>

            <p className="text-slate-600 mt-1">
              Welcome back, {user?.data?.userName}
            </p>

          </div>


          <div className="flex items-center gap-4">

            <div className="bg-white px-4 py-2 rounded-lg shadow border">

              <div className="flex items-center gap-2">

                <Coins className="text-yellow-500" size={20} />

                <span className="font-semibold">
                  {user?.data?.creditBalance}
                </span>

                <span className="text-sm text-slate-600">
                  credits
                </span>

              </div>

            </div>


            <button
              onClick={setLogout}
              className="flex items-center gap-2 px-4 py-2 hover:bg-white rounded-lg"
            >
              <LogOut size={20} />
              Sign Out
            </button>

          </div>

        </div>




        {activeSession ? (

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-green-500">

            <div className="flex justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold">
                  {activeSession.title}
                </h2>

                <p className="text-slate-600">
                  {activeSession.description}
                </p>

              </div>

              <span className="bg-green-100 text-green-700 font-bold px-4 py-2 my-6 text-center  rounded-full">
                LIVE
              </span>

            </div>



            <div className="grid grid-cols-3 gap-6 mb-6">

              <div className="bg-slate-50 rounded-xl p-4">

                <Users size={20} />

                <p className="text-2xl font-bold">
                  {activeViewers}
                </p>

                <p>Active Viewers</p>

              </div>


              <div className="bg-slate-50 rounded-xl p-4">

                <TrendingUp size={20} />

                <p className="text-2xl font-bold">
                  {activeSession.totalViewers}
                </p>

                <p>Total Viewers</p>

              </div>


              <div className="bg-slate-50 rounded-xl p-4">

                <Coins size={20} />

                <p className="text-2xl font-bold">
                  {activeSession.totalCredits}
                </p>

                <p>Credits</p>

              </div>

            </div>


            <button
              onClick={endSession}
              className="w-full bg-red-600 text-white py-3 rounded-lg"
            >
              <VideoOff size={20} className="inline mr-2 cursor-pointer" />
              End Session
            </button>

          </div>

        ) : (

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

            <h2 className="text-2xl font-bold mb-6">
              Start New Session
            </h2>


            <form onSubmit={startSession} className="space-y-4">
              
              

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Session Title"
                className="w-full border p-3 rounded-lg"
                required
              />


              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border p-3 rounded-lg"
              />


              {error && (
                <p className="text-red-500">{error}</p>
              )}


              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg"
              >
                <Video size={20} className="inline mr-2" />
                Start Session
              </button>

            </form>

          </div>

        )}




        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Session History
          </h2>


          {sessions.length === 0 ? (

            <p>No sessions yet</p>

          ) : (

            sessions.map((session:Session) => (

              <div
                key={session._id}
                className="border rounded-lg p-4 mb-4 space-y-2"
              >

                <h3 className="font-bold text-lg">
                  {session.title}
                </h3>

                <div className="w-full">
                   <p className="text-slate-600 break-words whitespace-pre-wrap">
                     {session.description}
                   </p>
                </div>

                <p className="font-bold flex justify-start gap-2">Status: <span className="text-green-600"> {session.status}</span></p>
                  {activeSession?._id === session._id && (
  <div className="bg-slate-50 rounded-xl p-4">
    <p className="font-bold mb-2">Participants</p>

    {participants.length === 0 ? (
      <p>No users joined</p>
    ) : (
      participants.map((p) => (
        <p key={p.userId}>{p.userName}</p>
      ))
    )}
  </div>
)}
              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
};

export default HostPage;