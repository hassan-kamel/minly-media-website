import { ILoginPayload } from "@/interfaces/authentication/login-payload";
import { MinlyMediaAPI } from "./MinlyMediaAPI";
import { ISignupPayload } from "@/interfaces/authentication/signup-payload";
import { AuthenticationState } from "@/store/features/authenticationSlice";

export const login = (loginPayload: ILoginPayload) => {
  return MinlyMediaAPI.post<AuthenticationState>("/auth/login", loginPayload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const signup = (signupPayload: ISignupPayload) => {
  return MinlyMediaAPI.post<AuthenticationState>("/auth/signup", signupPayload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
