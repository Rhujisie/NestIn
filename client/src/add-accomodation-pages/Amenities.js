import { Link, json, useLocation, useOutlet, useOutletContext } from "react-router-dom";
import usePlace from "../hooks/usePlace";
import { useEffect } from "react";
import Ac from '../icon/air-conditioner.png'
import Bed from '../icon/bed.png'
import FirePlace from '../icon/fireplace.png'
import Furniture from '../icon/furniture.png'
import Parking from '../icon/parking-area.png'
import Patio from '../icon/seating.png'
import Pool from '../icon/swimming-pool.png'
import Washing from '../icon/washing-machine.png'
import Wifi from '../icon/wifi.png'
import Tv from '../icon/tv.png'
import Water from '../icon/water-tap.png'
import Yard from '../icon/fences.png'

export default function Amenities(){
    const [completion, setCompletion] = useOutletContext()
    const {place, setPlace} = usePlace()
    const location = useLocation()
    const {id} = location.state

    console.log(place)
    useEffect(()=>{
        setCompletion(4)
        setPlace(prev=>({...prev, 
            amenities:JSON.parse(localStorage.getItem('amenities')) || []}))
    },[])

    useEffect(()=>{
        localStorage.setItem('amenities', JSON.stringify(place.amenities))
    },[place])

    const handleClick=(data)=>{
        const newAmenities = place.amenities.includes(data)? 
        place.amenities.filter(amenitie=> amenitie !== data)
        : [...place.amenities, data]
        setPlace(prev=> ({...prev, amenities: newAmenities}))
    }

    return(
        <div className='amenities'>
            <h2 className="accomodation-heading">
                Tell your guest what your place offers.</h2>
                {id && <div className="changes">Make the necessary Changes</div>}
            <div className="describe-your-place">
                <button className={place?.amenities?.includes('wifi')? 'active-place':''} 
                onClick={()=>handleClick('wifi')}>
                    <div><img src={Wifi} alt='wifi'/></div>
                    <div>Wifi</div>
                </button>
                <button className={place.amenities.includes('tv')?'active-place':''}
                onClick={()=>handleClick('tv')}>
                    <div><img src={Tv} alt='tv'/></div>
                    <div>TV</div>
                </button>
                <button className={place.amenities.includes('yard')? 'active-place':''}
                onClick={()=>handleClick('yard')}>
                    <div><img src={Yard} alt='yard'/></div>
                    <div>Yard</div>
                </button>
                <button className={place.amenities.includes('water')? 'active-place':''}
                onClick={()=>handleClick('water')}>
                    <div><img src={Water} alt='water'/></div>
                    <div>Water</div>
                </button>
                <button className={place.amenities.includes('washingMachine')? 'active-place':''}
                onClick={()=>handleClick('washingMachine')}>
                    <div><img src={Washing} alt='washing'/></div>
                    <div>Washing machine</div>
                </button>
                <button className={place.amenities.includes('parking')? 'active-place':''}
                onClick={()=>handleClick('parking')}>
                    <div><img src={Parking} alt='parking'/></div>
                    <div>Parking</div>
                </button>
                <button className={place.amenities.includes('ac')? 'active-place':''}
                onClick={()=>handleClick('ac')}>
                    <div><img src={Ac} alt='ac'/></div>
                    <div>Air conditioning</div>
                </button>
                <button className={place.amenities.includes('bed')? 'active-place':''}
                onClick={()=>handleClick('bed')}>
                    <div><img src={Bed} alt='bed'/></div>
                    <div>Bed</div>
                </button>
                <button className={place.amenities.includes('furniture')? 'active-place':''}
                onClick={()=>handleClick('furniture')}>
                    <div><img src={Furniture} alt='furniture'/></div>
                    <div>Furniture</div>
                </button>
                <button className={place.amenities.includes('pool')? 'active-place':''}
                onClick={()=>handleClick('pool')}>
                    <div><img src={Pool} alt='pool'/></div>
                    <div>Pool</div>
                </button>
                <button className={place.amenities.includes('patio')? 'active-place':''}
                onClick={()=>handleClick('patio')}>
                    <div><img src={Patio} alt='patio'/></div>
                    <div>Patio</div>
                </button>
                <button className={place.amenities.includes('firePlace')? 'active-place':''}
                onClick={()=>handleClick('firePlace')}>
                    <div><img src={FirePlace} alt='fire place'/></div>
                    <div>Fire place</div>
                </button>
                
            </div>
            <div className='next-button'>
                {/* edit this */}
                <Link to={'/nestyourhome/photos'} 
                state={{id: id}}
                style={{textDecoration: 'none', color: 'black'}}> Next
                </Link>
            </div>
        </div>
    )
}