import type { Request, Response } from "express";
import TaskService from "./task.service.js";

class TaskController {
  async createTask(req: Request, res: Response) {
    try {
      const task = await TaskService.createTask(req);
      res.status(201).json({ message: "Task created successfully", task });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const task = await TaskService.getTaskById(req.params.id, req.user);
      res.status(200).json({ message: "Task retrieved successfully", task });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskService.getAllTasks(req.user, req.query);
      res.status(200).json({ message: "Tasks retrieved successfully", tasks });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const task = await TaskService.updateTask(
        req.params.id,
        req.body,
        req.user
      );
      res.status(200).json({ message: "Task updated successfully", task });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      await TaskService.deleteTask(req.params.id, req.user);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

export default new TaskController();
