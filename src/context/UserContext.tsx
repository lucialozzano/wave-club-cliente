import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/User";

interface UserContextType {
  userId: number | null;
  userName: string | null; 
  login: (user: User) => void; 
  logout: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  userName: null,
  login: () => { },
  logout: () => { },
  isLoggedIn: false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(() => {
    const saved = localStorage.getItem("userId");
    return saved ? Number(saved) : null;
  });

  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem("userName");
  });

  const login = (user: User) => {
    localStorage.setItem("userId", user.id.toString());
    localStorage.setItem("userName", user.name); 
    setUserId(user.id);
    setUserName(user.name);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setUserId(null);
    setUserName(null);
  };

  return (
    <UserContext.Provider value={{ userId, userName, login, logout, isLoggedIn: userId !== null }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);