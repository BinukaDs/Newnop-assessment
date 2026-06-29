import { z } from "zod";
export declare const taskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    priority: z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>;
    dueDate: z.ZodString;
    assignedTo: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        open: "open";
        "in-progress": "in-progress";
        testing: "testing";
        complete: "complete";
    }>;
}, z.core.$strip>;
export declare const taskIdSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>>;
    dueDate: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        open: "open";
        "in-progress": "in-progress";
        testing: "testing";
        complete: "complete";
    }>>;
    assignedTo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=task.validation.d.ts.map