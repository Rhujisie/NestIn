import axios from "axios"
import { useEffect, useState } from "react"


export default function Index(){
    const [main, setMain] = useState('nothing>>>')
    useEffect(()=>{
        console.log('main')
    },[])
    const handleClick=()=>{
        console.log('click')
    }
    return(
        <div className="main">
            {main}
           <button onClick={handleClick}>
                Main
            </button>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
           <h1>Main</h1>
        </div>
    )
}