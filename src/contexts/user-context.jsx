import { createContext, useState, useEffect } from "react";

import { onUserAuthStateChanged, createUserDocumentFromUserAuth } from "../utils/firebase/firebase";

export const  UserContext = createContext({
    currentUser : null,
    setCurrentUser : () => null
})


export const UserProvider = ({children}) => {

    useEffect( () => {
        const unsubscribe = onUserAuthStateChanged( user =>{
            if(user){
                createUserDocumentFromUserAuth(user)
            }
            setCurrentUser(user)
        }) 
    })
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}
    return(
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}
