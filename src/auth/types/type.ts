export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
}

export type JwtPayload = Pick<IUser, 'id' | 'email' | 'role'>;
