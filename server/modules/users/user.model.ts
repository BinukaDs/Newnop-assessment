import mongoose, { Schema, Document } from "mongoose";
import type {IUser} from "../../types/user.types.js";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;