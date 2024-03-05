import type { IApiFactory } from ".";

export interface IAuthModule extends IApiFactory<ILoginRequest> {
  resource: string;

  login: (credentials: ILoginRequest) => Promise<ILoginResponse>;
}

export interface ILoginRequest {
  username: string;
  password: string;
  login_type: string;
}
export interface ILoginResponse {
  success: boolean;
  uuid?: string;
}
export interface ICredentials {
  uuid: string;
  username: string;
  password: string;
}
export interface IGoogleJwtResponse {
  sub: string;
  email: string;
  email_verified: string;
  name: string;
  picture: string;
}
