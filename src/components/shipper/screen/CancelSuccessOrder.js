import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserContext} from '../../user/UserContext';
import {UpdateOrder, UpdateShipperInformation} from '../ShipperHTTP';

const CancelSuccessOrder = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  const id = user.checkAccount._id;

  const route = useRoute();
  const {order} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        status: 6,
      };
      try {
        await UpdateShipperInformation(id, 3);
        await UpdateOrder(order.order._id, data);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  // const [showStaticImage, setShowStaticImage] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowStaticImage(true);
  //   }, 2600);

  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewHeaderContainer}>
        <View style={{width: 50, height: 50}} />
        <Text style={styles.textTransactionInformation}>
          Thông tin giao dịch
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Trang chủ');
          }}
          style={styles.buttonIconHome}>
          <Feather name={'home'} size={30} color={'#19D6E5'} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewFaile}>
        <Text
          style={{
            color: '#333',
            fontSize: 20,
            fontWeight: '700',
          }}>
          Giao dịch không thành công!!!
        </Text>
        <View style={styles.viewImageGifContainer}>
          <FastImage
            style={{width: '80%', height: '80%'}}
            source={{
              uri: 'https://cdn.pixabay.com/animation/2023/03/19/14/10/14-10-13-121_512.gif',
            }}
            priority={FastImage.priority.normal}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles.textOrderCancel}>
          Đơn hàng của quý khách đã bị huỷ
        </Text>
      </View>
      <Text style={styles.textContentAdmin}>
        Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi. Mọi ý kiến đóng góp
        xin liên hệ{' '}
        <Text
          onPress={() => {
            navigation.navigate('SubmitReview', {order: order});
          }}
          style={{
            color: '#E46929',
            textDecorationLine: 'underline',
          }}>
          tại đây
        </Text>
      </Text>
    </View>
  );
};

export default CancelSuccessOrder;

const styles = StyleSheet.create({
  textContentAdmin: {
    color: '#333',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 50,
    marginHorizontal: 40,
  },
  textOrderCancel: {
    color: '#333',
    fontSize: 20,
    fontWeight: '400',
    marginTop: 30,
  },
  viewImageGifContainer: {
    width: '65%',
    height: 250,
    borderWidth: 2,
    borderRadius: 5000,
    borderColor: '#E46929',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewFaile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonIconHome: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#F5FEFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  textTransactionInformation: {
    color: '#005987',
    fontSize: 20,
    fontWeight: '700',
  },
  viewHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBlockColor: '#5C94B2',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  viewContainer: {
    flex: 1,
  },
});
