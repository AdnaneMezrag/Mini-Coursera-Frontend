import React from 'react'
import { useState } from 'react';
import { Edit, Trash2,FileType,CircleCheck  } from "lucide-react";
import RichTextEditor from '../Utilities/RichTxtEditor';
import { Video } from "lucide-react";
import SafeHTML from '../Utilities/SafeHTML';

export default function ModuleContentForm() {

    const [ContentEdit,setContentEdit] = useState<boolean>(false);
    const [description, setDescription] = useState("<p></p>");

    const handleContentModuleEdit = () =>{
        setContentEdit(true);
    }

    const handleSaveModule = () => {
        handleModuleCancel();
    }
    
    const handleModuleCancel = () =>{
        setContentEdit(false);
    }

  return (
    <div className='my-2'>
        {!ContentEdit && (
            <div className='mt-4 p-2 border-[#b6b0ff] border-solid border-[1px] bg-white flex flex-wrap gap-2 items-center'>
                <div className='flex flex-wrap gap-2 items-center'>
                    <CircleCheck className='w-4 h-4'></CircleCheck>
                    <p className='font-semibold'>Lecture 1:</p>
                    <FileType className='h-4 w-4'/>
                    <h4>Introduction</h4>
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={handleContentModuleEdit}>
                        <Edit className="w-4 h-4" />
                    </button>

                    <button className="text-red-600 hover:text-red-800 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        )}

        {ContentEdit && (
            <div className='p-2 border-[#b6b0ff] border-solid border-[1px] bg-white'>
                <div>
                    <input type="text"
                    className='w-full p-1 border-[#b6b0ff] border-solid border-[1px] rounded-[5px]' 
                    placeholder='Enter lecutre title here'/>

                    <div className="my-2">
                        <label className="block text-gray-700 font-medium">Lecture Content</label>
                        <RichTextEditor value={description} onChange={setDescription} />
                    </div>

                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="videoUpload"
                            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-blue-400 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                        >
                            <Video className="w-4 h-4" />
                            Upload Video
                        </label>
                        <input
                            type="file"
                            accept="video/*"
                            id="videoUpload"
                            className="hidden"
                        />
                    </div>

                    <div className='flex justify-end gap-4'>
                        <button className='font-semibold cursor-pointer hover:text-[#616060]'
                        onClick={handleModuleCancel}>Cancel</button>
                        <button type="submit"
                            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition
                            cursor-pointer"
                        onClick={handleSaveModule}
                        >Save Lecture</button>
                    </div>


                </div>
            </div>
        )}


    </div>
  )
}
