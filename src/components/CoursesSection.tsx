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

function CoursesSection({sectionType,filters }: CoursesSectionProps) {
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
        return API_ENDPOINTS.COURSES.FILTER;
        case 'FilterCourses':
        return API_ENDPOINTS.COURSES.FILTER;
      default:
        return API_ENDPOINTS.COURSES.NEW;
    }
}
        const endpoint = getEndpoint();
        const sectionHeader = CourseSection(sectionType);
        const [courses, setCourses] = React.useState<CourseType[]>([]);

        useEffect(() => {
          const params = new URLSearchParams();
        
          if(filters !== undefined){
            if (filters.searchTerm) params.append('searchTerm', filters.searchTerm);
            if (filters.subjectIDs?.length) filters.subjectIDs.forEach(id => params.append('subjectIDs', id.toString()));;
            if (filters.languageIDs?.length) params.append('languageIDs', filters.languageIDs.join(','));
            if (filters.levels?.length) params.append('levels', filters.levels.join(','));
          }
            console.log(params);
            axios.get(endpoint, {params} )
                
                .then(response => {
            console.log(response.data);
                    setCourses(response.data);
                })
                .catch(error => {
                    courses.length = 0; // Clear previous courses on erro
                    setCourses([]);
                    console.error('There was an error fetching the courses!', error.message);
                })
        },[filters]);
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