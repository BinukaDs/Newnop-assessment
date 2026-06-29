import AuthService from "./auth.service.js";
import { isValid } from "zod/v3";
class AuthController {
    async register(req, res) {
        const { email, password, username, role } = req.body;
        try {
            const result = await AuthService.register({
                email,
                password,
                username,
                role,
            });
            res.status(201).json({
                message: "User registered successfully",
                userId: result.userId,
            });
        }
        catch (error) {
            res.status(error.statusCode).json({ message: error.message });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const result = await AuthService.login({ email, password });
            res.status(200).json({
                message: "User logged in successfully",
                token: result.token,
                user: result.sanitizedUser,
            });
        }
        catch (error) {
            res.status(error.statusCode).json({ message: error.message });
        }
    }
    async validateProfile(req, res) {
        try {
            const user = await AuthService.validateUser(req.user.userId);
            res.status(200).json({
                message: "User profile retrieved successfully",
                user,
                isValid: true,
            });
        }
        catch (error) {
            res.status(error.statusCode).json({ success: false, message: error.message });
        }
    }
}
export default new AuthController();
//# sourceMappingURL=auth.controller.js.map