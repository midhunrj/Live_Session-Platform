import { useEffect, useState } from "react";

import { LogIn } from "lucide-react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/userAuth";

interface Props {
  switchToSignup: () => void;
}

const  Login=()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setLogin,user,setUser } = useAuthContext(); 
    const navigate=useNavigate()
    useEffect(()=>{
      setUser(user)
    },[user])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("jjj");
    
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        console.log("jero jero");
        
      const logData=await setLogin(email, password);

      console.log(logData,"return of logged Data in component");
      const userRole=logData?.data?.role
      const dashPage=userRole=='user'?'home':'host'
      console.log(dashPage,"dashpage");
      
      navigate(`/${dashPage}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
    <div className="bg-white rounded-2xl   shadow-2xl w-full max-w-2xl min-h-screen p-8 my-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Live Session Platform</h1>
        <p className="text-slate-600">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          {loading ? "Loading..." : (
            <>
              <LogIn size={20} />
              Sign In
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={()=>navigate('/Register')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
    </div>
  );
}
export default Login