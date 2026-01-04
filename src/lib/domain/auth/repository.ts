export interface User {
  id: string;
  email: string; // user_info.email is NOT NULL
  name: string; // user_info.name is NOT NULL
  identityId?: number; // user_info.identity_id (nullable in schema, bigint)
  isActive: boolean; // user_info.is_active (default true)
  isFirstLogin?: boolean; // user_info.is_first_login (default true)
  avatarUrl?: string; // user_info.avatar_url
  phone?: string; // user_info.phone
  disabledAt?: string; // user_info.disabled_at (timestamp)
  disabledReason?: string; // user_info.disabled_reason
  emailConfirmedAt?: string; // from auth.users (helper field)
  role?: string; // derived helper (optional)
}

export interface Session {
  user: User;
  accessToken: string;
}

export interface AuthSubscription {
  unsubscribe: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface EducationInput {
  schoolCode?: string; // maps to schools.code
  schoolName: string; // maps to schools.name
  statusKey: string; // maps to education_statuses.status_key
  department?: string; // maps to student_education.department or teacher_education.department
  grade?: string; // maps to student_education.grade (only for students)
  degree?: string; // maps to teacher_education.degree (only for teachers)
  startYear?: number; // maps to start_year
  endYear?: number; // maps to end_year
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string; // Maps to user_info.name
  teacherCode?: string; // Maps to student_info.teacher_code (for students) OR teacher_info.teacher_code (for teachers)
  identityId?: number; // To decide if Student or Teacher during registration
  education?: EducationInput;
}

export type AuthStateChangeCallback = (event: string, session: Session | null) => void;

export interface AuthRepository {
  getSession(): Promise<Session | null>;
  getUser(): Promise<User | null>;
  signIn(credentials: LoginCredentials): Promise<{ user: User | null; error: Error | null }>;
  signUp(credentials: RegisterCredentials): Promise<{ error: Error | null }>;
  signOut(): Promise<void>;
  onAuthStateChange(callback: AuthStateChangeCallback): AuthSubscription;
  getIdentityId(): Promise<number | null>;
}