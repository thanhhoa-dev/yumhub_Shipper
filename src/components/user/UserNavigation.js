import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from './screens/Login';
import Signup from './screens/Signup';
import UserInformation from '../shipper/screen/UserInformation';
import SuccessOrder from '../shipper/screen/SuccessOrder';
import Goong from '../shipper/screen/Goong';
import SubmitReview from '../shipper/screen/SubmitReview';

import Revenue from '../shipper/screen/RevenueTest';
import SixDaysAgo from '../shipper/screen/SixDaysAgo';
import AccessLocation from '../shipper/screen/AccessLocation';
import CancelSuccessOrder from '../shipper/screen/CancelSuccessOrder';


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
      <Stack.Screen
        options={{headerShown: false}}
        name="SubmitReview"
        component={SubmitReview}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Revenue"
        component={Revenue}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SixDaysAgo"
        component={SixDaysAgo}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CancelSuccessOrder"
        component={CancelSuccessOrder}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
