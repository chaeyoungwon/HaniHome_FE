import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    const isAuthRequest = config.url?.includes("api/v1/auth/social/login");

    if (!isAuthRequest) {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => {
    const authHeader = response.headers["authorization"];
    if (authHeader?.startsWith("Bearer ")) {
      const newToken = authHeader.split(" ")[1];
      useAuthStore.getState().setAccessToken(newToken);
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post("/api/v1/auth/refresh");

        const newTokenHeader = res.headers["authorization"];
        if (newTokenHeader?.startsWith("Bearer ")) {
          const newToken = newTokenHeader.split(" ")[1];
          useAuthStore.getState().setAccessToken(newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("토큰 재발급 실패", refreshError);
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
