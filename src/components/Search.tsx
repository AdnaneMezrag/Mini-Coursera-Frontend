import React from 'react'
import { SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className='flex items-center justify-between w-[50%] p-3 rounded-3xl border-1 border-secondary
    '>
      <input type="text" placeholder='What do you want to learn?' className='w-full
      outline-none text-accent' />
      <SearchIcon className='text-primary'/>
    </div>
  )
}

export default Search