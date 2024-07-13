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
import Notification from './screen/Notification';
import HistoryFeedback from './screen/HistoryFeedback';
import Menu from './screen/Menu';
import Profile from './screen/Profile';
import ChangePass from './screen/ChangePass';
import DetailHistory from './screen/DetailHistory';
import History from './screen/History';
import TopUpPaymentMethod from './screen/TopUpPaymentMethod';
import QRCodePayOs from './screen/QRCodePayOs';
import ChatWithCustomer from './screen/ChatWithCustomer'
import PaymentCard from './screen/PaymentCard'
import WithdrawPaymentMethod from './screen/WithdrawMethod'

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
        component={Notification}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Tài khoản"
        component={Menu}
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
      <Stack.Screen
        options={{headerShown: false}}
        name="Feedback"
        component={Feedback}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="HistoryFeedback"
        component={HistoryFeedback}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="ChangePass"
        component={ChangePass}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="DetailHistory"
        component={DetailHistory}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="History"
        component={History}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="QRCodePayOs"
        component={QRCodePayOs}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="TopUpPaymentMethod"
        component={TopUpPaymentMethod}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="ChatWithCustomer"
        component={ChatWithCustomer}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="PaymentCard"
        component={PaymentCard}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="WithdrawPaymentMethod"
        component={WithdrawPaymentMethod}
      />
    </Stack.Navigator>
  );
};

export default ShipperStackNavigation;
