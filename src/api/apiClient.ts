import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7124/api', // Development
  withCredentials: true, // Required for HTTP-only cookies (refresh token)
});

// Add request interceptor to inject the access token
apiClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const accessToken = user.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 (Unauthorized) and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint (HTTP-only cookie sends refresh token automatically)
        const refreshResponse = await axios.post(
          'https://localhost:7124/api/User/refreshToken',{},
          { withCredentials: true } // Ensure cookies are sent
        );

        // Update stored access token
        console.log("Tooken Refreshing . . .");
        const newAccessToken = refreshResponse.data.token;

        // 1. Read the current user object from localStorage
        const userJson = localStorage.getItem('user');
        if (userJson) {
          // 2. Parse the JSON string to a real object
          const user = JSON.parse(userJson);

          // 3. Update or add the accessToken field
          user.accessToken = newAccessToken;

          // 4. Save the updated object back to localStorage
          localStorage.setItem('user', JSON.stringify(user));
        }

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token failed → force logout
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          delete user.accessToken;
          localStorage.setItem('user', JSON.stringify(user));
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;