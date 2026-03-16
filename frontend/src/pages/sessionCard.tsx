import { useState, useEffect } from 'react';
import { Users, Coins, Video } from 'lucide-react';
import type { Session } from '../types/userAuth';
import { getViewerCount } from '../services/sessionService';

interface SessionCardProps {
  session: Session & { profiles?: { full_name: string } };
  onJoin: () => void;
}

const SessionCard=({ session, onJoin }: SessionCardProps)=> {
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    loadViewers();
    const interval = setInterval(loadViewers, 5000);
    return () => clearInterval(interval);
  }, [session._id]);

   useEffect(() => {
    loadViewers();
  }, []);

  const loadViewers = async () => {
    const count = await getViewerCount(session._id);
    setViewerCount(count);
  };
  return (
    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
            {session.title}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2">{session.description}</p>
        </div>
        <div className="flex items-center gap-1 bg-green-500 px-2 py-1 rounded-full ml-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-white text-xs font-semibold">LIVE</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Host:</span>
          <span className="font-semibold text-slate-900">
            {session.profiles?.full_name || 'Unknown'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-slate-600">
            <Users size={16} />
            <span>Viewers:</span>
          </div>
          <span className="font-semibold text-slate-900">{viewerCount}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-slate-600">
            <Coins size={16} />
            <span>Credits Received:</span>
          </div>
          <span className="font-semibold text-slate-900">{session.total_credits_received}</span>
        </div>
      </div>

      <button
        onClick={onJoin}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Video size={18} />
        Join Session
      </button>
    </div>
  );
}

export default SessionCard