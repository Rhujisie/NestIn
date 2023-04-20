import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


export default function NavBase(){
     const [showBaseNav, setShowBaseNav] = useState(true)
     const [currentPixel, setCurrentPixel] = useState(window.scrollY)
     const {auth} = useAuth()
     
     const displayBaseNav=()=>{
        if(window.scrollY >= currentPixel){
            setShowBaseNav(false)
        }else{
            setShowBaseNav(true)
        }
        setCurrentPixel(window.scrollY)
     }
     window.addEventListener('scroll', displayBaseNav)
    return(
        <div className={showBaseNav? 'nav-base': 'nav-base active-base'}>
            <Link to={`nestyourhome`} style={{textDecoration: 'none'}}>
                <div className="airbnb-home nav-base-child">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                     Nest your home
                </div>
            </Link>
            <Link to={'wishlist'} style={{textDecoration: 'none'}}>
                <div className="wishlist-logo nav-base-child">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    Wishlist
                </div>
            </Link>   
            <Link to='profile' style={{textDecoration: 'none'}}>
                <div className="profile-logo nav-base-child">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    {auth?.name? auth.name: 'Login'}
                </div>
            </Link>
        </div>
    )
}