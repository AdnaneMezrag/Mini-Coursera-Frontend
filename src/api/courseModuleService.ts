import apiClient from "./apiClient";

export const CourseModuleService = {

    async createCourseModule(data:{
        courseId:number,
        name:string,
        description:string
    }):Promise<number>{

        try{
            return (await apiClient.post("coursemodule",data)).data;

        }catch(error){
            console.error("Error creating course module:", error);
            throw error;
        }
    },

    async updateCourseModule(id: number, data: {
    name: string;
    description: string;
  }): Promise<void> {
    try {
      await apiClient.put(`coursemodule/${id}`, data);
    } catch (error) {
      console.error(`Error updating course module with ID ${id}:`, error);
      throw error;
    }
  },

    async deleteCourseModule(id: number): Promise<void> {
  try {
    await apiClient.delete(`coursemodule/${id}`);
  } catch (error) {
    console.error(`Error deleting course module with ID ${id}:`, error);
    throw error;
  }
}

}