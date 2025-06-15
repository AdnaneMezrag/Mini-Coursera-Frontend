import { useEffect, useState } from 'react';
import axios from 'axios';
import {API_ENDPOINTS} from '../constants/apiEndpoints';

export function useFetchCourseById(id: string | undefined) {
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_ENDPOINTS.COURSES.GET}${id}`);
        setCourse(response.data);
      } catch (err: any) {
        setError(err.response?.data || 'Failed to fetch course');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { course, isLoading, error };
}
