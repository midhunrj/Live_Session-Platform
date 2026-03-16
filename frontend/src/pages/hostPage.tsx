// import React from 'react'
// import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';


// import { Video, VideoOff, Users, Coins, LogOut, TrendingUp } from 'lucide-react';
// import { useAuthContext } from '../context/authContext';
// import type { Session } from '../types/userAuth';

// const HostPage=()=> {
//   const { user, logout } = useAuthContext();
//   const [activeSession, setActiveSession] = useState<Session | null>(null);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [activeViewers, setActiveViewers] = useState(0);

//   useEffect(() => {
//     if (user) {
//       loadSessions();
//       loadActiveSession();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (activeSession) {
//       const interval = setInterval(() => {
//         loadActiveViewers();
//       }, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [activeSession]);

//   const loadSessions = async () => {
//     if (!user) return;

//     const { data, error } = await supabase
//       .from('sessions')
//       .select('*')
//       .eq('host_id', user._id)
//       .order('created_at', { ascending: false });

//     if (!error && data) {
//       setSessions(data);
//     }
//   };

//   const loadActiveSession = async () => {
//     if (!user) return;

//     const { data, error } = await supabase
//       .from('sessions')
//       .select('*')
//       .eq('host_id', user._id)
//       .eq('status', 'active')
//       .maybeSingle();

//     if (!error && data) {
//       setActiveSession(data);
//       loadActiveViewers();
//     }
//   };

//   const loadActiveViewers = async () => {
//     if (!activeSession) return;

//     const { count } = await supabase
//       .from('session_participants')
//       .select('*', { count: 'exact', head: true })
//       .eq('session_id', activeSession._id)
//       .is('left_at', null);

//     setActiveViewers(count || 0);
//   };

//   const startSession = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;

//     setLoading(true);
//     setError('');

//     try {
//       const { data: existingSession } = await supabase
//         .from('sessions')
//         .select('*')
//         .eq('host_id', user._id)
//         .eq('status', 'active')
//         .maybeSingle();

//       if (existingSession) {
//         throw new Error('You already have an active session. Please end it before starting a new one.');
//       }

//       const { data, error } = await supabase
//         .from('sessions')
//         .insert({
//           host_id: user._id,
//           title,
//           description,
//         })
//         .select()
//         .single();

//       if (error) throw error;

//       setActiveSession(data);
//       setTitle('');
//       setDescription('');
//       loadSessions();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to start session');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const endSession = async () => {
//     if (!activeSession || !user) return;

//     setLoading(true);
//     try {
//       await supabase
//         .from('session_participants')
//         .update({ left_at: new Date().toISOString() })
//         .eq('session_id', activeSession._id)
//         .is('left_at', null);

//       const { error } = await supabase
//         .from('sessions')
//         .update({
//           status: 'ended',
//           ended_at: new Date().toISOString(),
//         })
//         .eq('id', activeSession._id);

//       if (error) throw error;

//       setActiveSession(null);
//       loadSessions();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to end session');
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">Host Dashboard</h1>
//             <p className="text-slate-600 mt-1">Welcome back, {user?.userName}</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
//               <div className="flex items-center gap-2">
//                 <Coins className="text-yellow-500" size={20} />
//                 <span className="font-semibold text-slate-900">{user?.creditBalance}</span>
//                 <span className="text-sm text-slate-600">credits</span>
//               </div>
//             </div>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
//             >
//               <LogOut size={20} />
//               Sign Out
//             </button>
//           </div>
//         </div>

//         {activeSession ? (
//           <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-green-500">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="bg-green-500 p-3 rounded-full">
//                   <Video className="text-white" size={24} />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-slate-900">{activeSession.title}</h2>
//                   <p className="text-slate-600">{activeSession.description}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
//                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-green-700 font-semibold">LIVE</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-6 mb-6">
//               <div className="bg-slate-50 rounded-xl p-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Users className="text-blue-600" size={20} />
//                   <span className="text-sm font-medium text-slate-600">Active Viewers</span>
//                 </div>
//                 <p className="text-3xl font-bold text-slate-900">{activeViewers}</p>
//               </div>
//               <div className="bg-slate-50 rounded-xl p-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <TrendingUp className="text-green-600" size={20} />
//                   <span className="text-sm font-medium text-slate-600">Total Viewers</span>
//                 </div>
//                 <p className="text-3xl font-bold text-slate-900">{activeSession.total_viewers}</p>
//               </div>
//               <div className="bg-slate-50 rounded-xl p-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Coins className="text-yellow-600" size={20} />
//                   <span className="text-sm font-medium text-slate-600">Credits Received</span>
//                 </div>
//                 <p className="text-3xl font-bold text-slate-900">{activeSession.total_credits_received}</p>
//               </div>
//             </div>

