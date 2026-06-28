import { Router } from "express";
import authController from "./auth.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { registerSchema, loginSchema, profileSchema } from "./auth.validation.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.get("/", authenticateToken, authController.getProfile);

export default authRouter;