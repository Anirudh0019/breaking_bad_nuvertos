export interface Compound {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface CompoundResponse {
  compounds: Compound[];
  total?: number;
  currentPage?: number;
  totalPages?: number;
}

export interface PaginationParams {
  page: number;
  limit?: number;
}

export interface User {
  id: number;
  username: string;
  createdAt?: string; 
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}