//             <button
//               onClick={endSession}
//               disabled={loading}
//               className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               <VideoOff size={20} />
//               End Session
//             </button>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//             <h2 className="text-2xl font-bold text-slate-900 mb-6">Start a New Session</h2>
//             <form onSubmit={startSession} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Session Title
//                 </label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                   placeholder="Enter session title"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   rows={3}
//                   placeholder="Describe your session"
//                 />
//               </div>
//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//                   {error}
//                 </div>
//               )}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 <Video size={20} />
//                 Start Session
//               </button>
//             </form>
//           </div>
//         )}

//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-slate-900 mb-6">Session History</h2>
//           <div className="space-y-4">
//             {sessions.length === 0 ? (
//               <p className="text-slate-500 text-center py-8">No sessions yet</p>
//             ) : (
//               sessions.map((session) => (
//                 <div
//                   key={session._id}
//                   className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="text-lg font-semibold text-slate-900">{session.title}</h3>
//                       <p className="text-slate-600 text-sm">{session.description}</p>
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         session.status === 'active'
//                           ? 'bg-green-100 text-green-700'
//                           : 'bg-slate-100 text-slate-700'
//                       }`}
//                     >
//                       {session.status}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-3 gap-4 text-sm">
//                     <div>
//                       <span className="text-slate-600">Total Viewers:</span>
//                       <span className="font-semibold text-slate-900 ml-2">{session.total_viewers}</span>
//                     </div>
//                     <div>
//                       <span className="text-slate-600">Credits Received:</span>
//                       <span className="font-semibold text-slate-900 ml-2">{session.total_credits_received}</span>
//                     </div>
//                     <div>
//                       <span className="text-slate-600">Started:</span>
//                       <span className="font-semibold text-slate-900 ml-2">
//                         {new Date(session.started_at).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// export default HostPage




import React, { useState, useEffect } from "react";
import { Video, VideoOff, Users, Coins, LogOut, TrendingUp } from "lucide-react";
import { useAuthContext } from "../context/authContext";
import type { Session } from "../types/userAuth";
import { useNavigate } from "react-router-dom";
import { createSession } from "../services/sessionService";

const HostPage = () => {

  const { user, logout } = useAuthContext();

  const [activeSession, setActiveSession] = useState<Session|null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [activeViewers, setActiveViewers] = useState(0);
  const [error, setError] = useState("");
  const navigate=useNavigate()
  useEffect(() => {
    if (activeSession) {

      const interval = setInterval(() => {
        setActiveViewers((prev) => prev + Math.floor(Math.random() * 2));
      }, 3000);

      return () => clearInterval(interval);
    }

  }, [activeSession]);



  const startSession = async(e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (activeSession) {
      setError("You already have an active session");
      return;
    }

    const newSession:Session = {
      _id: Date.now().toString(),
       host_id: user?._id || "",
      title,
      description,
      status: "active",
      total_viewers: 0,
      total_credits_received: 0,
      started_at: new Date().toISOString()
    };
     await createSession(newSession)
    setActiveSession(newSession);
    setSessions((prev) => [newSession, ...prev]);

    setTitle("");
    setDescription("");
    setError("");
  };

const setLogout=()=>
{
  logout()
  navigate('/')
}

  const endSession = () => {

    if (!activeSession) return;

    const updatedSessions:Session[] = sessions.map((s:Session) =>
      s._id === activeSession._id
        ? { ...s, status: "ended", ended_at: new Date().toISOString() }
        : s
    );

    setSessions(updatedSessions);
    setActiveSession(null);
    setActiveViewers(0);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      <div className="max-w-7xl mx-auto p-6">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Host Dashboard
            </h1>

            <p className="text-slate-600 mt-1">
              Welcome back, {user?.userName}
            </p>

          </div>


          <div className="flex items-center gap-4">

            <div className="bg-white px-4 py-2 rounded-lg shadow border">

              <div className="flex items-center gap-2">

                <Coins className="text-yellow-500" size={20} />

                <span className="font-semibold">
                  {user?.creditBalance}
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



        {/* ACTIVE SESSION */}

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

              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full">
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
                  {activeSession.total_viewers}
                </p>

                <p>Total Viewers</p>

              </div>


              <div className="bg-slate-50 rounded-xl p-4">

                <Coins size={20} />

                <p className="text-2xl font-bold">
                  {activeSession.total_credits_received}
                </p>

                <p>Credits</p>

              </div>

            </div>


            <button
              onClick={endSession}
              className="w-full bg-red-600 text-white py-3 rounded-lg"
            >
              <VideoOff size={20} className="inline mr-2" />
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



        {/* SESSION HISTORY */}

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
                className="border rounded-lg p-4 mb-4"
              >

                <h3 className="font-bold">
                  {session.title}
                </h3>

                <p>{session.description}</p>

                <p>Status: {session.status}</p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
};

export default HostPage;