import type { Request, Response } from "express";
import userService from "./user.service.js";

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers(req as any);
      res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

export default new UserController();
