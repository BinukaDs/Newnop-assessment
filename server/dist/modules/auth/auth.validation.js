import { z } from "zod";
export const registerSchema = z.object({
    username: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string().refine((val) => val === "user" || val === "admin", {
        message: "Role must be either 'user' or 'admin'",
    }),
});
export const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
});
export const profileSchema = z.object({
    userId: z.string(),
});
//# sourceMappingURL=auth.validation.js.map