import mongoose from "mongoose";
import type { IUser } from "./user.types.js";
declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map