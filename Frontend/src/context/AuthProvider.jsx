import { useCallback, useEffect, useMemo, useState } from "react";

import AuthContext from "./AuthContext";

import {
  getSession,
  loginUser,
  logoutUser,
  registerUser,
  verifyOtp,
} from "../api/auth.api";

import { getCurrentUser } from "../api/user.api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initializeSession = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getSession();

      const session = res.data.data;

      if (session?.authenticated && session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);

        return session.user;
      }

      setUser(null);
      setIsAuthenticated(false);

      return null;
    } catch (error) {
      console.error("Failed to initialize session:", error);

      setUser(null);
      setIsAuthenticated(false);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getCurrentUser();

      const currentUser = res.data.data;

      setUser(currentUser);
      setIsAuthenticated(true);

      return currentUser;
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Failed to fetch current user:", error);
      }

      setUser(null);
      setIsAuthenticated(false);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (credentials) => {
      await loginUser(credentials);

      const currentUser = await fetchCurrentUser();

      return currentUser;
    },
    [fetchCurrentUser],
  );

  const register = useCallback(async (data) => {
    const res = await registerUser(data);

    return res.data.data;
  }, []);

  const verifyAccount = useCallback(
    async (data) => {
      await verifyOtp(data);

      return await fetchCurrentUser();
    },
    [fetchCurrentUser],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const refreshUser = useCallback(() => {
    return fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

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
      fetchCurrentUser,
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
      fetchCurrentUser,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
