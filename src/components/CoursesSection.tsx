import { useEffect, useState } from 'react';
import Course from './Course';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import type {CourseType } from '../types/CourseType';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const CourseSection = (sectionType: string) => {
  switch (sectionType) {
    case 'NewCourses':
      return 'New Courses';
    case 'PopularCourses':
      return 'Popular Courses';
    case 'DiscoverCourses':
      return 'Discover Something New';
    case 'SearchCourses':
      return 'Search Results';
    default:
      return '';
  }
};

function CoursesSection({ sectionType }: { sectionType: string }) {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<CourseType[]>([]);

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

  const endpoint = getEndpoint();
  const sectionHeader = CourseSection(sectionType);

  useEffect(() => {
    const params = new URLSearchParams();

    const searchTerm = searchParams.get('q');
    if (searchTerm) params.append('searchTerm', searchTerm);

    searchParams.getAll('subjectIDs').forEach(id => params.append('subjectIDs', id));
    searchParams.getAll('languageIDs').forEach(id => params.append('languageIDs', id));
    searchParams.getAll('levels').forEach(level => params.append('levels', level));

    axios.get(endpoint, { params })
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        setCourses([]);
        console.error('Error fetching courses:', error.message);
      });

  }, [searchParams]);

  return (
    <section className='recently-viewed mt-10'>
      <h3 className='text-3xl font-bold'>{sectionHeader}</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-4'>
        {courses.map(course => (
          <Course
            key={course.id}
            title={course.title}
            imageSrc={course.imageUrl}
            provider={course.instructorName}
            providerIconSrc={course.instructorImageUrl}
          />
        ))}
      </div>
    </section>
  );
}

export default CoursesSection;
