import { useEffect, useState } from "react"
import Places from "../place/Places"
import axios from '../../api/axios'
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"

export default function Index(){

    const [places, setPlaces] = useState()
    const [wishlist, setWishlist] = useState()
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') 
    || false)
    const {auth} = useAuth()
    const axiosPrivate = useAxiosPrivate()

    //get places
    useEffect(()=>{
        const getPlace = async()=>{
          try{
            if(loggedIn){
              console.log('logged in')
              const {data} = await axiosPrivate.get('/user/main/all')
              setPlaces(data)
            }else{
              console.log('logged out')
              const {data} = await axios.get('/main/all')
              setPlaces(data)
            }
          }catch(err){
            console.log(err)
          }
        }
        getPlace()
    },[])
    
    //get wishlist 
    useEffect(()=>{
      const getWishlist = async()=>{
        try{
          const {data} = await axiosPrivate.get('/wishlist/list')
          setWishlist(data.placeID)
        }catch(err){
          console.log(err)
        }
      }
      loggedIn && getWishlist()
    },[places])

    let placeElem = []

    if(loggedIn && wishlist){
      placeElem = places?.map((place, index)=>
      <Places key={index} place={place} heart={wishlist.includes(place._id)}/>)
    }else{
      placeElem = places?.map((place, index)=>
      <Places key={index} place={place}/>)
    }

    return(
        <div className="main">
            {places && placeElem}
        </div>
    )
}