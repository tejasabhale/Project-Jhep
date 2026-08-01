import { useCallback, useEffect, useMemo, useState } from "react";

import AuthContext from "./AuthContext";

import {
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

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getCurrentUser();

      setUser(res.data.data);
      setIsAuthenticated(true);

      return res.data.data;
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error(error);
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

  const refreshUser = useCallback(async () => {
    return await fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

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
