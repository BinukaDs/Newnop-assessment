import userService from "./user.service.js";
class UserController {
    async getUsers(req, res) {
        try {
            const users = await userService.getAllUsers(req);
            res.status(200).json({ message: "Users retrieved successfully", users });
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}
export default new UserController();
//# sourceMappingURL=user.controller.js.map