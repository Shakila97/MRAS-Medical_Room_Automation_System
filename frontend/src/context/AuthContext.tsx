import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { UserRead, LoginRequest, RegisterRequest } from "../types";
import { login as apiLogin, register as apiRegister, logout as apiLogout, getMe } from "../api/auth";

// ── Shape ─────────────────────────────────────────────────────────────────────
interface AuthContextValue {
  user: UserRead | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Role helpers
  isAdmin: boolean;
  isDoctor: boolean;
  isEmployee: boolean;

  // Actions
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserRead | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount — try to restore session from stored token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    getMe()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("access_token");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    await apiLogin(data); // token persisted inside apiLogin
    const me = await getMe();
    setUser(me);
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    await apiRegister(data);
    // After registration, auto-login
    await login({ username: data.username, password: data.password });
  }, [login]);

  const logout = useCallback(() => {
    apiLogout();
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    isAdmin: user?.role === "admin",
    isDoctor: user?.role === "doctor",
    isEmployee: user?.role === "employee",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
