import { useState, useRef, useEffect, useContext } from 'react';
import Search from '../Utilities/Search';
import { Bell, CircleUserRound, Globe } from 'lucide-react';
import Navigation from './Navigation';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '@/contexts/userContext';
import SignupLoginPage from '../../pages/SignLoginPage';



function Header() {
  const {user,setUser} = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () =>{
    setShowSignupModal(true);
  }

  const handleCloseModal = () => {
    setShowSignupModal(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    navigate("/");
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div>
            {showSignupModal && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
                onClick={handleCloseModal}
              >
                <div 
                  className="h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SignupLoginPage onClose={handleCloseModal} />
                </div>
              </div>
            )}

      <div className='flex items-center p-3 text-[14px] justify-between'>
        <div className='flex items-center gap-3 w-full'>
          <Link to="/">
            <div className='text-xl border-primary font-extrabold text-primary cursor-pointer'>
              MINI COURSERA
            </div>
          </Link>
          <div className='hidden explore p-2 pl-5 pr-5 border-1 border-primary hover:bg-hover rounded-[4px]
            font-medium text-primary cursor-pointer md:block'>
            Explore
          </div>
          <Search />
        </div>
        <div className='flex items-center gap-3 relative'>
          <div className='hidden items-center text-accent hover:bg-hover cursor-pointer md:flex'>
            <Globe className='p-2' size={38} />
            <span className='pr-2'>English</span>
          </div>

          <Bell className='text-accent hover:bg-hover p-2 cursor-pointer' size={38} />

          {/* Avatar with dropdown */}
          <div className='relative' ref={dropdownRef}>
            {user?.photoUrl ? (
              <div
                className='text-accent hover:bg-hover p-2 cursor-pointer w-[38px]'
                onClick={() => setIsDropdownOpen(prev => !prev)}
              >
                <img className='rounded-xl' src={user.photoUrl} alt="User" />
              </div>
            ) :( 
              <CircleUserRound
                className='text-accent hover:bg-hover p-2 cursor-pointer'
                size={38}
                onClick={() => setIsDropdownOpen(prev => !prev)}
              /> 
            )}

            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50'>
                {user ? (
                  <>
                    <Link to="/"className='block px-4 py-2 hover:bg-hover text-sm'>Home</Link>
                    <Link to="/my-learning" className='block px-4 py-2 hover:bg-hover text-sm'>My Learning</Link>
                    <Link to="/courses/InstructorCourses" className='block px-4 py-2 hover:bg-hover text-sm'>My Courses</Link>
                    <button onClick={handleLogout} className='cursor-pointer w-full text-left px-4 py-2 hover:bg-hover text-sm'>
                      Log Out</button>
                  </>
                ) : (
                    <button onClick={handleSignIn} className='cursor-pointer w-full text-left px-4 py-2 hover:bg-hover text-sm'>
                      Sign In</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default Header;
