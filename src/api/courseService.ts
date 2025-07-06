import apiClient from "./apiClient";

export interface CreateCourseInput {
  title: string;
  description: string;
  price: number;
  subjectId: number | null;
  languageId: number;
  level: CourseLevel;
  imageFile: File | null;
  instructorId: number;
}

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "Mixed";


export const CourseService = {
  async getCourseModulesByCourseId(courseId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/courses/modules?courseId=${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course modules:', error);
      throw error;
    }
},
 
 async createCourse(courseData:CreateCourseInput){
    const data = new FormData();
    data.append("title", courseData.title);
    data.append("description", courseData.description);
    data.append("price", courseData.price.toString());
    if (courseData.subjectId !== null) {
      data.append("subjectId", courseData.subjectId.toString());
    }
    data.append("languageId", courseData.languageId.toString());
    data.append("level", courseData.level);
    if (courseData.imageFile) {
      data.append("image", courseData.imageFile);
    }
    if(courseData.instructorId){
      data.append("instructorID",courseData.instructorId.toString());
    }

     try {
    const response =  await apiClient.post("/courses", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`Course creation failed: ${message}`);
  }
},

async getCourseById(courseId: number): Promise<any> {
  try {
    const response = await apiClient.get(`/courses/${courseId}`);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`Failed to fetch course: ${message}`);
  }
},


async updateCourse(courseId: number, courseData: CreateCourseInput): Promise<void> {
  const data = new FormData();
  data.append("title", courseData.title);
  data.append("description", courseData.description);
  data.append("price", courseData.price.toString());
  if (courseData.subjectId !== null) {
    data.append("subjectId", courseData.subjectId.toString());
  }
  data.append("languageId", courseData.languageId.toString());
  data.append("level", courseData.level);
  if (courseData.imageFile) {
    data.append("image", courseData.imageFile);
  }

  try {
    const response = await apiClient.put(`/courses/${courseId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Course updated successfully", response.data);
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`Course update failed: ${message}`);
  }
}


}