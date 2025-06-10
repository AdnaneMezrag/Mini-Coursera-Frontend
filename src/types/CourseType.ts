// types/course-types.ts
export type CourseSectionType = 'NewCourses' | 'PopularCourses' | 'DiscoverCourses';

export interface CourseProps {
  // Define any props you want to pass to the component
  title:string ;
  provider:string;
  imageSrc:string;
  providerIconSrc:string;
}

export interface CoursesSectionProps {
  sectionType: CourseSectionType;
}

export type CourseType = {
    id: number;
    title:string ;
    imageUrl:string;
    price:number;
    instructorName:string;
    instructorImageUrl:string;
    }