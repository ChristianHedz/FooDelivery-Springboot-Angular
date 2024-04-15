export interface socialUser{
  id: number;
  firstName: string|null;
  lastName: string|null;
  alias: string;
  email: string;
  role: string;
  token: string;
  active: boolean;
  error: boolean;
}
