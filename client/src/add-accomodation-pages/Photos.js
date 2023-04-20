import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import usePlace from "../hooks/usePlace"
import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

//import Upload from '../icon/upload.png'
import axios from 'axios'
import Rupee from '../icon/rupee.png'
import Upload from '../icon/cloud-upload.png'
import Star from '../icon/star.png'
import Delete from '../icon/trash.png'
import StarColored from '../icon/star-colored.png'


export default function Photos(){

    const {place, setPlace} = usePlace()
    const [completion, setCompletion] = useOutletContext()
    const [errMsg, setErrMsg] = useState()
    const errRef = useRef()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location  = useLocation()
    const {id} = location.state

    console.log(id)

    useEffect(()=>{
        setCompletion(5)
        setPlace(prev=>({...prev, 
            name:localStorage.getItem('name') || '',
            description:localStorage.getItem('description') || '',
            price:localStorage.getItem('price') || 0,
            type: localStorage.getItem('type') || '',
            photos:JSON.parse(localStorage.getItem('photos')) || [],
            district: localStorage.getItem('district') || '', 
            city: localStorage.getItem('city') || '',
            address: localStorage.getItem('address') || '',
            landmark: localStorage.getItem('landmark') || '',
            bedroom: JSON.parse(localStorage.getItem('bedroom')) || 1,
            livingroom: JSON.parse(localStorage.getItem('livingroom')) || 1,
            kitchen: JSON.parse(localStorage.getItem('kitchen')) || 1,
            washroom: JSON.parse(localStorage.getItem('washroom')) || 1,
            amenities:JSON.parse(localStorage.getItem('amenities')) || []
        }))
    },[])
    useEffect(()=>{
        localStorage.setItem('name', place.name)
        localStorage.setItem('description', place.description)
        localStorage.setItem('price', place.price)
        localStorage.setItem('photos', JSON.stringify(place.photos))
    },[place])

    useEffect(()=>{
        setErrMsg('')
    },[place])

    console.log(place)
    const deletePhoto=(photo)=>{
        const newPhotos = place.photos.filter(data=> data !== photo)
        setPlace(prev=>({...prev, photos: newPhotos}))
    }
    const mainPhoto=(photo)=>{
        const newPhotos = place.photos.filter(data=> data !== photo)
        setPlace(prev=>({...prev, photos: [photo, ...newPhotos]}))
    }
    
    const handleChange =(e)=>{
        setPlace(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const uploadPhoto = async(e)=>{
        const files = e.target.files
        const file = new FormData()
        for(let i =0; i < files.length; i++){
            file.append('photos', files[i])
        }
        try{
            const {data} = await axios.post('/uploads', file,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            setPlace(prev=>({...prev, photos: [...prev.photos, ...data]}))
        }catch(err){
            console.log(err)
        }
    }
    const handleSubmit = async () =>{
        try{
            if(id) await axiosPrivate.patch(`/place/update/${id}`, place)
            else await axiosPrivate.post('/place', place)
                localStorage.clear()
                setPlace({
                    name: '', description: '', type: '',district:'', city: '', 
                    address: '', landmark: '',bedroom: 1, livingroom: 1, kitchen: 1,
                    washroom: 1, photos: [], amenities: [], price: 0
                })
                navigate('/nestyourhome', {replace: -5})
            
        }catch(err){
            setErrMsg('Fialed to upload your place')
            errRef.current.focus()
        }
   }

    const photoElem = place?.photos?.map((photo, i)=> 
    <div key={i} className="photo-display">
        <img className='photo' alt= 'beautiful images'
                        src={`http://localhost:3000/uploads/${photo}`}/>
        <button onClick={()=>deletePhoto(photo)}>
            <img src={Delete} alt="delete" className="delete-icon"/>
        </button>
        <button onClick={i > 0?(e)=>mainPhoto(photo): null}>
            {i === 0? 
            <img src={StarColored} alt="colored star" className="star-icon"/> 
            :<img src={Star} alt='star' className="star-icon"/>}
        </button>
    </div>)

    return(
        <div className="photos">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
                        {errMsg}
            </p>
            <h2 className="accomodation-heading">
                Make your place stands out by adding a title,
                 meaningful description and photos.</h2>
                 {id && <div className="changes">Make the necessary Changes</div>}
            <form className="photo-form">
                <input type='text' placeholder='Title' name='name'
                    value={place.name} onChange={handleChange}/>
                <textarea placeholder='Description' name='description'
                    value={place.description} onChange={handleChange}>
                </textarea>
                <div className="price-container">
                    <img src={Rupee} alt="rupee" className="rupee"/>
                    <input type="number" placeholder="Price" name='price' id="price"
                        value={place.price} onChange={handleChange}/>
                    <span className="duration">
                        {place?.type === 'house' || place?.type === 'flat' || 
                        place?.type ==='hostel' || place?.type ==='paying guest'?
                        'per month': 'per night'}
                    </span>
                </div>
                <label className="upload-container">
                    <img src={Upload} alt='upload' className="upload-logo"/>
                    <h3>Add photos</h3>
                    <input type='file' onChange={uploadPhoto} 
                    multiple name='photo' className="hidden"/>
                </label>
            </form>
            <div className='photo-container'>
                {photoElem}
            </div>
            <button onClick={handleSubmit}>Upload place</button>
        </div>
    )
}