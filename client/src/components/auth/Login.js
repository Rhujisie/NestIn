import axios from "axios";
import {useEffect, useRef, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Login(){

    const {setAuth} = useAuth()
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()

    const [loginData, setLoginData] = useState({
        email: '', password: ''
    })

    const [errMsg, setErrMsg] = useState('')

     //setting focus on email input on page load
     useEffect(()=>{
        userRef.current.focus()
    }, [])

    //cleaning up error
    useEffect(()=>{
        setErrMsg('')
    },[loginData])
    //handle login state change
    const handleChange=(e)=>{
        setLoginData(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    //handle login
    const handleLogin= async(e)=>{
        e.preventDefault()
       try{
        const {data} = await axios.post('/login', loginData,{
            headers:{'Content-Type': 'application/json'}
        })
        localStorage.setItem('loggedIn', true)
        setAuth(data)
        navigate('/',{replace: true})
       }catch(err){
        console.log(err)
        setErrMsg(err.response.data.msg)
        errRef.current.focus()
       }
    }
    return(
                <div className="login">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
                        {errMsg}
                    </p>
                    <h4>Login</h4>
                    <form onSubmit={handleLogin}>
                        <input type='email' placeholder="email"
                                ref={userRef}
                                value={loginData.email}
                                name='email'
                                onChange={handleChange}
                                required
                        />
                        <input type='password' placeholder="password"
                                value={loginData.password}
                                name='password'
                                onChange={handleChange}
                                required/>
                        <button>Login</button>
                    </form>
                    {/* styling not done */}
                    <div className="forgot-passowrd">
                        <Link to='/recovery'  style={{textDecoration: 'none'}}>Forgot Password?</Link>
                    </div>
                    <div className="register-link">
                        Don't have an account yet? 
                        <Link to='/register' style={{textDecoration: 'none'}}> Register Now.</Link>
                    </div>
            </div>        
    )
}