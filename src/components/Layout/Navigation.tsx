import { NavLink } from 'react-router-dom';

function Navigation() {
  const baseLinkClass = 'p-2 hover:text-primary';
  const activeLinkClass = 'border-b-3 border-blue-600 pb-1 text-blue-600';

  return (
    <nav className='flex items-center p-3 gap-14 text-accent font-semibold'>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${baseLinkClass} ${isActive ? activeLinkClass : ''}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/my-learning"
        className={({ isActive }) =>
          `${baseLinkClass} ${isActive ? activeLinkClass : ''}`
        }
      >
        My Learning
      </NavLink>

      <NavLink
        to="/courses/InstructorCourses"
        className={({ isActive }) =>
          `${baseLinkClass} ${isActive ? activeLinkClass : ''}`
        }
      >
        My Courses
      </NavLink>
    </nav>
  );
}

export default Navigation;
