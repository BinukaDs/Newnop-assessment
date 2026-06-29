import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware.js";
import userController from "./user.controller.js";
const userRouter = Router();
userRouter.get("/", authenticateToken, userController.getUsers);
export default userRouter;
//# sourceMappingURL=user.routes.js.map