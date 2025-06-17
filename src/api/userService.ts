import apiClient from './apiClient';
import type { UserCreateDTO } from '../types/UserType';

export const UserService = {
  async create(userData: UserCreateDTO): Promise<void> {
    const formData = new FormData();


    formData.append('FirstName', userData.firstName);
    formData.append('LastName', userData.lastName);
    formData.append('Email', userData.email);
    formData.append('Password', userData.password);
    formData.append('UserType', userData.userType.toString());

    if (userData.photo instanceof File) {
      formData.append('image', userData.photo);
    }
    await apiClient.post('/user', formData);
  }
};
