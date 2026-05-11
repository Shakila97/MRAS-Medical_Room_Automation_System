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

export type UserRole = "admin" | "doctor" | "employee";

// ── Auth ──────────────────────────────────────────────────────────────────────
export interface LoginRequest {
  username: string; // email or username (OAuth2PasswordRequestForm)
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  role?: UserRole;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserRead {
  id: number;
  email: string;
  username: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

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
