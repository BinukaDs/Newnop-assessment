import type { IUser } from "../users/user.types.js";
declare class AuthService {
    register(userData: IUser): Promise<{
        userId: string;
    }>;
    login(credentials: any): Promise<{
        token: string;
        sanitizedUser: {
            _id: string;
            username: string;
            email: string;
            role: "user" | "admin" | undefined;
        };
    }>;
    validateUser(userId: string): Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map