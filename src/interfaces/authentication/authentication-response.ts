import { IUser } from "../user/user";

export interface IAuthenticationResponse {
  user: IUser;
  token: string;
}
