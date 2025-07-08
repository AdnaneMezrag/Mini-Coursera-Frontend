import Course from './Course';
import { useCourses } from '../../hooks/useCourses';

function CourseSection(sectionType: string) {
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
}

interface CoursesSectionProps{
sectionType: string;
}

function CoursesSection({ sectionType }: CoursesSectionProps) {
  const { courses, isLoading, error } = useCourses(sectionType);
  const sectionHeader = CourseSection(sectionType);

  return (
    <section className='recently-viewed mt-10'>
      <h3 className='text-3xl font-bold'>{sectionHeader}</h3>

      {isLoading && <p>Loading...</p>}
      {error && <p className='text-red-500'>Error: {error}</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-4'>
        {courses.map(course => (
          <Course
            key={course.id}
            id={course.id}
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
