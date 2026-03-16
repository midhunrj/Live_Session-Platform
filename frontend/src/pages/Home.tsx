import React from 'react'

import { useState, useEffect } from 'react';
import { LogOut, Coins, Video } from 'lucide-react';
import { useAuthContext } from '../context/authContext';
import type { Session } from '../types/userAuth';
import SessionView from './sessionView';
import SessionCard from './sessionCard';
import { getActiveSessions } from '../services/sessionService';
import { useNavigate } from 'react-router-dom';

const Home=()=> {
  const { user,logout } = useAuthContext();
  const [activeSessions, setActiveSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    loadSessions();
  },[])

  const setlogout=()=>
  {
    logout(),
    navigate('/')
  }

    const loadSessions = async () => {
    try {
      const data = await getActiveSessions();
      setActiveSessions(data);
    } catch (error) {
      console.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };
  // const loadActiveSessions = async () => {
  //   const { data, error } = await supabase
  //     .from('sessions')
  //     .select('*, users!sessions_host_id_fkey(full_name)')
  //     .eq('status', 'active')
  //     .order('started_at', { ascending: false });

  //   if (!error && data) {
  //     setActiveSessions(data as Session[]);
  //   }
  //   setLoading(false);
  // };

  if (selectedSession) {
    return (
      <SessionView
        session={selectedSession}
        onBack={() => setSelectedSession(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Live Sessions</h1>
            <p className="text-slate-600 mt-1">Welcome, {user?.userName}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center gap-2">
                <Coins className="text-yellow-500" size={20} />
                <span className="font-semibold text-slate-900">{user?.creditBalance}</span>
                <span className="text-sm text-slate-600">credits</span>
              </div>
            </div>
            <button
              onClick={setlogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-2 rounded-lg">
              <Video className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Active Sessions</h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-slate-600 mt-4">Loading sessions...</p>
            </div>
          ) : activeSessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Video className="text-slate-400" size={32} />
              </div>
              <p className="text-slate-600 text-lg">No active sessions at the moment</p>
              <p className="text-slate-500 text-sm mt-2">Check back later for live content</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSessions.map((session) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  onJoin={() => setSelectedSession(session)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home