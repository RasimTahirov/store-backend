export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  email: string;
}
