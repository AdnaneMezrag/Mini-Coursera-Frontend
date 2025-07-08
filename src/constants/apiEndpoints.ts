// src/constants/apiEndpoints.ts
const host = 'https://mini-coursera-backend.onrender.com';
export const API_ENDPOINTS = {
  COURSES: {
    NEW: `${host}/api/courses/new`,
    POPULAR: `${host}/api/courses/popular`,
    DISCOVER: `${host}/api/courses/discover`,
    SEARCH: `${host}/api/courses/search`,
    GET: `${host}/api/courses/`,
    INSTRUCTOR: '/courses/instructorCourses',
  },
  USERS: `${host}/api/users`,
  // ... other endpoints
} as const;