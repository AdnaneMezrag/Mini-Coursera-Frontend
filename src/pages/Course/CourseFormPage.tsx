import { useEffect, useState } from 'react'
import CourseForm from './CourseForm';
import CourseModuleFrom from '@/components/CourseModule/CourseModuleFrom';
import type { CourseModule,ModuleContent } from '@/types/CourseModule';
import {Plus} from 'lucide-react'
import type { Mode } from '../../types/Util'; 
import { helpers } from '@/Utilities/helpers';
import { CourseService } from '@/api/courseService';

interface CourseFormPageProps{
  courseId: number;
}



function CreateUpdateCourse({courseId} : CourseFormPageProps) {
  courseId = 1;
  const [courseModules,setCourseModules] = useState<CourseModule[]>([]);

  async function fetchModules() {
    try {
      const modules = await CourseService.getCourseModulesByCourseId(courseId?.toString());
      setCourseModules(modules);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  useEffect(()=>{
    fetchModules();
  },[courseId])

  const handleAddModule = () =>{
    const courseModule1:CourseModule = {tempId:helpers.generateUUID()};
    setCourseModules(prev => [...prev,courseModule1]);
  }

  return (
    <div className='container'>
      {/* <CourseForm></CourseForm> */}
      <div className='container max-w-5xl'>
        {courseModules && courseModules.map((courseModule,index) => {
          courseModule.moduleNumber = index +1;
         return(
          <CourseModuleFrom key={courseModule.id || courseModule.tempId} courseModule={courseModule}
          setCourseModules={setCourseModules}></CourseModuleFrom>
        )})}
        
        <button type="button"
          className="mt-2 w-[150px] cursor-pointer border-1 border-solid border-[#bcbdbe] bg-white flex items-center gap-2 px-4 py-2 rounded-[4px] text-primary text-sm font-medium hover:bg-hover transition"
          onClick={handleAddModule}
          >
          <Plus className="w-4 h-4" />Add Module
        </button>
        
      </div>

    </div>
  )
}

export default CreateUpdateCourse