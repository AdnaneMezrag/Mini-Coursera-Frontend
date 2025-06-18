import Search from './Search'
import { Bell } from 'lucide-react';
import { CircleUserRound  } from 'lucide-react';
import { Globe } from 'lucide-react';
import Navigation from './Navigation'
import {Link} from 'react-router-dom'



function header() {
  return (
    <div>
    <div className='flex items-center p-3 text-[14px] justify-bwetween'>
        <div className='flex items-center gap-3 w-full'>
          <Link to="/">  
            <div className='text-xl border-primary font-extrabold text-primary cursor-pointer
            justify-start '>MINI COURSERA</div>
          </Link>

            <div className='hidden explore p-2 pl-5 pr-5 border-1 border-primary hover:bg-hover rounded-[4px]
            font-medium text-primary cursor-pointer md:block'>Explore</div>
            <Search/>
        </div>
        <div className='flex items-center gap-3'>
            <div className='hidden items-center text-accent hover:bg-hover cursor-pointer md:flex'>
                <Globe className=' p-2 ' size={38}></Globe>
                <span className='pr-2'>English</span>
            </div>

            <Bell className='text-accent hover:bg-hover p-2 cursor-pointer' size={38}></Bell>
            <CircleUserRound className='text-accent hover:bg-hover p-2 cursor-pointer' size={38}/>
        </div>

    </div>
    <Navigation></Navigation>
    </div>

  )
}

export default header