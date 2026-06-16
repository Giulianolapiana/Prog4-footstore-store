// Tipos propios de la feature de Autenticación

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  is_active: boolean;
  roles: UserRole[];
}

export interface UserRole {
  id: number;
  codigo: string;
  nombre: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}
