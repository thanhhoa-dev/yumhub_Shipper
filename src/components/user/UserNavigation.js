import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from './screens/Login';
import Signup from './screens/Signup';
import SuccessOrder from '../shipper/screen/SuccessOrder';
import CancelSuccessOrder from '../shipper/screen/CancelSuccessOrder';
import ForgotPassword from './screens/ForgotPassword';
import NewPassword from './screens/ChangePassword';
import CheckOTP from './screens/CheckOTP';
import ResetPassword from './screens/ResetPassword';
import Menu from '../shipper/screen/Menu';
import Profile from '../shipper/screen/Profile';


const UserNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Menu">
       <Stack.Screen
        options={{headerShown: false}}
        name="Menu"
        component={Menu}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
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
        name="SuccessOrder"
        component={SuccessOrder}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CancelSuccessOrder"
        component={CancelSuccessOrder}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ForgotPassword"
        component={ForgotPassword}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="Checkotp"
        component={CheckOTP}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="ResetPassword"
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
