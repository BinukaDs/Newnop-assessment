import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export type CreateHttpClientOptions = {
  baseURL?: string;
  headers?: AxiosRequestConfig["headers"];
  withAuth?: boolean;
};

export function createHttpClient(
  options: {
    baseURL?: string;
    headers?: AxiosRequestConfig["headers"];
    withAuth?: boolean;
  } = {}
): AxiosInstance {
  const client = axios.create({
    baseURL:
      options.baseURL ??
      import.meta.env.VITE_SERVER_URL ??
      "http://localhost:3000",
    headers: options.headers,
  });

  client.interceptors.request.use((config) => {
    if (options.withAuth) {
      const token = localStorage.getItem("TMSAccessToken");
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      } else if (config.headers) {
        delete config.headers.Authorization;
      }
    }
    return config;
  });

  return client;
}
