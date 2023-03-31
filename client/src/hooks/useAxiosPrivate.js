import { useEffect } from 'react'
import axiosPrivate from '../api/axios'



const useAxiosPrivate = ()=>{
    const refresh = 
    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config =>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (err)=> Promise.reject(err)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async(err)=>{
                const prevRequest = err?.config
                if(err?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(err)
            }
        )
        return()=>{
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.request.eject(requestIntercept)
        }
    },[])
}

export default useAxiosPrivate