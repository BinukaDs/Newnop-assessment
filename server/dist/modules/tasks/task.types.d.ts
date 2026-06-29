export interface ITask {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "open" | "in-progress" | "done";
    dueDate: Date;
    assignedTo: String;
    createdBy?: String;
}
//# sourceMappingURL=task.types.d.ts.map