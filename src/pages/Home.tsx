import CategoryItem from '../components/CategoryItem'
import CoursesSection from '../components/CoursesSection'


function Home() {
  return (
    <div>
        <main>
            <CoursesSection sectionType = {"NewCourses"}></CoursesSection>
            <CoursesSection sectionType = {"PopularCourses"}></CoursesSection>
            <CoursesSection sectionType = {"DiscoverCourses"}></CoursesSection>
            <CoursesSection sectionType = {"SearchCourses"}></CoursesSection>
        </main>

        <aside className=' mt-10'>
            <div>
                <h3 className='text-3xl font-bold'>Categories</h3>
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    <CategoryItem title = "Arts and Humanities" link='#'/>
                    <CategoryItem title = "Information Technology" link='#'/>
                    <CategoryItem title = "Computer Science" link='#'/>
                    <CategoryItem title = "Math and Logic" link='#'/>
                    <CategoryItem title = "Physical Science and Engineering" link='#'/>
                    <CategoryItem title = "Language Learning" link='#'/>
                    <CategoryItem title = "Business" link='#'/>
                    <CategoryItem title = "Data Science" link='#'/>
                    <CategoryItem title = "Health" link='#'/>
                    <CategoryItem title = "Personal Development" link='#'/>
                    <CategoryItem title = "Social Sciences" link='#'/>
                </ul>
            </div>
        </aside>
        
    </div>
  )
}

export default Home