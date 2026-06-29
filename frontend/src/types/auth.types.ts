export interface ILoginCredentials {
  email: string;
  password: string;
}
export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IRegisterInputs {
  name: string;
  email: string;
  password: string;
  role: "role" | "admin";
}
