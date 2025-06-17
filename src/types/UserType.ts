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