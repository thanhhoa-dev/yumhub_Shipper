import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from './screens/Login';
import Signup from './screens/Signup';
import UserInformation from '../shipper/screen/UserInformation';


const UserNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UserInformation"
        component={UserInformation}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
