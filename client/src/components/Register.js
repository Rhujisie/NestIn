import { useState } from "react";
import { Link } from "react-router-dom";


export default function Register(){
    const [loginData, setLoginData] = useState(
        {name: '', email: '', phoneNumber: '', password:''})

    const handleChange=(e)=>{
        setLoginData(prev=> ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(loginData)
    }
    
    return(
        <div className="register">
            <h4>Login</h4>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Name" name='name'
                    value={loginData.name} onChange={handleChange}/>
                <input type='email' placeholder="email" name='email'
                    value={loginData.email} onChange={handleChange}/>
                <input type='number' placeholder="Phone no." name="phoneNumber"
                    value={loginData.phoneNumber} onChange={handleChange}/>
                <input type='password' placeholder="password" name='password'
                    value={loginData.password} onChange={handleChange}/>
                <button>Register</button>
            </form>
            <div className="register-link">
               Already a member? 
                <Link to='/login' style={{textDecoration: 'none'}}>Login.</Link>
            </div>
        </div>
    )
}