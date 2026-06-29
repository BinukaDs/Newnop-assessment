import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes.js";
import taskRouter from "./modules/tasks/task.routes.js";
import userRouter from "./modules/users/user.routes.js";
import errorHandler from "./utils/errorHandler.js";
import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(multer().any());

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Task Management System API is running");
});

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(errorHandler);

export default app;
