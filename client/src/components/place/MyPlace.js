import { Link, useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useEffect, useRef, useState } from "react"
import useAuth from '../../hooks/useAuth'
import Edit from '../../icon/edit.png'
import Delete from '../../icon/trash.png'
import Rating from '../review/Rating'
import Review from '../review/Review'

export default function MyPlace(){

    const [place, setPlace] = useState()
    const [reviews, setReviews] = useState()
    const [errMsg, setErrMsg] = useState()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const {id} = useParams()
    const {auth} = useAuth()

    const errRef = useRef()

    //get place
    useEffect(()=>{
        const getPlace = async()=>{
            try{
                const {data} = await axiosPrivate.get(`/place/${id}`)
                setPlace(data)
            }catch(err){
                setErrMsg(err.response.data.msg)
                errRef.current.focus()
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

    //erasing error on place change
    useEffect(()=>{
        console.log('err')
        setErrMsg('')
    },[place])

   const handleDelete = async()=>{
    await axiosPrivate.delete(`/place/delete/${id}`)
    navigate('/nestyourhome', {replace: true})
    }
    
    const reviewElem = reviews?.map((review, i)=><Review key={i} review={review}/>)

    return(
        <div className='my-place'>
             <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
                        {errMsg}
            </p>
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
            <div>
                <h2>Contact Owner</h2>
                <button>Ask Owner for Contact</button>
            </div>      
            <hr style={{margin: '10px 0'}}/>
            <h2 className="accomodation-heading">Reviews.</h2>
            {reviewElem}
            <hr style={{margin: '10px 0'}}/>
            <Link to={`/nestyourhome/updateplace/${id}`} 
                style={{textDecoration: "none", color: 'black'}}>
                <img src={Edit} alt='edit' className='edit-icon'/>
                Edit Place
            </Link>
            <img src={Delete} alt='delete' className='delete-icon' 
                    onClick={handleDelete}/>
            </>}
        </div>
    )
}