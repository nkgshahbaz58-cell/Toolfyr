"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("toolfyr_user");
    if (saved) setUser(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  const login = (email, password) => {
    // Mock authentication
    const mockUser = {
      id: "u1",
      name: email.split("@")[0],
      email,
      avatar: null,
      joinDate: new Date().toISOString(),
      isAdmin: email === "admin@toolfyr.com",
    };
    setUser(mockUser);
    localStorage.setItem("toolfyr_user", JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const signup = (name, email, password) => {
    const mockUser = {
      id: "u_" + Math.random().toString(36).substring(2, 8),
      name,
      email,
      avatar: null,
      joinDate: new Date().toISOString(),
      isAdmin: false,
    };
    setUser(mockUser);
    localStorage.setItem("toolfyr_user", JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("toolfyr_user");
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("toolfyr_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
