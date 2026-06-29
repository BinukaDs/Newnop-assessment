
import { userApi } from "@/api/clients";
import type { IUser } from "@/types/auth.types";
import { toast } from "sonner";

export async function getUsers(): Promise<IUser[]> {
  try {
    const response = await userApi.get<IUser[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Error fetching users")
    throw error;
  }
}
