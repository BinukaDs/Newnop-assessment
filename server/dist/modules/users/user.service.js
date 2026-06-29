import mongoose from "mongoose";
import { BadRequestError, ConflictError, InternalServerError, NotFoundError, UnauthorizedError, } from "../../utils/errorHandler.js";
import UserModel from "./user.model.js";
class UserService {
    async getAllUsers(req) {
        const user = req.user;
        if (user.userRole !== "admin") {
            throw new UnauthorizedError("No users Found");
        }
        try {
            const users = await UserModel.find().select("_id username email");
            return users;
        }
        catch (error) {
            throw new InternalServerError("Error fetching users");
        }
    }
}
export default new UserService();
//# sourceMappingURL=user.service.js.map