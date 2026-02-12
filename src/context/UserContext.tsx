import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/User";

interface UserContextType {
  userId: number | null;
  userName: string | null;
  userRole: string | null;
  login: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  userName: null,
  userRole: null,
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

  const [userRole, setUserRole] = useState<string | null>(() => {
    return localStorage.getItem("userRole");
  });

  const login = (user: User) => {
    localStorage.setItem("userId", user.id.toString());
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userRole", user.role);

    setUserId(Number(user.id));
    setUserName(user.name);
    setUserRole(user.role);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    setUserId(null);
    setUserName(null);
    setUserRole(null);
  };

  return (
    <UserContext.Provider
      value={{ userId, userName, userRole, login, logout, isLoggedIn: userId !== null }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
