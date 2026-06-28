export interface ITask {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "open" | "in-progress" | "done";
    dueDate: Date;
    userId: String;
}