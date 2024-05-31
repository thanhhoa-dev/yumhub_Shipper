import { useCallback, useState } from 'react';
import {GetOrderByID, UpdateShipperInformation, UpdateOrder, uploadImage} from '../ShipperHTTP';
import axios from 'axios';
import { Alert } from 'react-native';
const GOONG_API_KEY = 'IaCWfNwZedduRhoohVxatXxl5nhVbKXTa3ojVBV7';

const [imageCheck, setImageCheck] = useState(null);


export const fetchOrder = async (
  id,
  idUser,
  setOrder,
  setModalVisible,
  setIsTimerRunning,
) => {
  try {
    const result = await GetOrderByID(id);
    setOrder(result);
    if (result.result) {
      await UpdateShipperInformation(idUser, 8);
      setModalVisible(true);
      setIsTimerRunning(true);
    }
  } catch (error) {
    console.log('Error fetching order:', error);
    throw error;
  }
};

const decodePolyline = encoded => {
  let poly = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    let p = {
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    };
    poly.push(p);
  }
  return poly;
};

export const fetchRoute = async (
  locateCurrent,
  destination,
  setRouteCoordinates,
  setDistance,
  setDuration,
) => {
  if (locateCurrent && destination) {
    try {
      const response = await axios.get(`https://rsapi.goong.io/Direction`, {
        params: {
          origin: `${locateCurrent.latitude},${locateCurrent.longitude}`,
          destination: `${destination.latitude},${destination.longitude}`,
          vehicle: 'bike',
          api_key: GOONG_API_KEY,
        },
      });

      const {routes} = response.data;

      if (routes && routes.length > 0) {
        const points = routes[0].overview_polyline.points;
        const coordinates = decodePolyline(points);
        setRouteCoordinates(coordinates);
        setDistance(routes[0].legs[0].distance.text);
        setDuration(routes[0].legs[0].duration.text);
      }
    } catch (error) {
      console.error(error);
      console.log('83');
    }
  }
};

export const fetchRouteCustomer = async (
  destination,
  destinationCustomer,
  setRouteCoordinatesCustomer,
  setDistanceCustomer,
  setDurationCustomer,
) => {
  if (destinationCustomer && destination) {
    try {
      const response = await axios.get(`https://rsapi.goong.io/Direction`, {
        params: {
          origin: `${destination.latitude},${destination.longitude}`,
          destination: `${destinationCustomer.lat},${destinationCustomer.lng}`,
          vehicle: 'bike',
          api_key: GOONG_API_KEY, // Sử dụng biến môi trường
        },
      });

      const {routes} = response.data;

      if (routes && routes.length > 0) {
        const points = routes[0].overview_polyline.points;
        const coordinates = decodePolyline(points);
        setRouteCoordinatesCustomer(coordinates);
        setDistanceCustomer(routes[0].legs[0].distance.text);
        setDurationCustomer(routes[0].legs[0].duration.text);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// // Show Bottom Sheet
// export const handlePresentPress = useCallback(
//   (bottomSheetRef, setIsBottomSheetVisible) => {
//     bottomSheetRef.current?.expand();
//     setIsBottomSheetVisible(true);
//   },
//   [],
// );

// // Hide Bottom Sheet
// export const handleClosePress = useCallback(
//   (bottomSheetRef, setIsBottomSheetVisible) => {
//     bottomSheetRef.current?.close();
//     setIsBottomSheetVisible(false);
//   },
//   [],
// );

export const handleShipperDecision = async (
  id,
  status,
  order,
  idUser,
  setDestination,
  setQuery,
  setModalVisible,
  setModalVisibleConfirm,
  setIsTimerRunning,
  setCountdown,
  setOrder,
  handlePresentPress,
  updateOrderStatus
) => {
  try {
    if (status === 3) {
      setDestination({
        latitude: order.merchantID.latitude,
        longitude: order.merchantID.longitude,
      });
      setQuery(`${order.deliveryAddress}`);
      setModalVisible(false);
      setModalVisibleConfirm(false);
      setIsTimerRunning(false);
      setCountdown(60);
      handlePresentPress();

      await updateOrderStatus(id, 3);
      await UpdateShipperInformation(idUser, 6);
    } else if (status === 5) {
      setModalVisible(false);
      setModalVisibleConfirm(false);
      setOrder(null);
      setIsTimerRunning(false);
      setCountdown(60);
      await updateOrderStatus(id, 5);
      await UpdateShipperInformation(idUser, 7);
    } else {
      console.warn('Lựa chọn không hợp lệ');
    }
  } catch (error) {
    console.error('Error handling shipper decision:', error);
  }
};

export const handleConfirmCancel = async (
  image,
  handleClosePress,
  setIndex,
  setOrder,
  translateX,
  navigation,
  id,
  updateOrderStatus
) => {
  const data = {
    imageGiveFood: image,
  };
  console.log(image);
  try {
    if (image) {
      handleClosePress();
      setIndex(0);
      await updateOrderStatus(id, 5);
      await UpdateOrder(id, data);
      setOrder(null);
      translateX.setValue(0);
      navigation.navigate('SuccessOrder');
      setTimeout(() => {
        navigation.navigate('SubmitReview', {id: id});
      }, 5000);
    } else {
      setIndex(3);
      Alert.alert('Phải chụp hình ảnh');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

