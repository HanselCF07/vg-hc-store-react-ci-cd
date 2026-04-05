import axios from "axios";
import { getToken, removeToken } from "../utils/tokenUtils";


// console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
// console.log("Axios baseURL configurado:", apiClient.defaults.baseURL);

// Create an Axios instance with the base URL from .env
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to exclude public services
apiClient.interceptors.request.use(
  (config) => {
    // Public Endpoints
    const publicEndpoints = [
      "/authentication/user/login",
      "/authentication/user/logout",
      "/authentication/user/sign-in-ct"
    ];

    // Check if the URL is exactly one of the public endpoints
    const isExactPublic = publicEndpoints.some(endpoint => config.url.includes(endpoint));

    // Check if the URL contains /data/public/ anywhere
    const isPublicData = config.url.includes("/public/");

    if (isExactPublic || isPublicData) {
      return config; // Don't add token
    }

    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Invalid or expired token → log out
      removeToken();
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);


export default apiClient;