import FilterSection from '../components/SearchPage/FilterSection';
import CoursesSection from '../components/CoursesSection';
import {useLocation } from 'react-router-dom';
import { useState } from 'react';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}


export default function SearchPage() {
  const [selectedSubjectIDs,setselectedSubjectIDs] = useState<number[]>([]);


  function handleSubmit(){
    
  }

  const query = useQuery().get('q') || '';
  return (
    <div className=' sm:grid sm:grid-cols-[1fr_4fr] gap-10'>

      <aside className='h-[300px] overflow-y-scroll'>
        <form>

          <FilterSection setSelected={setselectedSubjectIDs} selected={selectedSubjectIDs}
  filterName='Subjects' 
  filters={[
    "Business",
    "Computer Science",
    "Information Technology",
    "Data Science",
    "Health",
    "Physical Science and Engineering",
    "Social Sciences",
    "Arts and Humanities",
    "Personal Development",
    "Language Learning",
    "Math and Logic"
  ]} 
/>

{/* <FilterSection 
  filterName='Language' 
  filters={[
    "English",
    "Spanish",
    "French",
    "Arabic",
    "Portuguese (Brazil)",
    "German",
    "Chinese (China)",
    "Japanese",
    "Indonesian",
    "Russian",
    "Korean",
    "Hindi",
    "Turkish",
    "Ukrainian",
    "Italian",
    "Thai",
    "Polish",
    "Dutch",
    "Swedish",
    "Greek",
    "Kazakh",
    "Hungarian",
    "Azerbaijani",
    "Vietnamese",
    "Pushto",
    "Chinese (Traditional)",
    "Hebrew",
    "Portuguese",
    "Portuguese (Portugal)",
    "Catalan",
    "Croatian",
    "Kannada",
    "Swahili"
  ]}
/>
<FilterSection 
  filterName='Level' 
  filters={[
    "Beginner",
    "Intermediate",
    "Advanced",
    "Mixed"
  ]}
/> */}

<button type='submit'>Apply Filters</button>

        </form>

      </aside>
        <CoursesSection sectionType='FilterCourses' 
         filters={{subjectIDs:selectedSubjectIDs , searchTerm:query}}></CoursesSection>
    </div>
  )
}
