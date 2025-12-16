export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  email: string;
  password: string;
  name: string;
}
