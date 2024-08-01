import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {styles} from '../styles/SuccessOrderStyle';
import {UpdateShipperInformation} from '../ShipperHTTP';
import {UserContext} from '../../user/UserContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import { updateBalance } from './Transaction';

const SuccessOrder = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  const id = user.checkAccount._id;

  const router = useRoute();
  const {order} = router.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await UpdateShipperInformation(id, 3);
        await updateBalance(user, order.order.deliveryCost, order.order.paymentMethod);
        setTimeout(() => {
          navigation.replace('SubmitReview', {order: order});
        }, 5000);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.viewContainer}>
      <FastImage
        style={styles.image}
        source={{
          uri: 'https://cdn.dribbble.com/users/251873/screenshots/9289747/13540-sign-for-success-alert.gif',
        }}
        priority={FastImage.priority.normal}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.textSuccessOrder}>
        Chúc mừng bạn đã hoàn thành chuyến đi !
      </Text>
    </View>
  );
};

export default SuccessOrder;
