import mongoose, { Schema } from "mongoose";

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "done"],
      default: "open",
      required: true,
    },
    dueDate: { type: Date },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
