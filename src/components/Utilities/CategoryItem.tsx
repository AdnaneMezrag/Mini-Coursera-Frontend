import React from 'react'
import { Link } from 'react-router-dom';

interface CategoryItemProps {
  title: string;
  link:string;
}

function CategoryItem({title,link}:CategoryItemProps) {
  return (
    <Link to={link} className='p-4 bg-[#002761] text-white rounded-2xl font-semibold
    hover:bg-[#003B8F]'>{title}</Link>
  )
}

export default CategoryItem