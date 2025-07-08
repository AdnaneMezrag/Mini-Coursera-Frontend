import CourseContentMenu from '../../components/Course/CourseContentMenu'
import { CourseService } from '../../api/courseService';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SafeHTML from '../../components/Utilities/SafeHTML';
import { EnrollmentService } from '../../api/enrollmentService';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import CourseVideoPlayer from '@/components/Utilities/CourseVideoPlayer';


function CourseContentPage() {
  const [courseSections, setCourseSections] = useState([]);
  const { id } = useParams();
  const courseId = Number(id); // now it's a number
  const [moduleContent,setModuleContent] = useState({'content': '','videoUrl': '', 'name': '','id':0});
  const videoUrl = moduleContent.videoUrl;
  const content = moduleContent.content;
  const contentName = moduleContent.name;
  const [enrollment,setEnrollment] = useState<any>({});
  const [completedModuleContents,setcompletedModuleContents] = useState<any>([]);
  const navigate = useNavigate();

  const user = useContext(UserContext);

  async function handleMarkCourse (moduleContentId:number) {
    if(!user.user || !enrollment?.id){
      console.log(enrollment);
      return;
    }
    if(completedModuleContents.includes(moduleContentId)) return;
    await EnrollmentService.createEnrollmentProgress({enrollmentId: enrollment.id,moduleContentId:moduleContentId });
    setcompletedModuleContents([...completedModuleContents,moduleContentId]); 
  }

  async function GetEnrollment () {
    if(!user.user){
      return ;
    }
    const enrollment = await EnrollmentService.GetEnrollmentByCourseIdAndStudentId(courseId,user.user?.id);
    setEnrollment(enrollment);
    setcompletedModuleContents(enrollment.enrollmentProgress.map((x: { moduleContentId: number }) => x.moduleContentId));
  }

  useEffect(() => {
  if(!user.user) navigate('/');
  GetEnrollment();
  CourseService.getCourseModulesByCourseId(courseId)
    .then(response => {
      setCourseSections(response); // Ensure sections is an array
    })
    .catch(error => {
      console.error('Error fetching course sections:', error);
      return []; // Return an empty array or handle the error as needed
    });
  }, [courseId]);


  return (
    <div>
      {/* {!user.user && navigate('/')} */}
      <div className='container sm:grid sm:grid-cols-[2fr_8fr] gap-10 p-2'>
        <aside>
          <CourseContentMenu CourseModules={courseSections} setModuleContent={setModuleContent}
          completedModuleContents={completedModuleContents}/>
        </aside>

        <main className='mt-10 sm:mt-0'>
          <h2 className='text-4xl font-medium mb-6'>{contentName}</h2>
          {videoUrl && <CourseVideoPlayer videoUrl={videoUrl} />}

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