import StarBlack from '../../icon/star-black.png'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'

export default function Rating({placeId}){

    const [rating, setRating] = useState()
    const axiosPrivate = useAxiosPrivate()
    //get rating
    useEffect(()=>{
        const getRating = async()=>{
            const {data} = await axiosPrivate.get(`/review/rating/${placeId}`)
            let result  = 0
            data?.map(rate=>{
                result += Object.values(rate).reduce((a,b)=> a + b, 0)
            })
            data && setRating(result / (5 * data.length))
        }
        getRating()
    },[])

    return(
        <>  {rating? <><img src={StarBlack} alt='star' style={{width: '15px'}}/>
                    <span>{rating}</span></>: ''}
        </>
    )
}