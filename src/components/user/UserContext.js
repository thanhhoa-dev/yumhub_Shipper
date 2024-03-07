import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'

const UserContext = createContext();

export const UserProvider = (props) =>{
    const {children} = props;
    const [user, setUser] = useState(null); 
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContext;