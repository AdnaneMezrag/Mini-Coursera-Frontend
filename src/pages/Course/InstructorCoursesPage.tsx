import { use, useContext, useEffect, useState } from 'react';
import { useCourses } from '@/hooks/useCourses';
import { UserContext } from '@/contexts/userContext';
import course from '@/components/Course/Course';
import type { CourseType } from '@/types/CourseType';
import { CourseService } from '@/api/courseService';
import { useNavigate } from 'react-router-dom';
import CreateUpdateCourse from './CreateUpdateCoursePage';
import { Plus } from 'lucide-react';


function InstructorCoursesPage() {
  const user = useContext(UserContext);
  const [courses,setCourses] = useState<CourseType[]>([]);
  const navigate = useNavigate();

    useEffect (() => {
        fetchCourses();
    },[user.user])

  console.log(user.user);
  if (!user.user) {
    return <div className="container text-red-500">Unauthorized. You must be logged in to view this page.</div>;
  }

  async function fetchCourses (){
    try{
      if (user && user.user) {
        const data = await CourseService.getInstructorCourses(user.user.id);
        setCourses(data);
      }
    }catch{
    }
  }

  const handleUpdateCourse = (courseId:number) => {
    navigate(`/courses/${courseId}/edit`);
  }

  const handleAddCourse = () =>{
    navigate('/courses/new');
  }

  return (
    <div className='container'>
        <div className='flex justify-between mb-2'>
            <h2 className="text-2xl font-bold mb-4">My Courses</h2>
            <button
            onClick={handleAddCourse}
            className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-xl shadow hover:bg-blue-700 transition-all duration-200"
            > <Plus size={18}      
            />Add Course</button>
        </div>
    {courses.length === 0 ? (
        <div>No courses found.</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* {console.log(courses)} */}
          {courses.map(course => (
            <li key={course.id} className="border p-4 rounded shadow cursor-pointer hover:bg-hover"
            onClick={() => handleUpdateCourse(course.id)}>
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600">Price: ${course.price}</p>
              {/* <img src={course.imageUrl}></img> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InstructorCoursesPage;
