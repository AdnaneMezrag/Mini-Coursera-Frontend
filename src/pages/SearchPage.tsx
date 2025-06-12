import FilterSection from '../components/SearchPage/FilterSection';
import CoursesSection from '../components/CoursesSection';
import {useLocation } from 'react-router-dom';
import React from 'react';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
    const query = useQuery().get('q') || '';
  return (
    <div className=' sm:grid sm:grid-cols-[1fr_4fr] gap-10'>

      <aside className='h-[300px] overflow-y-scroll'>
        <form action="" method='get'>
        <FilterSection filterName='Language' filters={["French","English","Arabic","Dutsh","English","Arabic"]}></FilterSection>
        <FilterSection filterName='Category' filters={["Technology","Science","Health","Education","Entertainment","Sports"]}></FilterSection>
        <FilterSection filterName='Duration' filters={["Short","Medium","Long"]}></FilterSection>        
        </form>

      </aside>
        <CoursesSection sectionType='SearchCourses' searchTerm={query}></CoursesSection>
    </div>
  )
}
