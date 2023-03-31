import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Profile from './Profile';

export default function Login(){

    const [loginData, setLoginData] = useState({
        email: '', password: ''
    })
    const [redirect, setRedirect] = useState()
    
    // need to change
    const user = 'esie'

    const handleChange=(e)=>{
        setLoginData(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const handleLogin= async(e)=>{
        e.preventDefault()
        const {data} = await axios.post('/login', loginData)
        console.log(data)
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <>
            {user? <Profile/>:
                <div className="login">
                <h4>'Login'</h4>
                <form onSubmit={handleLogin}>
                    <input type='email' placeholder="email"
                            value={loginData.email}
                            name='email'
                            onChange={handleChange}/>
                    <input type='password' placeholder="password"
                            value={loginData.password}
                            name='password'
                            onChange={handleChange}/>
                    <button>Login</button>
                </form>
                <div className="register-link">
                    Don't have an account yet? 
                    <Link to='/register' style={{textDecoration: 'none'}}>Register Now.</Link>
                </div>
            </div>
            }
            
        </>
      
    )
}