import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from './screens/Login';
import Signup from './screens/Signup';
import UserInformation from '../shipper/screen/UserInformation';
import SuccessOrder from '../shipper/screen/SuccessOrder';
import Goong from '../shipper/screen/Goong';


const UserNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Goong">
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
      <Stack.Screen
        options={{headerShown: false}}
        name="SuccessOrder"
        component={SuccessOrder}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Goong"
        component={Goong}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
