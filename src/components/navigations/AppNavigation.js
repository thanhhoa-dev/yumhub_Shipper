import React, { useContext } from 'react'

import UserNavigation from '../user/UserNavigation'
import ShipperStackNavigation from '../shipper/ShipperNavigation'
import {UserContext} from '../user/UserContext'
import {NavigationContainer} from '@react-navigation/native';

const AppNavigation = (props) => {
    const {user} = useContext(UserContext);

  return (
    <NavigationContainer>
        {user ? <ShipperStackNavigation/> : <UserNavigation/>}
    </NavigationContainer>
  )
}

export default AppNavigation;