export interface User {
  accessToken?: string;
  id: string;
  phone: string;
  fullName: string;
  role: "customer" | "admin";
  isActive: boolean;
  deletedAt: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}
