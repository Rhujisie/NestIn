import { createContext, useContext, useState } from 'react'

 const UserContext = createContext()

export function UseUserContext(){
    return useContext(UserContext)
}

export function UserContextProvider({children}){
    const [user, setUser] = useState()
    const [accessToken, setAccessToken] = useState()

    function changeUser(data){
        setUser(data)
    }
    function changeAccessToken(data){
        setAccessToken(data)
    }
    return(
        <UserContext.Provider value={{user,changeUser, accessToken, changeAccessToken}}>
            {children}
        </UserContext.Provider>
    )
}