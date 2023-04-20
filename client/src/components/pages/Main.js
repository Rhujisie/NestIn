import { useEffect, useState } from "react"
import Places from "../place/Places"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"
import axios from "axios"

export default function Index(){

    const [places, setPlaces] = useState()
    const [wishlist, setWishlist] = useState()
    const {auth} = useAuth()
    const axiosPrivate = useAxiosPrivate()
    //get places
    useEffect(()=>{
        const getPlace = async()=>{
          try{
            const {data} = await axiosPrivate.get('/place')
            setPlaces(data)
          }catch(err){
            console.log(err)
          }
        }
        //auth && getPlace()
    },[])
    //get wishlist 
    useEffect(()=>{
        const getWishlist = async()=>{
            const {data} = await axiosPrivate.get('/wishlist/list')
            setWishlist(data)
        }
        //auth && getWishlist()
    },[])
    const placesElem = places?.map((place, i)=> <Places place={place} 
        key={i} heart={wishlist?.includes(place._id)}/>)

    return(
        <div className="main">
           {placesElem}
        </div>
    )
}