import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useEffect, useState } from "react"
import useAuth from '../../hooks/useAuth'
import Rating from '../review/Rating'
import Review from '../review/Review'

export default function MyPlace(){

    const [place, setPlace] = useState()
    const [reviews, setReviews] = useState()
    const axiosPrivate = useAxiosPrivate()
    const {id} = useParams()
    const {auth} = useAuth()


    //get a place
    useEffect(()=>{
        const getPlace = async()=>{
            try{
                const {data} = await axiosPrivate.get(`/place/${id}`)
                setPlace(data)
            }catch(err){
                console.log(err)
            }
        }
        getPlace()
    },[])

    //get review on place
    useEffect(()=>{
        const getReview = async()=>{
            const {data} = await axiosPrivate.get(`/review/comment/${id}`)
            setReviews(data)
        }
        getReview()
    },[])

    
    const reviewElem = reviews?.map((review, i)=><Review key={i} review={review}/>)

    return(
        <div className='my-place'>
            {place && <><h2>{place?.name}</h2>
            <div className='image-container'>
                <img className='photo' alt= 'beautiful images'
                        src={`http://localhost:3000/uploads/${place?.photos[0]}`}/>
            </div>
            <div>
                <div className='rating-place'>
                        <Rating placeId={id}/>
                </div>
                <div>{place?.address}, {place?.city}</div>
            </div>
            <hr style={{margin: '10px 0'}}/>
            <div>
                <div>{place?.type} hosted by {auth.name}</div>
                <div>{place?.bedroom} bedroom . {place?.kitchen} kitchen . 
                {place?.livingroom} livingroom . {place?.washroom} washroom</div>
            </div>
            <hr style={{margin: '10px 0'}}/>
            <div>{place?.description}</div>
            <hr style={{margin: '10px 0'}}/>
            <div>
                <h2>What this place offers</h2>
                <div>
                    {place?.amenities.map(data=> <div key={data}>
                        {data}
                    </div>)}
                </div>
            </div>
            <hr style={{margin: '10px 0'}}/>
            <div><h2>House Rules</h2></div>
            <hr style={{margin: '10px 0'}}/>
            <div>Contact Owner</div>      
            <hr style={{margin: '10px 0'}}/>
            <h2 className="accomodation-heading">Reviews.</h2>
            {reviewElem}
            <hr style={{margin: '10px 0'}}/>
            </>}
        </div>
    )
}