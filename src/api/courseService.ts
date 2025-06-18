import apiClient from "./apiClient";


export const CourseService = {
  async getCourseModulesByCourseId(courseId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/courses/modules?courseId=${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course modules:', error);
      throw error;
    }
}
}