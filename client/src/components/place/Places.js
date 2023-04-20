import { Link, useLocation, Navigate} from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'

import Rupee from '../../icon/rupee.png'
import LeftArrow from '../../icon/left-arrow.png'
import RightArrow from '../../icon/right-arrow.png'
import HeartRed from '../../icon/heart-red.png'
import Heart from '../../icon/heart.png'
import { useState } from 'react'
import CarouselItem from './CarouselItem'
import Rating from '../review/Rating'

export default function Places({place, heart}){

    const [wishlist, setWishlist] = useState(heart)
    const [points, setPoints] = useState(place.points)
    const [activeIndex, setActiveIndex] = useState(0)
    const {auth} = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()

    console.log(location, place.points)

    // toggle wishlist
    const handleHeart= async(e)=>{
        e.preventDefault()
        if(auth){
            await axiosPrivate.patch(`/wishlist/update/${place._id}`)
            //add points on wishlist add
            if(location.pathname === '/nestyourhome' || location.pathname === '/wishlist'){
                console.log('owner')
            }else{
                !heart && await axiosPrivate.patch(`/place/point/${place._id}`
                    , {points: points + 2})
            }
            setWishlist(prev => !prev)
        }else{
            <Navigate to='/login' state={{from: location}}/>
        }
    }
    //carousel index decrease
    const handleLeft = (e)=>{
        e.preventDefault()
        if(activeIndex === 0) return
        setActiveIndex(prev=> prev - 1)
    }
    //carousel index increase
    const handleRight = (e)=>{
        e.preventDefault()
        if(activeIndex < place.photos.length - 1){
        setActiveIndex(prev=> prev + 1)
        }
    }

    //add points on place visit
    const handleClick = async()=>{
        if(location.pathname === '/nestyourhome' || location.pathname === '/wishlist'){
            return
        }
        const {data} = await axiosPrivate.patch(`/place/point/${place._id}`
            , {points: points + 1})
        console.log(data)
    }

    //carousel index element
    const imageIndexElem = place.photos.map((photo, i)=> 
    <div key={i} className={activeIndex === i? 'dot dot-active': 'dot'}></div>)
    //carousel image element
    const imageElem = place.photos.map((photo, i)=> 
    <CarouselItem key={i} photo={photo}/>)

    return(
        <Link to={location.pathname === '/nestyourhome'?
        `/myplace/${place._id}`: `/place/${place._id}`} onClick={handleClick}
            style={{textDecoration: 'none', color: 'black'}}>
        <div className="places" >
            <div className='carousel'>
                <div className='inner' 
                    style={{transform: `translateX(-${activeIndex * 100}%)`}}>
                    {imageElem}
                </div>
            </div>
            <div className="place-description">
                <h2>{place.address}, {place.city}</h2>
                <h3 style={{color: 'GrayText', fontSize:'13px',marginBottom: '8px'}}>
                    {place.name}
                </h3>
                <h3>
                    <img src={Rupee} alt='rupee' style={{width: '13px'}}/>
                    {place.price} 
                    <span style={{color: 'GrayText', fontSize:'13px'}}>
                        {place?.type === 'house' || place?.type === 'flat' || 
                        place?.type ==='hostel' || place?.type ==='paying guest'?
                        'per month': 'per night'}
                    </span>
                </h3>
            </div>
            <div className='dot-container'>
                {imageIndexElem}
            </div>
                <div className='rating'>
                    <Rating placeId={place._id}/>
                </div>
                {activeIndex? <img src={RightArrow} alt='right arrow' 
                    className='right-chevoron' onClick={handleLeft}/>: ''}
                {activeIndex < place.photos.length - 1? 
                <img src={LeftArrow} alt='left arrow' 
                    className='left-chevoron' onClick={handleRight}/>: ''}
                <img src={wishlist? HeartRed:Heart} alt='heart' 
                className='heart-icon' onClick={handleHeart}/>
        </div>
        </Link>
    )
}