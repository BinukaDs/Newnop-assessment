import mongoose from "mongoose";
import type { ITask } from "./task.types.js";
import type { IJWTResponseUser } from "../../types/response.types.js";
declare class TaskService {
    createTask(req: any): Promise<unknown>;
    getTaskById(taskId: string, user: IJWTResponseUser): Promise<mongoose.Document<unknown, {}, {
        [x: number]: unknown;
        [x: symbol]: unknown;
        [x: string]: unknown;
    }, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<{
        [x: number]: unknown;
        [x: symbol]: unknown;
        [x: string]: unknown;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getAllTasks(user: IJWTResponseUser, filters: any): Promise<ITask[]>;
    updateTask(taskId: string, taskData: Partial<ITask>, user: IJWTResponseUser): Promise<mongoose.Document<unknown, {}, {
        [x: number]: unknown;
        [x: symbol]: unknown;
        [x: string]: unknown;
    }, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<{
        [x: number]: unknown;
        [x: symbol]: unknown;
        [x: string]: unknown;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    deleteTask(taskId: string, user: IJWTResponseUser): Promise<{
        status: string;
        message: string;
    }>;
    private ensureTaskAccess;
}
declare const _default: TaskService;
export default _default;
//# sourceMappingURL=task.service.d.ts.map