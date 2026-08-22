import { useCallback, useEffect, useMemo, useState } from "react";

import AuthContext from "./AuthContext";

import {
  getSession,
  loginUser,
  logoutUser,
  registerUser,
  verifyOtp,
} from "../api/auth.api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkSession = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getSession();

      const session = res.data.data;

      if (session?.authenticated) {
        setUser(session.user);
        setIsAuthenticated(true);

        return session.user;
      }

      setUser(null);
      setIsAuthenticated(false);

      return null;
    } catch (error) {
      if (!error.response) {
        console.error("Session check failed:", error);
      }

      setUser(null);
      setIsAuthenticated(false);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    const res = await loginUser(credentials);

    const loggedInUser = res.data.data.user;

    setUser(loggedInUser);
    setIsAuthenticated(true);

    return loggedInUser;
  }, []);

  const register = useCallback(async (data) => {
    const res = await registerUser(data);

    return res.data.data;
  }, []);

  const verifyAccount = useCallback(async (data) => {
    const res = await verifyOtp(data);

    const verifiedUser = res.data.data.user;

    setUser(verifiedUser);
    setIsAuthenticated(true);

    return verifiedUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    return await checkSession();
  }, [checkSession]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,

      isAdmin: user?.role === "admin",

      login,
      logout,

      register,
      verifyAccount,

      refreshUser,
      checkSession,
    }),
    [
      user,
      loading,
      isAuthenticated,
      login,
      logout,
      register,
      verifyAccount,
      refreshUser,
      checkSession,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
