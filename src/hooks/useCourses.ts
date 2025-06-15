import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import type { CourseType } from '../types/CourseType';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export function useCourses(sectionType: string) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const getEndpoint = (): string => {
    switch (sectionType) {
      case 'NewCourses':
        return API_ENDPOINTS.COURSES.NEW;
      case 'PopularCourses':
        return API_ENDPOINTS.COURSES.POPULAR;
      case 'DiscoverCourses':
        return API_ENDPOINTS.COURSES.DISCOVER;
      case 'SearchCourses':
        return API_ENDPOINTS.COURSES.SEARCH;
      default:
        return API_ENDPOINTS.COURSES.NEW;
    }
  };

  useEffect(() => {
    const endpoint = getEndpoint();
    const params = new URLSearchParams();

    const searchTerm = searchParams.get('q');
    if (searchTerm) params.append('searchTerm', searchTerm);

    searchParams.getAll('subjectIDs').forEach(id => params.append('subjectIDs', id));
    searchParams.getAll('languageIDs').forEach(id => params.append('languageIDs', id));
    searchParams.getAll('levels').forEach(level => params.append('levels', level));

    setIsLoading(true);
    setError(null);

    axios.get(endpoint, { params })
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        setCourses([]);
        setError(error.message || 'Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [searchParams, sectionType]);

  return { courses, isLoading, error };
}
