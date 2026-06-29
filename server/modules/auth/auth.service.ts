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

    const sanitizedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    try {
      const token = jwt.sign(
        { userId: user._id, userRole: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      return { token, sanitizedUser };
    } catch (error) {
      console.error("Error generating token:", error);
      throw new InternalServerError("Error generating token");
    }
  }

  async validateUser(userId: string) {
    if (!userId) throw new BadRequestError("User ID is required");
    const user = await UserModel.findById(userId).select(
      "_id role username email"
    );
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
    return user;
  }
}

export default new AuthService();
