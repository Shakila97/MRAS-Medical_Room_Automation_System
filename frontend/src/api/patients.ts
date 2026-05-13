import client from "./client";
import type {
  PatientCreate,
  PatientUpdate,
  PatientRead,
  PatientSummary,
  CheckInResponse,
  MessageResponse,
} from "../types";

const BASE = "/api/patients";

// ── List patients (paginated) ─────────────────────────────────────────────────
export async function listPatients(
  page = 1,
  size = 20,
  search?: string
): Promise<PatientSummary[]> {
  const params: Record<string, unknown> = { page, size };
  if (search) params.search = search;
  const response = await client.get<PatientSummary[]>(BASE, { params });
  return response.data;
}

// ── Get single patient ────────────────────────────────────────────────────────
export async function getPatient(id: number): Promise<PatientRead> {
  const response = await client.get<PatientRead>(`${BASE}/${id}`);
  return response.data;
}

// ── Get my own patient profile ────────────────────────────────────────────────
export async function getMyProfile(): Promise<PatientRead> {
  const response = await client.get<PatientRead>(`${BASE}/me`);
  return response.data;
}

// ── Create patient profile ────────────────────────────────────────────────────
export async function createPatient(data: PatientCreate): Promise<PatientRead> {
  const response = await client.post<PatientRead>(BASE, data);
  return response.data;
}

// ── Update patient profile ────────────────────────────────────────────────────
export async function updatePatient(
  id: number,
  data: PatientUpdate
): Promise<PatientRead> {
  const response = await client.patch<PatientRead>(`${BASE}/${id}`, data);
  return response.data;
}

// ── Deactivate patient ────────────────────────────────────────────────────────
export async function deactivatePatient(id: number): Promise<MessageResponse> {
  const response = await client.delete<MessageResponse>(`${BASE}/${id}`);
  return response.data;
}

// ── QR Check-in ───────────────────────────────────────────────────────────────
export async function checkIn(employeeId: string): Promise<CheckInResponse> {
  const response = await client.post<CheckInResponse>(
    `${BASE}/checkin/${employeeId}`
  );
  return response.data;
}
