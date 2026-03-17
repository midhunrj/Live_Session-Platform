import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/userAuth";
import { loginUser, registerUser } from "../services/authServices";


interface AuthContextType {
  userAuthenticated: boolean;
  setUserAuthenticated: (value: boolean) => void;
  user: User | null;
  setLogin:(email:string,password:string)=>Promise<User>
  setRegister:(user:User)=>Promise<void>    
  setUser: (user: User | null) => void;
  logout:()=>void
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

const useAuthContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

const UserProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User | null>(() => {
    try {
      const userData = localStorage.getItem("urlUserData");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing userData from localStorage", error);
      return null;
    }
  });

  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(() => {
    try {
      const userData = localStorage.getItem("urlUserData");
      return !!userData;
    } catch (error) {
      console.error("Error parsing userData from localStorage", error);
      return false;
    }
  });
  const setRegister=async(user:User)=>
  {
    const newUser:User=await registerUser(user)
    console.log(newUser,"newuser")
    setUser(newUser)
  }

  const setLogin = async (email: string, password: string):Promise<User> => {
  try {
    // Remove localStorage validation - let the backend handle authentication
    const loggedUser:User = await loginUser({ email, password });
    console.log(loggedUser, "loggeduser");
    
    
    if (loggedUser) {
        console.log("knjksjks");
        
      setUser(loggedUser);
      return loggedUser; // Return user data for component to use
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw so component can catch it
  }
}
  const logout=()=>setUser(null)

  useEffect(() => {
    if (user) {
      localStorage.setItem("urlUserData", JSON.stringify(user));
      setUserAuthenticated(true);
    } else {
      localStorage.removeItem("urlUserData");
      setUserAuthenticated(false);
    }
  }, [user]);


  return (
    <UserContext.Provider
      value={{
        userAuthenticated,
        setUserAuthenticated,
        user,
        setUser,
        setLogin,
        setRegister,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useAuthContext };