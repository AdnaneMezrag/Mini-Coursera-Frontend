import CategoryItem from '../components/Utilities/CategoryItem'
import CoursesSection from '../components/Course/CoursesSection'


function Home() {
  return (
    <div className='container'>
        <main>
            <CoursesSection sectionType = {"NewCourses"}></CoursesSection>
            <CoursesSection sectionType = {"PopularCourses"}></CoursesSection>
            <CoursesSection sectionType = {"DiscoverCourses"}></CoursesSection>
        </main>

        <aside className=' mt-10'>
            <div>
                <h3 className='text-3xl font-bold'>Categories</h3>
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    <CategoryItem title = "Arts and Humanities" link='/search?q=&subjectIDs=8'/>
                    <CategoryItem title = "Information Technology" link='search?q=&subjectIDs=3'/>
                    <CategoryItem title = "Computer Science" link='search?q=&subjectIDs=2'/>
                    <CategoryItem title = "Math and Logic" link='search?q=&subjectIDs=11'/>
                    <CategoryItem title = "Physical Science and Engineering" link='search?q=&subjectIDs=6'/>
                    <CategoryItem title = "Language Learning" link='search?q=&subjectIDs=10'/>
                    <CategoryItem title = "Business" link='search?q=&subjectIDs=1'/>
                    <CategoryItem title = "Data Science" link='search?q=&subjectIDs=4'/>
                    <CategoryItem title = "Health" link='search?q=&subjectIDs=5'/>
                    <CategoryItem title = "Personal Development" link='search?q=&subjectIDs=9'/>
                    <CategoryItem title = "Social Sciences" link='search?q=&subjectIDs=7'/>
                </ul>
            </div>
        </aside>
        
    </div>
  )
}

export default Home