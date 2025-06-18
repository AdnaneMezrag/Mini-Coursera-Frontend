// CourseContentMenu.tsx
import { useState } from 'react';

interface ModuleContent {
  id: number;
  name: string;
  content: string;
  videoUrl: string;
}

interface CourseModule {
  id: number;
  name: string;
  moduleContents: ModuleContent[];
}

interface CourseContentMenuProps {
  CourseModules: CourseModule[];
  setModuleContent: React.Dispatch<React.SetStateAction<{ content: string; videoUrl: string;name: string }>>;
}

export default function CourseContentMenu({ CourseModules,setModuleContent}: CourseContentMenuProps) {

  const [expandedCourseModules, setExpandedCourseModules] = useState<number[]>([]);
  const [activeModuleContentID, setActiveModuleContentID] = useState<number>(101);

  const onModuleContentClickHandler = (moduleContent: ModuleContent) => {
    setActiveModuleContentID(moduleContent.id);
    setModuleContent({
      content: moduleContent.content,
      videoUrl: moduleContent.videoUrl,
      name: moduleContent.name
    });
  }

  const toggleCourseModule = (id: number) => {
    setExpandedCourseModules(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-md p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Course Content</h2>
      <ul className="space-y-2">
        {CourseModules.map(CourseModule => (
          <li key={CourseModule.id}>
            <button
              className="w-full flex justify-between items-center text-left font-medium text-gray-700 hover:text-primary"
              onClick={() => toggleCourseModule(CourseModule.id)}
            >
              {CourseModule.name}
              <span>{expandedCourseModules.includes(CourseModule.id) ? '−' : '+'}</span>
            </button>

            {expandedCourseModules.includes(CourseModule.id) && (
              <ul className="mt-2 pl-4 border-l border-gray-300 space-y-1">
                {CourseModule.moduleContents.map(ModuleContent => (
                  <li
                    key={ModuleContent.id}
                    className={`cursor-pointer p-2 rounded ${
                      ModuleContent.id === activeModuleContentID ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => onModuleContentClickHandler(ModuleContent)}
                  >
                    {ModuleContent.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
