import client from "./client";
import type { LoginRequest, RegisterRequest, TokenResponse, UserRead } from "../types";

// ── Login (OAuth2 form) ───────────────────────────────────────────────────────
export async function login(data: LoginRequest): Promise<TokenResponse> {
  // FastAPI OAuth2PasswordRequestForm expects form-encoded body
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  const response = await client.post<TokenResponse>("/api/auth/login", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  // Persist token immediately so interceptors pick it up
  localStorage.setItem("access_token", response.data.access_token);
  return response.data;
}

// ── Register ──────────────────────────────────────────────────────────────────
export async function register(data: RegisterRequest): Promise<UserRead> {
  const response = await client.post<UserRead>("/api/auth/register", data);
  return response.data;
}

// ── Get current user ──────────────────────────────────────────────────────────
export async function getMe(): Promise<UserRead> {
  const response = await client.get<UserRead>("/api/auth/me");
  return response.data;
}

// ── Logout (client-side only — no server endpoint needed) ────────────────────
export function logout(): void {
  localStorage.removeItem("access_token");
}
