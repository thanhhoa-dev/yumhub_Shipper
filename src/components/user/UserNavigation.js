import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from './screens/Login';
import Signup from './screens/Signup';
import UserInformation from '../shipper/screen/UserInformation';
import MapScreen from '../shipper/screen/MapScreen';
import Mapne from '../shipper/screen/Mapne';


const UserNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="UserInformation">
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
        name="MapScreen"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
