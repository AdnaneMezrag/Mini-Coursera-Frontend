// src/constants/apiEndpoints.ts
const host = 'https://localhost:7124';
export const API_ENDPOINTS = {
  COURSES: {
    NEW: `${host}/api/courses/new`,
    POPULAR: `${host}/api/courses/popular`,
    DISCOVER: `${host}/api/courses/discover`,
    // SEARCH: `${host}/api/courses/search`,
    FILTER: `${host}/api/courses/search`,
  },
  USERS: `${host}/api/users`,
  // ... other endpoints
} as const;