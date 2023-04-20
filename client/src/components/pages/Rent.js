import useAuth from "../../hooks/useAuth"

export default function Rent(){
    const {auth} = useAuth()
    console.log(auth)
    return(
        <div className="rent">
            Rent
            
        </div>
    )
}