import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(5).max(500),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  assignedTo: z.string().min(2).max(100).optional(),
  status: z.enum(["open", "in-progress", "testing", "complete"]),
});

export const taskIdSchema = z.object({
  id: z.string().min(2).max(100),
});

export const updateTaskSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  description: z.string().min(5).max(500).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional(),
  status: z.enum(["open", "in-progress", "testing", "complete"]).optional(),
  assignedTo: z.string().optional(),
});
