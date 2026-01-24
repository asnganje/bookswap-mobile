export interface User {
  id: number;
  fullname: string;
  email: string;
  password: string;
  token?: string;
}

export interface AuthState {
  user: User;
  loading: boolean;
  error: string | null
}