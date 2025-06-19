import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className='flex items-center p-3 gap-14 text-accent font-semibold'>
        <div>
          <Link to="/" className='hover:text-primary'>Home</Link>
        </div>

        <div>
          <Link to="my-learning" className='hover:text-primary'>My Learning</Link>
            
        </div>
    </nav>
  )
}

export default Navigation