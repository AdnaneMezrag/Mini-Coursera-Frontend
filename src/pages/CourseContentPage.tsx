import CourseContentMenu from '../components/Course/CourseContentMenu'
import { CourseService } from '../api/courseService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SafeHTML from '../components/Utilities/SafeHTML';

function CourseContentPage() {
  const [courseSections, setCourseSections] = useState([]);
  const { id:courseId } = useParams(); // id will be a string
  const [moduleContent,setModuleContent] = useState({'content': '','videoUrl': '', 'name': ''});
  const videoUrl = moduleContent.videoUrl;
  const content = moduleContent.content;
  const contentName = moduleContent.name;

  useEffect(() => {
  CourseService.getCourseModulesByCourseId(courseId || "")
    .then(response => {
      setCourseSections(response); // Ensure sections is an array
    } )
    .catch(error => {
      console.error('Error fetching course sections:', error);
      return []; // Return an empty array or handle the error as needed
    });
  }, [courseId]);

  return (
    <div>
      <div className='container sm:grid sm:grid-cols-[2fr_6fr] gap-10'>
        <aside>
          <CourseContentMenu CourseModules={courseSections} setModuleContent={setModuleContent}/>
        </aside>

        <main className='mt-10 sm:mt-0'>
          <h2 className='text-4xl font-medium mb-6'>{contentName}</h2>
          {videoUrl &&
          <video className='rounded-lg'
                key={videoUrl} // 🔥 force re-render when URL changes
                controls
                style={{ width: '100%', height: 'auto' }}
              >
                <source
                  src={videoUrl}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
          </video>
          }
          

        <article className={videoUrl && 'mt-10 w-full'}>
          <SafeHTML html = {content}></SafeHTML>
        </article>

        </main>
      </div>



    </div>
  )
}

export default CourseContentPage