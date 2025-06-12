import FilterCheckbox from './FilterCheckbox'
import { useState } from 'react';

function FilterSection({filters = [] ,filterName}: {filters: string[],filterName:string}) {
    const [showAll, setShowAll] = useState(false);
    const initialVisibleCount = 4;
    const visibleCategories = showAll 
      ? filters 
      : filters.slice(0, initialVisibleCount);
    const remainingCount = filters.length - initialVisibleCount;

    
  return (
    <fieldset className='mb-5'>
        <legend className='text-lg font-semibold mb-4'>{filterName}</legend>
        <div className='flex flex-col gap-2'>
            {visibleCategories.map((filter, index) => (
                <FilterCheckbox key={index} filterName={filter}></FilterCheckbox>
            ))}
        </div>

              {remainingCount > 0 && (
        <button type="button"
          className="text-blue-600 hover:text-blue-800 hover:underline py-1.5 text-left hover:cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show less' : `Show ${remainingCount} more`}
        </button>
      )}
    </fieldset>
  )
}

export default FilterSection