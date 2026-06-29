import mongoose from "mongoose";
declare class UserService {
    getAllUsers(req: any): Promise<(mongoose.Document<unknown, {}, import("./user.types.js").IUser, {}, mongoose.DefaultSchemaOptions> & import("./user.types.js").IUser & Required<{
        _id: string;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user.service.d.ts.map