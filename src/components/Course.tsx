import React from 'react'
interface CourseProps {
  // Define any props you want to pass to the component
  title:string ;
  provider:string;
  imageSrc:string;
  providerIconSrc:string;
}

function course({ title = "Leading People and Teams", provider = "University of California", imageSrc = "/src/assets/images/Course Image.png", providerIconSrc = "/src/assets/images/provider.png" }: CourseProps) {
  return (
    <div className=''>
    <div className='border-2 border-solid border-[#E0E0E0] rounded-2xl p-[6px] 
    flex flex-col items-center gap-2
    hover:shadow-lg hover:shadow-secondary transition-all duration-300 ease-in-out hover:scale-105'>
        <div className='image w-[100%] h-[150px]'>
            <img src={imageSrc} alt="Course's Image" loading='lazy'
             className='rounded-[10px] h-[100%] w-[100%]'/>
        </div>
        <div className='flex items-center w-[100%] gap-3 pl-2 flex-wrap'>
            <div className='icon w-[30px] h-[30px] border-1 border-secondary p-0.5 rounded-[4px]'>
                <img src={providerIconSrc} className='h-[100%] w-[100%] rounded-[2px]' alt="Provider's Icon" />
            </div>
            <p className='provider text-accent text-[14px] font-medium'>{provider}</p>
            <h3 className='title font-bold text-[14px] pb-24 '>{title}</h3>
        </div>
    </div>
    </div>

  )
}

export default course