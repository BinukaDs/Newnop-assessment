import type { Request, Response, NextFunction } from 'express';
declare class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare class BadRequestError extends CustomError {
    constructor(message?: string);
}
export declare class UnauthorizedError extends CustomError {
    constructor(message?: string);
}
export declare class NotFoundError extends CustomError {
    constructor(message?: string);
}
export declare class ConflictError extends CustomError {
    constructor(message?: string);
}
export declare class InternalServerError extends CustomError {
    constructor(message?: string);
}
declare const errorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default errorHandler;
//# sourceMappingURL=errorHandler.d.ts.map