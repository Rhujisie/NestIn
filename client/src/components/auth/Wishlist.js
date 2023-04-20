import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useEffect, useState } from "react"
import Place from  '../place/Places'
import useAuth from "../../hooks/useAuth"

export default function WishList(){

    const [wishlist, setWishlist] = useState()
    const axiosPrivate = useAxiosPrivate()
    const {auth} = useAuth()

    useEffect(()=>{
        const getWishlist = async()=>{
            const {data} = await axiosPrivate.get('/wishlist')
            setWishlist(data)
        }
        getWishlist()
    },[])
    console.log(wishlist)
    const wishlistElem  = wishlist?.map((place, i)=><Place key={i} place={place} heart={true}/>)
    return(
        <div className="wishlist">
            <h2 className="accomodation-heading">{auth?.name}'s wishlist</h2>
            {wishlistElem}
        </div>
    )
}