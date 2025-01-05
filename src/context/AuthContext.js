import React, { createContext, useState } from "react";

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, role: null, userId: null });

  const login = (token, role, userId) => {
    setAuth({ token, role, userId });
  };

  const logout = () => {
    setAuth({ token: null, role: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
