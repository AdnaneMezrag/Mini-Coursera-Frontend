import React from 'react'

function Navigation() {
  return (
    <nav className='flex items-center p-3 gap-14 text-accent font-semibold'>
        <div>
            <a className="hover:text-primary" href="#">Home</a>
        </div>

        <div>
            <a className="hover:text-primary" href="#">My Learning</a>
        </div>
    </nav>
  )
}

export default Navigation