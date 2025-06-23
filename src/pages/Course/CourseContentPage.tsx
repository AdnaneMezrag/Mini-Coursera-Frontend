import CourseContentMenu from '../../components/Course/CourseContentMenu'
import { CourseService } from '../../api/courseService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SafeHTML from '../../components/Utilities/SafeHTML';
import { EnrollmentService } from '../../api/enrollmentService';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';


function CourseContentPage() {
  const [courseSections, setCourseSections] = useState([]);
  const { id:courseId } = useParams(); // id will be a string
  const [moduleContent,setModuleContent] = useState({'content': '','videoUrl': '', 'name': '','id':0});
  const videoUrl = moduleContent.videoUrl;
  const content = moduleContent.content;
  const contentName = moduleContent.name;
  const [enrollment,setEnrollment] = useState({});
  const [completedModuleContents,setcompletedModuleContents] = useState([]);

  const user = useContext(UserContext);

  const handleMarkCourse = (moduleContentId:number) => {
    if(!user.user || enrollment.id === undefined){
      return;
    }
    if(completedModuleContents.includes(moduleContentId)) return;
    EnrollmentService.createEnrollmentProgress({enrollmentId: enrollment.id,moduleContentId:moduleContentId });
    setcompletedModuleContents([...completedModuleContents,moduleContentId]); 
  }

  async function GetEnrollment () {
    if(!user.user){
      return ;
    }
    const result = await EnrollmentService.GetEnrollmentByCourseIdAndStudentId(courseId,user.user?.id);
    setEnrollment(result);
    setcompletedModuleContents(result.enrollmentProgress.map(x => x.moduleContentId));
    console.log("Module Content IDs: ",result.enrollmentProgress.map(x => x.moduleContentId));
  }
  

  useEffect(() => {
  GetEnrollment();
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
      <div className='container sm:grid sm:grid-cols-[2fr_8fr] gap-10 p-2'>
        <aside>
          <CourseContentMenu CourseModules={courseSections} setModuleContent={setModuleContent}
          completedModuleContents={completedModuleContents}/>
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
          

        <article className={videoUrl && 'mt-10 w-full' }>
          <SafeHTML html = {content}></SafeHTML>
        </article>

          {moduleContent.name && (
            <div className={`mt-6 inline-block cursor-pointer px-4 py-4 bg-primary
           text-white rounded-[4px] hover:bg-primary/90 transition font-semibold`} 
           onClick={() => handleMarkCourse(moduleContent.id)}>Mark as completed</div>
          )}
          

        </main>
      </div>



    </div>
  )
}

export default CourseContentPage