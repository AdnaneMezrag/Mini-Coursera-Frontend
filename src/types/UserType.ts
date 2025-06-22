// If you have the enum in TypeScript
export enum UserTypeEnum {
  Student = 1,
  Instructor = 2
}

export interface UserCreateDTO {
  userType: UserTypeEnum;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: File | null; 
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: UserTypeEnum;
  photoUrl?: string | null; // URL to the user's photo
}