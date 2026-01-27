export interface User {
  id: number;
  fullname: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  token?: string | null;
  error: string | null
  msg: string
}