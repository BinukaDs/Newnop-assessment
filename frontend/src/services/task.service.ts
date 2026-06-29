import { taskApi } from "@/api/clients";
import type { ITask } from "@/types/task.types";
import { toast } from "sonner";

export async function createTask(data: FormData): Promise<ITask | undefined> {
  try {
    const response = await taskApi.post<ITask>("/tasks", data);
    toast.success("Task created successfully!");
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    toast.error("Error creating task. please try again.");
  }
}

export async function getTaskById(id: string): Promise<ITask | undefined> {
  try {
    const response = await taskApi.get<ITask>(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task:", error);
    toast.error("Error fetching task. Please try again.");
  }
}

export async function getTasks(): Promise<ITask[] | undefined> {
  try {
    const response = await taskApi.get<ITask[]>("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    toast.error("Error fetching tasks. Please try again.");
  }
}

export async function updateTask(
  id: string,
  data: FormData
): Promise<ITask | undefined> {
  try {
    const response = await taskApi.patch<ITask>(`/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Error updating task. Please try again.");
  }
}

export async function deleteTask(id: string): Promise<void | { success: boolean }> {
  try {
    await taskApi.delete(`/tasks/${id}`);
    toast.success("Task deleted successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Error deleting task. Please try again.");
    return { success: false };
  }
}
