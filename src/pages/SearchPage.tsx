import FilterSection from '../components/SearchPage/FilterSection';
import CoursesSection from '../components/Course/CoursesSection';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <div className='p-1 container sm:grid sm:grid-cols-[1fr_4fr] gap-10'>
      <aside className='h-[300px] overflow-y-scroll'>
        <form>
          <FilterSection
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            filterName='Subject'
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

          <FilterSection
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            filterName='Language'
            filters={[
              "English", "Spanish", "French", "Arabic", "Portuguese (Brazil)",
              "German", "Chinese (China)", "Japanese", "Indonesian", "Russian",
              "Korean", "Hindi", "Turkish", "Ukrainian", "Italian", "Thai",
              "Polish", "Dutch", "Swedish", "Greek", "Kazakh", "Hungarian",
              "Azerbaijani", "Vietnamese", "Pushto", "Chinese (Traditional)",
              "Hebrew", "Portuguese", "Portuguese (Portugal)", "Catalan",
              "Croatian", "Kannada", "Swahili"
            ]}
          />

          <FilterSection
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            filterName='Level'
            filters={["Beginner", "Intermediate", "Advanced", "Mixed"]}
          />
        </form>
      </aside>

      <CoursesSection sectionType='SearchCourses' />
    </div>
  );
}
