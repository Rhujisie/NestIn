import NestLogo from '../icon/nest.png'
import {Link, NavLink} from 'react-router-dom'

export default function Header(){

    return(
        <header>
            <div className='types-of-places'>
                <NavLink to='/' className={({isActive})=>
                    isActive? 'active': ''
                }style={{textDecoration: 'none', color: 'black'}}><span>All</span></NavLink>
                <NavLink to='rent' className={({isActive})=>
                    isActive? 'active': ''
                } style={{textDecoration: 'none', color: 'black'}}><span>Rent</span></NavLink>
                <NavLink to='homestay' className={({isActive})=>
                    isActive? 'active': ''
                } style={{textDecoration: 'none', color: 'black'}}><span>Home stay</span></NavLink>
                <NavLink to='hostel' className={({isActive})=>
                    isActive? 'active': ''
                } style={{textDecoration: 'none', color: 'black'}}><span>Hostel</span></NavLink>
                <NavLink to='hotel' className={({isActive})=>
                    isActive? 'active': ''
                } style={{textDecoration: 'none', color: 'black'}}><span>Hotel</span></NavLink>
                <NavLink to='pg' className={({isActive})=>
                    isActive? 'active': ''
                } style={{textDecoration: 'none', color: 'black'}}><span>PG</span></NavLink>
            </div>
            <nav>
                <div className='nestin-logo'>
                    <Link to='/'>  
                        <img src={NestLogo} alt='nest' className='nest-logo'/>
                    </Link>
                    <div className='nestin'>NestIn</div>
                </div>
                <div className='search'>
                    <input list="place" id='location' placeholder='Search...'/>
                    <datalist id="place">
                        <option value="Kohima"/>
                        <option value="Dimapur"/>
                        <option value="Chumu"/>
                        <option value="Wokha"/>
                        <option value="Mokog"/>
                        <option value="Kohima"/>
                        <option value="Dimapur"/>
                        <option value="Chumu"/>
                        <option value="Wokha"/>   
                    </datalist>
                    <label className='location-logo' htmlFor='location'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                    </label>
                </div>
            </nav>
        </header>
    )
}