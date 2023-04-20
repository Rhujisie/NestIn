import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const USER_REGEX = /^[A-z][A-z-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_NUMBER_REGEX = /[0-9]{10}/;

export default function Register(){

    const userRef = useRef()
    const errRef = useRef()
    const {auth, setAuth} = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname ||'/'

    const [loginData, setLoginData] = useState(
        {name: '', email: '', phoneNumber: '', password:''})
    
    const [confirmPassword, setConfirmPassword] = useState('')

    const [validName, setValidName] = useState(false)
    const [userNameFocus, setUserNameFocus] = useState(false)

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);  
    
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    //setting focus to name input on load
    useEffect(()=>{
        userRef.current.focus()
    }, [])

    //validing name
    useEffect(()=>{
        setValidName(USER_REGEX.test(loginData.name))
    }, [loginData.name])

    //validing email
    useEffect(()=>{
        setValidEmail(EMAIL_REGEX.test(loginData.email))
    }, [loginData.email])
    
    //validing phone number
    useEffect(()=>{
        setValidPhone(PHONE_NUMBER_REGEX.test(loginData.phoneNumber))
    }, [loginData.phoneNumber])

    //validing passowrd and confirm password
    useEffect(()=>{
        setValidPwd(PWD_REGEX.test(loginData.password))
        setValidMatch(loginData.password === confirmPassword)
    }, [loginData.password, confirmPassword])

    //error
    useEffect(() => {
        setErrMsg('');
    }, [loginData])

    const handleChange=(e)=>{
        setLoginData(prev=> ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.post('/register', loginData)
            setAuth(data)
            navigate(from, {replace: true})
        }catch(err){
            //console.log
            console.log(err)
            setErrMsg(err.response.data.msg)
            errRef.current.focus()
        }
    }
    console.log(auth)
    return(
        <div className="register">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
                {errMsg}
             </p>
            <h4>Register</h4>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Name" name='name'
                    value={loginData.name} onChange={handleChange}
                    ref={userRef} autoComplete='off' required
                    aria-invalid={validName? 'false': 'true'}
                    aria-describedby="uidnote"
                    onFocus={()=>setUserNameFocus(true)}
                    onBlur={()=>setUserNameFocus(false)}
                    />
                 <p id="uidnote" className={userNameFocus && loginData.name && !validName ? "instructions" : "offscreen"}>
                    3 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, underscores, hyphens allowed.
                </p>
                <input type='email' placeholder="email" name='email'
                    value={loginData.email} onChange={handleChange}
                    required autoComplete="off"
                    aria-invalid={validEmail? 'false':'true'}
                    aria-describedby='emailnote'
                    onFocus={()=>setEmailFocus(true)}
                    onBlur={()=>setEmailFocus(false)}
                    />
                <p id="emailnote" className={emailFocus && loginData.email && !validEmail ? "instructions" : "offscreen"}>
                    example@gmail.com
                </p>
                <input type='number' placeholder="Phone no." name="phoneNumber"
                    value={loginData.phoneNumber} onChange={handleChange}
                    required
                    aria-invalid={validPhone? 'false':'true'}
                    aria-describedby='phonenote'
                    onFocus={()=>setPhoneFocus(true)}
                    onBlur={()=>setPhoneFocus(false)}
                    />
                <p id="phonenote" className={phoneFocus && loginData.phoneNumber && !validPhone ? "instructions" : "offscreen"}>
                    10 digits
                </p>
                <input type='password' placeholder="password" name='password'
                    value={loginData.password} onChange={handleChange}
                    required 
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}/>
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
                <input type='password' placeholder="Confirm password" name='confirm-password'
                    value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}
                    required 
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}/>
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    Must match the first password.
                </p>
                <button disabled={!validName || !validEmail ||
                    !validPhone || !validPwd || !validMatch}>
                    Register
                </button>
            </form>
            <div className="register-link">
               Already a member? 
                <Link to='/login' style={{textDecoration: 'none'}}>Login.</Link>
            </div>
        </div>
    )
}