import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errorHandler.js";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    throw new UnauthorizedError("Authorization header missing");
  }

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) throw new UnauthorizedError("Access token missing");

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) throw new UnauthorizedError("Invalid access token");
    (req as any).user = user;
    next();
  });
}
