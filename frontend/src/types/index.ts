// ── Enums (mirror src/models/patient.py) ─────────────────────────────────────
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

export type Department =
  | "Engineering"
  | "Finance"
  | "Human Resources"
  | "IT"
  | "Management"
  | "Marketing"
  | "Operations"
  | "Sales"
  | "Security"
  | "Other";

export type UserRole = "admin" | "doctor" | "employee" | "pharmacy_staff";

// ── Auth ──────────────────────────────────────────────────────────────────────
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  full_name: string;
  password: string;
  employee_id?: string;
  role?: UserRole;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: UserRead;
}

export interface UserRead {
  id: number;
  email: string;
  full_name: string;
  employee_id?: string;
  role: UserRole;
  sensor_consent: boolean;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  last_login?: string;
}

export interface User extends UserRead {}

// ── Patient (mirror src/schemas/patient.py) ───────────────────────────────────
export interface PatientCreate {
  employee_id: string;
  full_name: string;
  date_of_birth: string; // ISO date string "YYYY-MM-DD"
  gender: Gender;
  department: Department;
  job_title: string;
  phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  blood_group?: BloodGroup;
  height_cm?: number;
  weight_kg?: number;
  allergies?: string;
  chronic_conditions?: string;
  current_medications?: string;
}

export interface PatientUpdate {
  full_name?: string;
  department?: Department;
  job_title?: string;
  phone?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  blood_group?: BloodGroup;
  height_cm?: number;
  weight_kg?: number;
  allergies?: string;
  chronic_conditions?: string;
  current_medications?: string;
}

export interface PatientRead extends PatientCreate {
  id: number;
  user_id: number;
  is_active: boolean;
  last_checkin: string | null;
  checkin_count: number;
  created_at: string;
  updated_at: string;
  age?: number;
  bmi?: number;
}

export interface PatientSummary {
  id: number;
  employee_id: string;
  full_name: string;
  department: Department;
  job_title: string;
  blood_group?: BloodGroup;
  age?: number;
  last_checkin: string | null;
  is_active: boolean;
}

export interface CheckInResponse {
  message: string;
  patient_id: number;
  employee_id: string;
  full_name: string;
  checkin_time: string;
  checkin_count: number;
}

export interface MessageResponse {
  message: string;
}

// ── Pagination / generic ──────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}
