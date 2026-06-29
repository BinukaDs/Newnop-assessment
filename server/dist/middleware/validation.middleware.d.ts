import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
type ValidationTarget = "body" | "params" | "query";
export declare const validate: (schema: ZodSchema, target?: ValidationTarget) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=validation.middleware.d.ts.map