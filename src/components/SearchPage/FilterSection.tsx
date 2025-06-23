import { useState } from 'react';
import type { CourseLevel } from '../../types/CourseType';
import type { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';

function FilterSection({
  filters = [],
  filterName,
  searchParams,
  setSearchParams
}: {
  filters: string[];
  filterName: string;
  searchParams: URLSearchParams;
  setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: NavigateOptions) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const initialVisibleCount = 4;

  const getParamKey = (name: string) => {
    if (name === 'Subject') return 'subjectIDs';
    if (name === 'Language') return 'languageIDs';
    if (name === 'Level') return 'levels';
    return '';
  };

  const paramKey = getParamKey(filterName);
  const selectedValues = searchParams.getAll(paramKey);

  const handleCheckboxChange = (value: string) => {
    console.log(`Check box changed ${value}`);
    const newParams = new URLSearchParams(searchParams);
    const currentValues = searchParams.getAll(paramKey);
    const isSelected = currentValues.includes(value);

    const updatedValues = isSelected
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    newParams.delete(paramKey);
    updatedValues.forEach(v => newParams.append(paramKey, v));
    setSearchParams(newParams);
  };

  const visibleCategories = showAll ? filters : filters.slice(0, initialVisibleCount);
  const remainingCount = filters.length - initialVisibleCount;

  return (
    <fieldset className='mb-5'>
      <legend className='text-lg font-semibold mb-4'>{filterName}</legend>
      <div className='flex flex-col gap-2'>
        {visibleCategories.map((filter, index) => {
          const id = `filter-checkbox-${filterName}-${filter}`;
          const value =
            filterName === 'Level' ? (filter as CourseLevel) : (filters.indexOf(filter) + 1).toString();
          return (
            <div className='flex items-center gap-2' key={index}>
              <input
                type='checkbox'
                id={id}
                className='cursor-pointer w-5 h-5 font-medium border-2 border-accent border-solid'
                checked={selectedValues.includes(value)}
                onChange={() => handleCheckboxChange(value)}
              />
              <label htmlFor={id} className='text-sm cursor-pointer'>
                {filter}
              </label>
            </div>
          );
        })}
      </div>

      {remainingCount > 0 && (
        <button
          type='button'
          className='text-blue-600 hover:text-blue-800 hover:underline py-1.5 text-left hover:cursor-pointer'
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show less' : `Show ${remainingCount} more`}
        </button>
      )}
    </fieldset>
  );
}

export default FilterSection;
