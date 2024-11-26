export interface User {
    id: string;
    email: string;
    name: string;
    role: 'customer' | 'admin';
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    name: string;
    confirmPassword: string;
  }