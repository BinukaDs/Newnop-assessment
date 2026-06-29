import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { taskSchema, taskIdSchema, updateTaskSchema } from "./task.validation.js";
import taskController from "./task.controller.js";
const taskRouter = Router();
taskRouter.post("/", authenticateToken, validate(taskSchema), taskController.createTask);
taskRouter.get("/", authenticateToken, taskController.getAllTasks);
taskRouter.get("/:id", authenticateToken, validate(taskIdSchema, "params"), taskController.getTaskById);
taskRouter.patch("/:id", authenticateToken, validate(taskIdSchema, "params"), validate(updateTaskSchema), taskController.updateTask);
taskRouter.delete("/:id", authenticateToken, validate(taskIdSchema, "params"), taskController.deleteTask);
export default taskRouter;
//# sourceMappingURL=task.routes.js.map