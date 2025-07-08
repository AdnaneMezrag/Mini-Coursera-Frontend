import { useEffect, useState } from 'react'
import CourseForm from './CourseForm';
import CourseModuleFrom from '@/components/CourseModule/CourseModuleFrom';
import type { CourseModule } from '@/types/CourseModule';
import {Plus} from 'lucide-react'
import { helpers } from '@/Utilities/helpers';
import { CourseService } from '@/api/courseService';
import { useParams } from 'react-router-dom';



function CreateUpdateCourse() {

  const { courseId: courseIdStr } = useParams(); // courseIdStr is string | undefined
  const courseId = Number(courseIdStr); // ✅ Now courseId is a number  console.log(courseId);
  const [courseIdState,setCourseIdState] = useState<number | null>(courseId);
  const [courseModules,setCourseModules] = useState<CourseModule[]>([]);
  const [pageNbr,setPageNbr] = useState<number>(1);

  async function fetchModules() {
    if(!courseIdState) return;
    try {
      const modules = await CourseService.getCourseModulesByCourseId(courseIdState);
      console.log("Modules: ",modules);
      setCourseModules(modules);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  useEffect(()=>{
    fetchModules();
  },[courseIdState,pageNbr])

  const handleAddModule = () =>{
    const courseModule1:CourseModule = {tempId:helpers.generateUUID(),id:null,name:'',description:'',moduleContents:null,moduleNumber:0};
    setCourseModules(prev => [...prev,courseModule1]);
  }

  const handlePreviousPage = () =>{
    setPageNbr(1);
  }

  return (
    <div className='container'>

      {pageNbr === 1 && (<CourseForm setPageNbr={setPageNbr} setCourseIdState={setCourseIdState}
      courseId={courseIdState}></CourseForm>)}

      {pageNbr === 2 && (
      <div className='container max-w-5xl'>
        {courseModules && courseModules.map((courseModule,index) => {
          courseModule.moduleNumber = index +1;
         return(
          <CourseModuleFrom key={courseModule.id || courseModule.tempId} courseModule={courseModule}
          setCourseModules={setCourseModules} courseID = {courseIdState}></CourseModuleFrom>
        )})}
        
        <button type="button"
          className="mt-2 w-[150px] cursor-pointer border-1 border-solid border-[#bcbdbe] bg-white flex items-center gap-2 px-4 py-2 rounded-[4px] text-primary text-sm font-medium hover:bg-hover transition"
          onClick={handleAddModule}
          >
          <Plus className="w-4 h-4" />Add Module
        </button>
        
        <div className='p-2'>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handlePreviousPage}
          >
            Previous
          </button>
        </div>

      </div>)}


    </div>
  )
}

export default CreateUpdateCourse