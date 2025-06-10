// src/constants/apiEndpoints.ts
const host = 'https://localhost:7124';
export const API_ENDPOINTS = {
  COURSES: {
    NEW: `${host}/api/courses/new`,
    POPULAR: `${host}/api/courses/popular`,
    DISCOVER: `${host}/api/courses/discover`,
  },
  USERS: `${host}/api/users`,
  // ... other endpoints
} as const;