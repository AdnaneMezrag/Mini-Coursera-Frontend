import apiClient from "./apiClient";

export const EnrollmentService = {
  async enrollStudent(courseId: number, studentId: number) {
    try {
        const response = await apiClient.post(`enrollment`, {
            studentId: studentId,
            courseId: courseId
        });
        return response.data;
    } catch (error) {
        console.error("Error enrolling student:", error);
        throw error;
    }
    },}