import React from 'react'

export default function FilterCheckbox({filterName = "English"}: {filterName: string}) {
  return (
    <div>
        <div className='flex items-center gap-2 '>
            <input type="checkbox" id={"filter-checkbox" + filterName} className='cursor-pointer w-5 h-5 font-medium border-2 border-accent border-solid' />
            <label htmlFor={"filter-checkbox" + filterName} className='text-sm cursor-pointer'>{filterName}</label>
        </div>
    </div>
  )
}
