import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import {UserService} from '../api/userService';
import { UserTypeEnum } from '../types/UserType';
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';


interface FormData {
  email: string;
  password: string;
  fullName: string;
  profileImage: File | null;
  userType: UserTypeEnum; // 1 = Student, 2 = Instructor
}

export default function SignupLoginPage({ onClose }: { onClose: () => void }) {

  const { setUser } = useContext(UserContext);
  
  const handleSignup = () => {
    const firstNameData = formData.fullName.split(' ')[0];
    const lastNameData = formData.fullName.split(' ').slice(1).join(' ') || '';
    // Logic to handle course enrollment
    UserService.create({
      userType: formData.userType,
      email: formData.email,
      password: formData.password,
      firstName: firstNameData,
      lastName:lastNameData,
      photo: formData.profileImage,
    }).then(response => {
      if (response) {
        // console.log('User created successfully');
        onClose(); // Close the modal or redirect
      }

  })
}

const handleLogin = () => {
  UserService.getByEmailAndPassword(formData.email, formData.password)
    .then(response => {
      if (response) {
        console.log('Login successful');
        setUser(response); // Assuming response contains user data
        onClose(); // Close the modal or redirect
      }
    })
    .catch(error => {
      // Handle login error
      console.error('Login failed:', error);
    });}


const [isLogin, setIsLogin] = useState<boolean>(true);
const [formData, setFormData] = useState<FormData>({
  email: '',
  password: '',
  fullName: '',
  profileImage: null,
  userType: UserTypeEnum.Student, // default to Student
});

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, profileImage: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!isLogin){
      handleSignup();
    }else{
      handleLogin();
    }
    // Handle form submission
  };

  return (
    <div className="relative">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
      >
        &times;
      </button>

      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`flex-1 py-2 font-medium ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 font-medium ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {!isLogin && (
        <div className="mb-4 flex flex-col items-center">
          <div 
            onClick={triggerFileInput}
            className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden mb-2"
          >
            {previewImage ? (
              <img src={previewImage} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400">+ Photo</span>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <p className="text-xs text-gray-500">Click to upload profile photo</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Enter your full name"
              required={!isLogin}
            />
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    I am a:
  </label>
  <div className="flex items-center space-x-6">
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        name="userType"
        value={UserTypeEnum.Student}
        checked={formData.userType === UserTypeEnum.Student}
        onChange={() => setFormData(prev => ({ ...prev, userType: UserTypeEnum.Student }))}
        className="text-primary"
      />
          <span className="text-sm text-gray-700">Student</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="userType"
            value="2"
            checked={formData.userType === UserTypeEnum.Instructor}
            onChange={() => setFormData(prev => ({ ...prev, userType: UserTypeEnum.Instructor }))}
            className="text-primary"
          />
          <span className="text-sm text-gray-700">Instructor</span>
        </label>
      </div>
    </div>
          </div>
          
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder="name@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            placeholder={isLogin ? "Enter your password" : "Create a password (min 8 characters)"}
            minLength={8}
            required
          />
        </div>

        {isLogin && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-dark">
                Forgot password?
              </a>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>

        {isLogin ? (
          <p className="mt-3 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="font-medium text-primary hover:text-primary-dark"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p className="mt-3 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="font-medium text-primary hover:text-primary-dark"
            >
              Log in
            </button>
          </p>
        )}
      </form>
    </div>
  );
}