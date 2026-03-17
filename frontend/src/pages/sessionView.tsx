import { useState, useEffect } from 'react';

// import { useAuth } from '../contexts/AuthContext';
// import type { Session, Transaction } from '../types/database';
import { ArrowLeft, Users, Coins, Send, TrendingUp } from 'lucide-react';
import type { Session, Transaction } from '../types/userAuth';
import { useAuthContext } from '../context/authContext';
import { getSessionStats, getViewerCount, joinSession, leaveSession } from '../services/sessionService';
import { getTransactions, sendCredits } from '../services/creditService';

interface SessionViewProps {
  session: Session;
  onBack: () => void;
}

const  SessionView=({ session, onBack }: SessionViewProps)=> {
  const { user } = useAuthContext();
  const [viewerCount, setViewerCount] = useState(0);
  const [creditAmount, setCreditAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sessionStats, setSessionStats] = useState(session);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [hasJoined,setHasJoined]=useState<Boolean>(false)


  useEffect(() => {

    const initializeSession = async () => {
      await handleJoinSession();
      await Promise.all([
        loadViewerCount(),
        loadTransactions(),
        loadSessionStats()
      ]);
    };

    initializeSession();

    const interval = setInterval(() => {
      loadViewerCount();
      loadSessionStats();
      loadTransactions();
    }, 3000);

    return () => {
      clearInterval(interval);
      // Only leave if we actually joined
      if (hasJoined) {
        handleLeaveSession();
      }
    };
  }, []); 
const getUserId = () => {
  if (!user) return null;
  return user.data?._id || user._id;
};
  const handleJoinSession = async () => {
    const userId=getUserId()
  if (!user) return;

  try {
    console.log("userID +stong  data",user);
    
    const res=await joinSession(session._id!, userId!);
    setHasJoined(true)
  } catch (error) {
    console.error("Failed to join session");
  }
};  


 const handleLeaveSession = async () => {
  const userId = getUserId();
  if (!user) return;

  try {

    console.log("user.Id",user._id);
    
    await leaveSession(session._id!, userId!);
    setHasJoined(false)
  } catch (error) {
    console.error("Failed to leave session");
  }
};

  const loadViewerCount = async () => {
  try {
    const count = await getViewerCount(session._id!);
    setViewerCount(count);
  } catch (error) {
    console.error("Viewer count error");
  }
};
  const loadSessionStats = async () => {
  try {
    const data = await getSessionStats(session._id!);
    setSessionStats(data);
  } catch (error) {
    console.error("Session stats error");
  }
};
  const loadTransactions = async () => {
  try {
    const transactData = await getTransactions(session._id!);
    console.log("transactdata",transactData);
    
    setTransactions(transactData.data!);
  } catch (error) {
    console.error("Transaction load error");
  }
};

 const handleSendCredits = async () => {
  if (!user) return;

  const amount = parseInt(creditAmount);

  if (isNaN(amount) || amount <= 0) {
    setError("Enter valid amount");
    return;
  }

  if (amount > user.creditBalance!) {
    setError("Insufficient credits");
    return;
  }

  setSending(true);
  setError("");

  try {
    const userId=user.data._id
    console.log(session,"session data");
    
    await sendCredits(session._id!, userId!, session.hostId, amount);

    setSuccess(`Sent ${amount} credits`);
    setCreditAmount("");

    loadTransactions();
    loadSessionStats();

  } catch (error) {
    setError("Failed to send credits");
  } finally {
    setSending(false);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-6 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <ArrowLeft size={20} />
          Back to Sessions
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 rounded-2xl aspect-video flex items-center justify-center shadow-xl">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={48} />
                </div>
                <p className="text-white text-2xl font-bold mb-2">{sessionStats.title}</p>
                <p className="text-slate-300">{sessionStats.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Session Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="text-blue-600" size={20} />
                    <span className="text-sm font-medium text-slate-600">Live Viewers</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{viewerCount}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-green-600" size={20} />
                    <span className="text-sm font-medium text-slate-600">Total Viewers</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{sessionStats.data?.totalViewers}</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="text-yellow-600" size={20} />
                    <span className="text-sm font-medium text-slate-600">Credits</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{sessionStats.data?.totalCredits}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Send Credits</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Balance: {user?.creditBalance} credits
                </label>
                <input
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm mb-4">
                  {success}
                </div>
              )}

              <button
                onClick={handleSendCredits}
                disabled={sending || !creditAmount}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {sending ? 'Sending...' : 'Send Credits'}
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Transactions</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactions.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-4">No transactions yet</p>
                ) : (
                  transactions.map((transaction) => (
                    <div
                      key={transaction._id}
                      className="flex items-center justify-between bg-slate-50 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-yellow-100 p-2 rounded-lg">
                          <Coins className="text-yellow-600" size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {(transaction as any).users?.full_name || 'Anonymous'}
                          </p>
                          <p className="text-xs text-slate-600">
                            {new Date(transaction.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-yellow-600">
                        +{transaction.credits}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SessionView