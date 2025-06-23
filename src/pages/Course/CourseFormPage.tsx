import React from 'react'
import CourseForm from './CourseForm';
type Mode = 'create' | 'update';


interface CourseFormPageProps{
  mode: Mode;
}

function CreateUpdateCourse({mode} : CourseFormPageProps) {
  return (
    <div className='container'>
      <CourseForm></CourseForm>
    </div>
  )
}

export default CreateUpdateCourse