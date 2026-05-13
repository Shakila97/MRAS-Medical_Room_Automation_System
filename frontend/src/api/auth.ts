import client from "./client";
import type { LoginRequest, RegisterRequest, TokenResponse, UserRead } from "../types";

// ── Login ─────────────────────────────────────────────────────────────────────
export async function login(data: LoginRequest): Promise<TokenResponse> {
  // Backend expects JSON body with email and password
  const response = await client.post<TokenResponse>("/api/auth/login", data);
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
  localStorage.removeItem("refresh_token");
}
