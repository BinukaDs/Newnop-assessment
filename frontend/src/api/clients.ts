import { createHttpClient } from "./creatHttpClient";

export const taskApi = createHttpClient({
  withAuth: true,
  headers: {},
});

export const authApi = createHttpClient({
  withAuth: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const userApi = createHttpClient({
  withAuth: true,
  headers: {
    "Content-Type": "application/json",
  },
});
