import { useState } from 'react';

function FilterSection({filters = [] ,filterName,selected, setSelected}: {filters: string[],filterName:string
 selected: number[] ,setSelected: React.Dispatch<React.SetStateAction<number[]>>
}) {

    const handleCheckboxChange = (value: number) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };


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
            <div className='flex items-center gap-2' key={index}>
              <input type="checkbox" id={"filter-checkbox" + filter} 
              className='cursor-pointer w-5 h-5 font-medium border-2 border-accent border-solid' 
              value={index}
              onChange={() => handleCheckboxChange(index+1)}/>
              <label htmlFor={"filter-checkbox" + filter} className='text-sm cursor-pointer'>{filter}</label>
            </div>
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