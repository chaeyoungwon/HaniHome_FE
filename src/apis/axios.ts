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
    const isAuthRequest =
      config.url?.includes("api/v1/auth/social/login") ||
      config.url?.includes("api/v1/auth/refresh");

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

// 응답 인터셉터에서 처리
axiosInstance.interceptors.response.use(
  response => {
    const authHeader = response.headers["authorization"];
    if (authHeader?.startsWith("Bearer ")) {
      const newToken = authHeader.split(" ")[1];
      useAuthStore.getState().setAccessToken(newToken);
    }
    return response;
  },
  error => {
    const { clearAuth } = useAuthStore.getState();
    const res = error.response;
    const code = res?.data?.serviceCode || res?.data?.data?.codeName || "";

    const shouldLogout =
      res?.status === 400 &&
      (code === "INVALID_REFRESH_TOKEN" ||
        code === "INVALID_TOKEN" ||
        code === "ACCESS_TOKEN_EXPIRED");

    if (shouldLogout) {
      clearAuth();
    }

    return Promise.reject(error);
  },
);
