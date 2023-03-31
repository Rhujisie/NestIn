import { createContext, useState } from 'react'

 const UserContext = createContext()


export function UserContextProvider({children}){
    const [user, setUser] = useState()
    const [accessToken, setAccessToken] = useState()

    return(
        <UserContext.Provider value={{user, setUser, accessToken, setAccessToken}}>
            {children}
        </UserContext.Provider>
    )
}