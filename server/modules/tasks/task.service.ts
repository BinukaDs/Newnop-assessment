import mongoose from "mongoose";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/errorHandler.js";
import type { ITask } from "./task.types.js";
import TaskModel from "./task.model.js";
import type { IJWTResponseUser } from "../../types/response.types.js";

class TaskService {
  async createTask(req: Request) {
    let { title, description, priority, status, dueDate, assignedTo } =
      req.body as ITask;

    const isAdmin = req.user.userRole === "admin";

    if (!isAdmin) {
      assignedTo = req.user.userId;
    }

    console.log("assigned: ", assignedTo);

    if (!title || !description || !priority || !dueDate || !status) {
      throw new BadRequestError("All fields are required");
    }

    const task = new TaskModel({
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo,
      createdBy: req.user.userId,
    });

    try {
      await task.save();
      return task._id;
    } catch (error) {
      console.log(error);
      throw new InternalServerError("Error creating task");
    }
  }

  async getTaskById(taskId: string, user: IJWTResponseUser) {
    if (!taskId) {
      throw new BadRequestError("Task ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new BadRequestError("Invalid task ID");
    }

    const task: ITask = await TaskModel.findById(taskId).populate(
      "assignedTo",
      "_id username email"
    );

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    console.log("taskId: ", task);
    this.ensureTaskAccess(task, user);

    return task;
  }

  async getAllTasks(user: IJWTResponseUser, filters: string) {
    let tasks: ITask[];
    let query: string = {};

    if (user.userRole !== "admin") {
      query.assignedTo = user.userId;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.priority) {
      query.priority = filters.priority;
    }

    if (filters.search) {
      const safeSearchString = filters.search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      query.title = {
        $regex: safeSearchString,
        $options: "i",
      };
    }

    if(user.userRole === "admin" && filters.assignedTo) {
      if (!mongoose.Types.ObjectId.isValid(filters.assignedTo)) {
        throw new BadRequestError("Invalid assignedTo ID");
      }
      query.assignedTo = filters.assignedTo;
    } else if (user.userRole !== "admin") {
      query.assignedTo = user.userId;
    }

    tasks = await TaskModel.find(query).populate(
      "assignedTo",
      "username email"
    );

    if (!tasks) {
      throw new NotFoundError("No tasks found");
    }

    return tasks;
  }

  async updateTask(
    taskId: string,
    taskData: Partial<ITask>,
    user: IJWTResponseUser
  ) {
    if (!taskId) {
      throw new BadRequestError("Task ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new BadRequestError("Invalid task ID");
    }

    const task: ITask = await TaskModel.findById(taskId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    this.ensureTaskAccess(task, user);

    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, taskData, {
      returnDocument: "after",
    }).populate("assignedTo", "username email");
    if (!updatedTask) {
      throw new NotFoundError("Task not found");
    }

    return updatedTask;
  }

  async deleteTask(taskId: string, user: IJWTResponseUser) {
    if (!taskId) {
      throw new BadRequestError("Task ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new BadRequestError("Invalid task ID");
    }

    const task: ITask = await TaskModel.findById(taskId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    this.ensureTaskAccess(task, user);

    await TaskModel.findByIdAndDelete(taskId).catch((error) => {
      console.log(error);
      throw new InternalServerError("Error deleting task");
    });

    return { status: "success", message: "Task deleted successfully" };
  }

  private ensureTaskAccess(task: ITask, user: IJWTResponseUser) {
    if (
      user.userRole !== "admin" &&
      task.assignedTo._id.toString() !== user.userId.toString()
    ) {
      throw new NotFoundError("Task not found");
    }
  }
}

export default new TaskService();
