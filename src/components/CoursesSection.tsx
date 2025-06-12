import React, { useEffect } from 'react';
import Course from './Course';
import axios from 'axios';
import type { CoursesSectionProps,CourseType } from '../types/CourseType';
import {API_ENDPOINTS} from '../constants/apiEndpoints';

const CourseSection = (sectionType: string)=> {
switch (sectionType) {
  case 'NewCourses':
    return 'NewCourses';
  case 'PopularCourses':
    return 'PopularCourses';
  case 'DiscoverCourses':
    return 'Discover Something New';
    case 'SearchCourses':
    return 'Search Results';
  default:
    return '';
}
}

function CoursesSection({sectionType, searchTerm }: CoursesSectionProps) {
      // Get API endpoint based on section type
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
}
        const endpoint = getEndpoint();
        const sectionHeader = CourseSection(sectionType);
        const [courses, setCourses] = React.useState<CourseType[]>([]);


        const config = sectionType === 'SearchCourses'? { params: { searchTerm: searchTerm } }: {};
        useEffect(() => {
            // courses.length = 0; // Clear previous courses
            axios.get(endpoint, config )
                
                .then(response => {
                    setCourses(response.data);
                })
                .catch(error => {
                    courses.length = 0; // Clear previous courses on erro
                    setCourses([]);
                    console.error('There was an error fetching the courses!', error.message);
                })
        },[searchTerm]);
  return (
<section className='recently-viewed mt-10'>
  <h3 className='text-3xl font-bold'>{sectionHeader}</h3>
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-4'>
    {courses.map((course) => (
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

  )
}

export default CoursesSection