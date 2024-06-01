import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Revenue from './screen/Revenue';
import Account from './screen/Account';
import AccessLocation from './screen/AccessLocation';
import Goong from './screen/Goong';
import SubmitReview from './screen/SubmitReview';
import SuccessOrder from './screen/SuccessOrder';
import CancelSuccessOrder from './screen/CancelSuccessOrder';
import Feedback from './screen/Feedback';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ShipperTabNavigation = () => {
  const screenOptions = ({route}) => ({
    headerShown: false,
    tabBarIcon: ({focused, color, size}) => {
      let rn = route.name;
      if (focused) {
        if (rn === 'Trang chủ') {
          return <Feather name={'home'} size={20} color={'#19D6E5'} />;
        } else if (rn === 'Doanh thu') {
          return <Feather name={'credit-card'} size={20} color={'#19D6E5'} />;
        } else if (rn === 'Thông báo') {
          return (
            <Ionicons
              name={'notifications-outline'}
              size={20}
              color={'#19D6E5'}
            />
          );
        } else if (rn === 'Tài khoản') {
          return (
            <MaterialCommunityIcons
              size={20}
              name={'account-outline'}
              color={'#19D6E5'}
            />
          );
        }
      } else {
        if (rn === 'Trang chủ') {
          return <Feather name={'home'} size={20} color={'#005987'} />;
        } else if (rn === 'Doanh thu') {
          return <Feather name={'credit-card'} size={20} color={'#005987'} />;
        } else if (rn === 'Thông báo') {
          return (
            <Ionicons
              name={'notifications-outline'}
              size={20}
              color={'#005987'}
            />
          );
        } else if (rn === 'Tài khoản') {
          return (
            <MaterialCommunityIcons
              size={20}
              name={'account-outline'}
              color={'#005987'}
            />
          );
        }
      }
    },
    tabBarStyle: {
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      overflow: 'hidden',
    },
  });
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Trang chủ">
      <Tab.Screen
        options={{headerShown: false}}
        name="Trang chủ"
        component={Goong}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Doanh thu"
        component={Revenue}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Thông báo"
        component={Feedback}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Tài khoản"
        component={Account}
      />
    </Tab.Navigator>
  );
};

const ShipperStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="AccessLocation">
      <Stack.Screen
        options={{headerShown: false}}
        name="AccessLocation"
        component={AccessLocation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ShipperTabNavigation"
        component={ShipperTabNavigation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SubmitReview"
        component={SubmitReview}
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
    </Stack.Navigator>
  );
};

export default ShipperStackNavigation;
