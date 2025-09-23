import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext(null);
// No actual user, just for the purpose of having a logged in function
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);

  const login = () => setUser({ name: "Demo User" });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
