import { useState } from "react";

import { UserPlus } from "lucide-react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

interface Props {
  switchToLogin: () => void;
}
const Signup=()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState<"host" | "user">("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setRegister } = useAuthContext();
  const navigate=useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!userName.trim()) throw new Error("Full name required");
      await setRegister({email, password, userName, role});
      navigate('/home')
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
        <p className="text-slate-600">Sign up for Live Session Platform</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`px-4 py-2 rounded-lg border-2 ${
              role === "user"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-300"
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => setRole("host")}
            className={`px-4 py-2 rounded-lg border-2 ${
              role === "host"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-300"
            }`}
          >
            Host
          </button>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
          minLength={6}
          required
        />

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <UserPlus size={20} />
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={()=>navigate('/')}
          className="text-blue-600 hover:text-blue-700"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
    </div>
  );
}

export default Signup