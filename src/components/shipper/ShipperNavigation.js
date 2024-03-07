import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screen/Home';
import Profile from './screen/Profile';
import Start from '../../../Screens/Start/Start';
import DetailHome from './screen/DetailHome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const ShipperTabNavigation = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        options={{headerShown:false}}
        name='Home'
        component={Home}/>
        <Tab.Screen 
        options={{headerShown:false}}
        name='Profile'
        component={Profile}/>
    </Tab.Navigator>
  )
}

const ShipperStackNavigation = () => {
    return (
      <Stack.Navigator
      initialRouteName='ShipperTabNavigation'>
        <Stack.Screen 
          options={{headerShown:false}}
          name='ShipperTabNavigation'
          component={ShipperTabNavigation}/>
          <Stack.Screen 
          options={{headerShown:false}}
          name='DetailHome'
          component={DetailHome}/>
      </Stack.Navigator>
    )
  }

export default ShipperStackNavigation;

