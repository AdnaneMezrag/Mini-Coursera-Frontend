import axios from 'axios';

export const getFilteredCourses = async (searchTerm: string, filters: Record<string, number[]>) => {
  try {
    const response = await axios.get('/api/courses/filter', {
      params: {
        searchTerm,
        ...filters
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered courses:', error);
    throw error;
  }
}