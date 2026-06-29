import { authApi } from "@/api/clients";
import type {
  ILoginRequest,
  IAuthResponse,
  IRegisterInputs,
  IUser,
} from "@/types/auth.types";
import { decodeJwtPayload } from "@/lib/jwt-decoder.util";
import { toast } from "sonner";
import type { ITaskResponse } from "@/types/task.types";

export async function loginUser(
  payload: ILoginRequest
): Promise<IAuthResponse | void> {

  try {
    const { data } = await authApi.post<IAuthResponse>("/auth/login", payload);
    if (!data?.token) {
      toast.info((data as unknown as ITaskResponse).message || "Login failed: No token received");
    }

    localStorage.setItem("TMSAccessToken", data.token);

    const payloadDecoded = decodeJwtPayload(String(data.token));
    const userId = payloadDecoded?.userId ?? payloadDecoded?.sub;
    if (userId != null) {
      localStorage.setItem("userId", String(userId));
    }

    return data;
  } catch (err: any) {
    const error = err as any;
    if (error.response) {
      console.error(error.response.status, ":", error.response.data);
      toast.info(
        error.response.data?.message || "Login failed: Invalid credentials"
      );
    } else if (error.request) {
      console.log(error.request);
      toast.info("Login failed: No response received");
    } else {
      console.log("Error", error.message);
      toast.info(error.response?.data?.message || "Login failed! An unexpected error occurred");
    }
  }
}

export async function signUpUser(
  payload: IRegisterInputs
): Promise<IAuthResponse> {
  
  try {
    const { data } = await authApi.post<IAuthResponse>("/auth/register", payload);
    if (!data?.user?.id) {
      throw new Error("Sign up failed");
    }
    return data;

  } catch (err: any) {
    const error = err as any;
    console.error("Error during sign up:", error);
    toast.info(error.response?.data?.message || "Sign up failed! An unexpected error occurred");
    throw error;
  }
}

export async function isAuthenticated(): Promise<boolean | { isValid: boolean; user?: IUser }> {
  const token = localStorage.getItem("TMSAccessToken");
  if (!token) return false;

  try {
    const response = await authApi.get<{ isValid: boolean, user?: IUser }>("/auth/validate");
    const isValid = response.status === 200 && response.data?.isValid === true
    return { isValid: isValid, user: response.data?.user };
  } catch {
    localStorage.removeItem("TMSAccessToken");
    return false;
  }
}

export async function logoutUser() {
  if (localStorage.getItem("TMSAccessToken")) {
    localStorage.removeItem("TMSAccessToken");
    localStorage.removeItem("userId");
  }
}
