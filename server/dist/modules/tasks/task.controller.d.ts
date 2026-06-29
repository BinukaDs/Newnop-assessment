import type { Request, Response } from "express";
declare class TaskController {
    createTask(req: Request, res: Response): Promise<void>;
    getTaskById(req: Request, res: Response): Promise<void>;
    getAllTasks(req: Request, res: Response): Promise<void>;
    updateTask(req: Request, res: Response): Promise<void>;
    deleteTask(req: Request, res: Response): Promise<void>;
}
declare const _default: TaskController;
export default _default;
//# sourceMappingURL=task.controller.d.ts.map