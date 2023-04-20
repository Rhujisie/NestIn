import usePlace from "../hooks/usePlace"

import Home from '../icon/house.png'
import HomeStay from '../icon/homestay.png'
import Hotel from '../icon/resort.png'
import Flat from '../icon/building.png'
import Cabin from '../icon/cabin.png'
import TreeHouse from '../icon/tree-house.png'
import Farm from '../icon/barn.png'
import Tent from '../icon/tent.png'
import TinyHouse from '../icon/tiny-house.png'
import Room from '../icon/living-room.png'
import { Link, useLocation, useOutletContext, useParams} from "react-router-dom"
import { useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

export default function DescribeYourHome(){
    const {place,setPlace} = usePlace()
    const [completion, setCompletion] = useOutletContext()
    const {id} = useParams()
    const axiosPrivate = useAxiosPrivate()
    
    console.log(place, id)
    useEffect(()=>{
        setCompletion(1)
        if(!id){
            setPlace(prev=> ({...prev,type: localStorage.getItem('type') || ''}))
        }
        else{
            const getPlace = async()=>{
                const {data} = await axiosPrivate.get(`/place/${id}`)
                setPlace(data)
            }
            getPlace()
        }
    },[])
    useEffect(()=>{
        localStorage.setItem('name', place.name)
                localStorage.setItem('description', place.description)
                localStorage.setItem('price', place.price)
                localStorage.setItem('photos', JSON.stringify(place.photos))
                localStorage.setItem('type', place.type)
                localStorage.setItem('amenities', JSON.stringify(place.amenities))
                localStorage.setItem('bedroom', place.bedroom)
                localStorage.setItem('livingroom', place.livingroom)
                localStorage.setItem('kitchen', place.kitchen)
                localStorage.setItem('washroom', place.washroom)
                localStorage.setItem('district', place.district)
                localStorage.setItem('city', place.city)
                localStorage.setItem('address', place.address)
                localStorage.setItem('landmark', place.landmark)
    },[place])

    return(
        <>
            <h2 className="accomodation-heading">Select which describes your place best.</h2>
            {id && <div className="changes">Make the necessary Changes</div>}
            <div className="describe-your-place">
                <button className={place.type === 'house'? 'active-place':''} 
                onClick={()=>setPlace(prev=> ({...prev,type: 'house'}))}>
                    <div><img src={Home} alt='cabin icon'/></div>
                    <div>House</div>
                </button>
                <button className={place.type === 'flat'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'flat'}))}>
                    <div><img src={Flat} alt='cabin icon'/></div>
                    <div>Flat/Appartment</div>
                </button>
                <button className={place.type === 'home stay'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'home stay'}))}>
                    <div><img src={HomeStay} alt='cabin icon'/></div>
                    <div>Home Stay</div>
                </button>
                <button className={place.type === 'cabin'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'cabin'}))}>
                    <div><img src={Cabin} alt='cabin icon'/></div>
                    <div>Cabin</div>
                </button>
                <button className={place.type === 'hotel'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'hotel'}))}>
                    <div><img src={Hotel} alt='cabin icon'/></div>
                    <div>Hotel</div>
                </button>
                <button className={place.type === 'paying guest'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'paying guest'}))}>
                    <div><img src={Room} alt='room'/></div>
                    <div>Room/Paying guest</div>
                </button>
                <button className={place.type === 'tree house'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'tree house'}))}>
                    <div><img src={TreeHouse} alt='tree house'/></div>
                    <div>Tree House</div>
                </button>
                <button className={place.type === 'farm'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'farm'}))}>
                    <div><img src={Farm} alt='farm'/></div>
                    <div>Farm</div>
                </button>
                <button className={place.type === 'hostel'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'hostel'}))}>
                    <div><img src={TinyHouse} alt='hostel'/></div>
                    <div>Hostel</div>
                </button>
                <button className={place.type === 'tent'? 'active-place':''}
                onClick={()=>setPlace(prev=> ({...prev,type: 'tent'}))}>
                    <div><img src={Tent} alt="tent"/></div>
                    <div>Tent</div>
                </button>
            </div>
            <div className='next-button'>
                { <Link to={place?.type? '/nestyourhome/location': null}
                    state={{id: id}}
                style={{textDecoration: 'none', color: 'black'}}> Next
                </Link>
                // :<Link to={place?.type? '/nestyourhome/location': null}
                // style={{textDecoration: 'none', color: 'black'}}> Next
                // </Link>
            }
            </div>
        </>
    )
}

