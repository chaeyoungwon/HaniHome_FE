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
    const res = error.response;
    const resData = res?.data;

    const authHeader = res?.headers?.["authorization"];
    const { clearAuth } = useAuthStore.getState();

    const isAccessTokenExpired =
      res?.status === 400 &&
      (resData?.serviceCode === "ACCESS_TOKEN_EXPIRED" ||
        resData?.data?.codeName === "ACCESS_TOKEN_EXPIRED");

    const isRefreshTokenExpired =
      res?.status === 400 &&
      (resData?.serviceCode === "INVALID_REFRESH_TOKEN" ||
        resData?.data?.codeName === "INVALID_REFRESH_TOKEN");

    const isInvalidToken =
      res?.status === 400 && resData?.serviceCode === "INVALID_TOKEN";
    const originalRequest = error.config;

    if (isAccessTokenExpired && authHeader?.startsWith("Bearer ")) {
      const newToken = authHeader.split(" ")[1];
      useAuthStore.getState().setAccessToken(newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    }

    if (isRefreshTokenExpired || isInvalidToken) {
      clearAuth();
    }

    return Promise.reject(error);
  },
);
