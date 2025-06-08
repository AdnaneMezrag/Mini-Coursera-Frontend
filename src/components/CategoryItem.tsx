import React from 'react'

interface CategoryItemProps {
  title: string;
  link:string;
}

function CategoryItem({title,link}:CategoryItemProps) {
  return (
    <a href={link} className='p-4 bg-[#002761] text-white rounded-2xl font-semibold
    hover:bg-[#003B8F]'>{title}</a>
  )
}

export default CategoryItem