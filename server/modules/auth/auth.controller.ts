import type { Request, Response } from "express";
import AuthService from "./auth.service.js";


class AuthController {
  async register(req: Request, res: Response) {
    const { email, password, username, role } = req.body;

    try {
      const result = await AuthService.register({
        email,
        password,
        username,
        role,
      });
      res
        .status(201)
        .json({
          message: "User registered successfully",
          userId: result.userId,
        });
    } catch (error: any) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await AuthService.login({ email, password });
      res
        .status(200)
        .json({ message: "User logged in successfully", token: result.token });
    } catch (error: any) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const user = await AuthService.getProfile(req.body.userId);
      res
        .status(200)
        .json({ message: "User profile retrieved successfully", user });
    } catch (error: any) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default new AuthController();
