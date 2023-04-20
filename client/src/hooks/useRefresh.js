import axios from 'axios'
import useAuth from './useAuth'

export default function useRefresh(){

    const {setAuth} = useAuth()

    const refresh = async()=>{
        const {data} = await axios.get('/refresh')
        setAuth(prev=> ({...prev, ...data}))
        return data
    }
    return(refresh)
}