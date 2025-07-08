import { useEffect, useState } from "react";
import type { CreateCourseInput,CourseLevel } from "@/api/courseService";
import {CourseService} from "@/api/courseService";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import type { Mode } from "@/types/Util";
import {useNavigate } from "react-router-dom";

const subjects = [
  { id: 1, name: "Business" },
  { id: 2, name: "Computer Science" },
  { id: 3, name: "Information Technology" },
  { id: 4, name: "Data Science" },
  { id: 5, name: "Health" },
  { id: 6, name: "Physical Science and Engineering" },
  { id: 7, name: "Social Sciences" },
  { id: 8, name: "Arts and Humanities" },
  { id: 9, name: "Personal Development" },
  { id: 10, name: "Language Learning" },
  { id: 11, name: "Math and Logic" },
];

const languages = [
  { id: 1, name: "English" },
  { id: 2, name: "Spanish" },
  { id: 3, name: "French" },
  { id: 4, name: "Arabic" },
  { id: 5, name: "Portuguese (Brazil)" },
  { id: 6, name: "German" },
  { id: 7, name: "Chinese (China)" },
  { id: 8, name: "Japanese" },
  { id: 9, name: "Indonesian" },
  { id: 10, name: "Russian" },
  { id: 11, name: "Korean" },
  { id: 12, name: "Hindi" },
  { id: 13, name: "Turkish" },
  { id: 14, name: "Ukrainian" },
  { id: 15, name: "Italian" },
  { id: 16, name: "Thai" },
  { id: 17, name: "Polish" },
  { id: 18, name: "Dutch" },
  { id: 19, name: "Swedish" },
  { id: 20, name: "Greek" },
  { id: 21, name: "Kazakh" },
  { id: 22, name: "Hungarian" },
  { id: 23, name: "Azerbaijani" },
  { id: 24, name: "Vietnamese" },
  { id: 25, name: "Pushto" },
  { id: 26, name: "Chinese (Traditional)" },
  { id: 27, name: "Hebrew" },
  { id: 28, name: "Portuguese" },
  { id: 29, name: "Portuguese (Portugal)" },
  { id: 30, name: "Catalan" },
  { id: 31, name: "Croatian" },
  { id: 32, name: "Kannada" },
  { id: 33, name: "Swahili" },
];

const levels: CourseLevel[] = ["Beginner", "Intermediate", "Advanced", "Mixed"];
interface CourseFormProps{
  setPageNbr: React.Dispatch<React.SetStateAction<number>>;
  setCourseIdState: React.Dispatch<React.SetStateAction<number | null>>;
  courseId: number | null;
}

export default function CourseForm({setPageNbr,setCourseIdState,courseId}:CourseFormProps) {
  let mode:Mode = courseId ? 'update' : 'create';
  const user = useContext(UserContext);
  const [formData, setFormData] = useState<CreateCourseInput>({
    title: "",
    description: "",
    price: 0,
    subjectId: null,
    languageId: 1,
    level: "Beginner",
    imageFile: null,
    instructorId: 0,
    imageUrl:'',
  });
  const [message,setMessage] = useState("");
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user.user){
      navigate('/');
    }
    const userId = user.user?.id || 0;
    setFormData((prev) => ({...prev,instructorId:userId}));
    if(mode === "update"){
      GetCourseById();
    }
  },[user.user])

  async function GetCourseById() {
    const course = await CourseService.getCourseById(courseId);
    const subjectId = subjects.find(subject => subject.name === course.category)?.id;
    const languageId = languages.find(language => language.name === course.language)?.id;
    setFormData({...course,subjectId:subjectId,languageId:languageId});
  }
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  async function updateCourse(){
    try {
        await CourseService.updateCourse(courseId,formData);
        setMessage("Course updated successfully");
        setCourseIdState(courseId);
    } catch (err) {
        console.error(err);
    }
  }

  async function createCourse(){
    try {
        const courseId = await CourseService.createCourse(formData) || 0;
        setMessage("Course created successfully");
        setCourseIdState(courseId);
    } catch (err) {
        console.error(err);
    }
  }

  const handleSubmit = async () => {
    if(!user.user) {
        setMessage("You must be logged in to add a course");
        setError(true);
        return;
    }
    setError(false);
    setMessage("");
    if(mode === 'create') await createCourse();
    else await updateCourse();
    setPageNbr(2);

  };

  return (
    <div className="container max-w-5xl p-6 bg-white rounded-xl shadow-md space-y-6">
        {message && (
            <p className={`${error?'text-red-700':'text-green-700'} font-bold`}>{message}</p>
        )}
        <form  onSubmit={(e) => { e.preventDefault(); handleSubmit();}}>

<h2 className="text-2xl font-bold text-gray-800">Course General Information</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">Course Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter title"
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>



        <div>
          <label htmlFor="image" className="block mb-1 text-sm font-medium text-gray-700">
            Course Image
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            required={mode === 'create'}
            onChange={handleFileChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-600 cursor-pointer"
          />

          {/* Display current file name */}
          <p className="mt-1 text-sm text-gray-700">
            Selected file:&nbsp;
            <span className="font-medium text-blue-700">
              {formData.imageFile?.name || formData.imageUrl?.split("/").pop() || "None"}
            </span>
          </p>
        </div>







        <div>
          <label htmlFor="subjectId" className="block mb-1 text-sm font-medium text-gray-700">Subject</label>
          <select
            id="subjectId"
            name="subjectId"
            value={formData.subjectId ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                subjectId: e.target.value === "" ? null : parseInt(e.target.value),
              }))
            }
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="languageId" className="block mb-1 text-sm font-medium text-gray-700">Language</label>
          <select
            id="languageId"
            name="languageId"
            value={formData.languageId}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                languageId: parseInt(e.target.value),
              }))
            }
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="level" className="block mb-1 text-sm font-medium text-gray-700">Level</label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                level: e.target.value as CourseLevel,
              }))
            }
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">Course Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter course description"
          rows={4}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Next
      </button>

  </form>
      
    </div>
  );
}
