import TaskService from "./task.service.js";
class TaskController {
    async createTask(req, res) {
        try {
            const task = await TaskService.createTask(req);
            res.status(201).json({ message: "Task created successfully", task });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    async getTaskById(req, res) {
        try {
            const task = await TaskService.getTaskById(req.params.id, req.user);
            res.status(200).json({ message: "Task retrieved successfully", task });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    async getAllTasks(req, res) {
        try {
            const tasks = await TaskService.getAllTasks(req.user, req.query);
            res.status(200).json({ message: "Tasks retrieved successfully", tasks });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    async updateTask(req, res) {
        try {
            const task = await TaskService.updateTask(req.params.id, req.body, req.user);
            res.status(200).json({ message: "Task updated successfully", task });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    async deleteTask(req, res) {
        try {
            await TaskService.deleteTask(req.params.id, req.user);
            res.status(200).json({ message: "Task deleted successfully" });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}
export default new TaskController();
//# sourceMappingURL=task.controller.js.map