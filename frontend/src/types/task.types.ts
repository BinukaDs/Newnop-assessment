import type { IUser } from "./auth.types";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "testing" | "complete";
  priority: "low" | "medium" | "high";
  dueDate: string;
  assignedTo: IUser;
}

export interface ICreateTaskResponse {
  message: string;
  status: string;
}
