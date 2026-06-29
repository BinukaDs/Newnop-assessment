import mongoose, { Schema, Document } from "mongoose";
const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    assignedTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
}, { timestamps: true });
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
//# sourceMappingURL=user.model.js.map