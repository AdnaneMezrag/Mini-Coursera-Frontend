import React from 'react'
import Course from '../components/Course'
import CategoryItem from '../components/CategoryItem'
function Home() {
  return (
    <div>
        <main>
            
            <section className='recently-viewed mt-10'> 

                    <h3 className='text-3xl font-bold'>Recently Viewed</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7
                    mt-4'>
                        <Course></Course>
                        <Course></Course>
                        <Course></Course>
                        <Course></Course>
                    </div>

            </section>

            <section className='most-popular mt-10'> 

                    <h3 className='text-3xl font-bold'>Most Popular</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7
                    mt-4'>
                        <Course></Course>
                        <Course></Course>
                        <Course></Course>
                        <Course></Course>
                    </div>

            </section>

            <section className='other mt-10'> 

                    <h3 className='text-3xl font-bold'>Other</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7
                    mt-4'>
                        <Course></Course>
                        <Course></Course>
                        <Course></Course>
                        <Course></Course>
                    </div>

            </section>

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