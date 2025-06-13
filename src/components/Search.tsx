import { useNavigate } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import React from 'react';

const Search = () => {
    let newSearchTerm:string = '';
    const navigate = useNavigate();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // You can replace the empty string with searchTerm if you want to use the input value
      newSearchTerm = newSearchTerm + e.currentTarget.value.toLowerCase();
      navigate(`/search?q=${encodeURIComponent(newSearchTerm)}`,{state: { newSearchTerm }});
    }
  };

  return (
    <div className='flex items-center justify-between w-[50%] p-3 rounded-3xl border-1 border-secondary
    ' > 
      <input type="text" placeholder='What do you want to learn?' className='w-full
      outline-none text-accent' onKeyDown={handleKeyDown}/>
      <SearchIcon className='text-primary' />
    </div>
  )
}

export default Search