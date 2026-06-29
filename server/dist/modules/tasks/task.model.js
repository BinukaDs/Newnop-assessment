import mongoose, { Schema } from "mongoose";
const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    status: {
        type: String,
        enum: ["open", "in-progress", "testing", "complete"],
        default: "open",
        required: true,
    },
    dueDate: { type: Date },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;
//# sourceMappingURL=task.model.js.map