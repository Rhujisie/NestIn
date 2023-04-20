import axios from 'axios'
import useAuth from './useAuth'

export default function useLogout(){
    const {setAuth} = useAuth()

    const logout = async()=>{
        setAuth({})
        try{
            await axios('/logout')
        }catch(err){
            console.log(err)
        }
    }
    return logout
}