import axios from "axios";
import { SERVER_URL } from "../constants";
import * as SecureStore from "expo-secure-store";
import { getToken } from "./session";

// Create an Axios instance
const API = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies with requests (for refresh token)
});

// Flag to prevent multiple refresh token requests at the same time
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Add the access token before each request
// Interceptor to add the Authorization header
API.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    console.log("API - Retrieved token:", token);

    if (token) {
      config.headers.Authorization = `Admin ${token}`;
      console.log(
        "API - Setting Authorization header:",
        config.headers.Authorization
      );
    } else {
      console.log("API - No token found in storage");
    }

    return config;
  },
  (error) => {
    console.error("API - Request interceptor error:", error);
    return Promise.reject(error);
  }
);
// Response Interceptor: Handle access token expiration
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to token expiration
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Access token expired"
    ) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Call the refresh token API
          const { data } = await axios.post(
            `${SERVER_URL}/api/v1/auths/refresh`,
            {},
            { withCredentials: true }
          );
          console.log(data.data.accessToken, "dataaaaaaaaa");
          const newAccessToken = data.data.accessToken;
          console.log(newAccessToken);
          // Store the new access token
          await SecureStore.setItemAsync("access_token", newAccessToken);

          // Retry the original failed request with the new access token
          processQueue(null, newAccessToken);

          // Set the new token in the headers
          originalRequest.headers.Authorization = `Admin ${newAccessToken}`;

          return API(originalRequest);
        } catch (err) {
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        // If a refresh token request is already in progress, queue up the failed request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Admin ${token}`;
            return API(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    }

    return Promise.reject(error);
  }
);

export default API;
