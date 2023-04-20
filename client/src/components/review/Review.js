

export default function Review({review}){
    console.log(review.reviews)
    return(
        <div className="review">
            <h4>{review.name}</h4>
            <p>{review.reviews}</p>
        </div>
    )
}