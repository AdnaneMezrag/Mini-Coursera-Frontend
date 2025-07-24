import apiClient from './apiClient';
import type { UserCreateDTO } from '../types/UserType';

export const UserService = {
  async create(userData: UserCreateDTO): Promise<any> {
    const formData = new FormData();

    formData.append('userCreateDTO.FirstName', userData.firstName);
    formData.append('userCreateDTO.LastName', userData.lastName);
    formData.append('userCreateDTO.Email', userData.email);
    formData.append('userCreateDTO.Password', userData.password);
    formData.append('userCreateDTO.UserType', userData.userType.toString());

    if (userData.photo instanceof File) {
      formData.append('image', userData.photo);
    }
    await apiClient.post('/user', formData);
  },

  async getByEmailAndPassword(email: string, password: string): Promise<any> {
  const response = await apiClient.post('/user/login', {
    email,
    password
  }, {withCredentials: true });
  return response.data;
 },

};

