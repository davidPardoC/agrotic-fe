import React, { createContext, FC, useEffect, useState } from "react";
import { AuthContextState } from "./types/contextTypes";
import decodejwt from 'jwt-decode';
const initialState: AuthContextState = {
  token: "",
  user: { firstName: "", lastName: "" },
  setToken: () => {},
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextState>(initialState);

export const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string>(initialState.token);
  const [user, setUser] = useState(initialState.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setUser(decodejwt(token))
    } else {
      setToken("");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
