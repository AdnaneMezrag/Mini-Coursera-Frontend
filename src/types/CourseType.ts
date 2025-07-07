import type { NavigateOptions } from 'react-router-dom';
import type { URLSearchParamsInit } from 'react-router-dom';

// types/course-types.ts
export type CourseSectionType = 'NewCourses' | 'PopularCourses' | 'DiscoverCourses' | 'SearchCourses'
| 'FilterCourses' | 'InstructorCourses';

export interface CourseProps {
  // Define any props you want to pass to the component
  id: number;
  title:string ;
  provider:string;
  imageSrc:string;
  providerIconSrc:string;
}

export type CourseLevel = "Beginner"| "Intermediate"| "Advanced"| "Mixed";

export interface FilterCoursesDTO {
  searchTerm?: string;
  subjectIDs?: number[];
  languageIDs?: number[];
  levels?: CourseLevel[];
}

export interface CoursesSectionProps {
  sectionType: CourseSectionType;
  searchTerm?: string; // Optional search term for search section
  filters?: FilterCoursesDTO;
searchParams: URLSearchParams;
setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: NavigateOptions) => void;
}

export type CourseType = {
    id: number;
    title:string ;
    imageUrl:string;
    price:number;
    instructorName:string;
    instructorImageUrl:string;
    }