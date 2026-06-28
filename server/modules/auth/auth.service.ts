import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../users/user.model.js";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/errorHandler.js";
import type { IUser } from "../users/user.types.js";

class AuthService {
  async register(userData: IUser) {
    const { email, password, username, role } = userData;

    if (!email || !password || !username || !role) {
      throw new BadRequestError(
        "Email, password, username, and role are required"
      );
    } 
    

    if (await UserModel.findOne({ email })) {
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
      role,
    });

    try {
      await user.save();
      return { userId: user._id };
    } catch (error) {
      throw new InternalServerError("Error registering user");
    }
  }

  async login(credentials: any) {
    const { email, password } = credentials;
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await UserModel.findOne({ email: credentials.email });
    if (!user) throw new NotFoundError("User not found");

    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) throw new UnauthorizedError("Invalid credentials");

    try {
      const token = jwt.sign(
        { userId: user._id, userRole: user.role },
        process.env.JWT_SECRET as string
      );
      return { token };
    } catch (error) {
      console.error("Error generating token:", error);
      throw new InternalServerError("Error generating token");
    }
  }

  async getProfile(userId: string) {
    if (!userId) throw new BadRequestError("User ID is required");
    const user = await UserModel.findById(userId).select("role userId");
    if (!user) throw new Error("User not found");
    return user;
  }
}

export default new AuthService();
