import type { Request, Response, NextFunction } from 'express';


class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    
    Object.setPrototypeOf(this, new.target.prototype); 
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = 'Resource Not Found') {
    super(message, 404);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string = 'Conflict Detected') {
    super(message, 409);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500);
  }
}


const errorHandler = (
  error: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message
    });
  }

  console.error('Unhandled Error:', error); 
  return res.status(500).json({
    success: false,
    message: 'Unexpected error occurred. Please try again later.'
  });
};

export default errorHandler;
