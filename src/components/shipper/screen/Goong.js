import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Button,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Linking,
  Animated,
  PanResponder,
  Dimensions,
  ToastAndroid,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'
import {
  GetOrderByID,
  ShowDetail,
  uploadImage,
  UpdateOrder,
} from '../ShipperHTTP';
import axios from 'axios';
import {UpdateShipperInformation} from '../ShipperHTTP';
import {UserContext} from '../../user/UserContext';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera} from 'react-native-image-picker';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import Loading from './Loading';
import {styles} from '../styles/GoogStyle';
import {GOONG_API_KEY} from '@env';
import DropdownComponentGoong from './DropdownComponentGoong';
import BottomSheetComponent from './BottomSheetComponent';
import LoadImage from './LoadImage';
import { updateBalanceMerchant } from './Transaction';

const Goong = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
  const [modalVisibleCancelOrder, setModalVisibleCancelOrder] = useState(false);
  const [
    modalVisibleCancelOrderFromMerchant,
    setModalVisibleCancelOrderFromMerchant,
  ] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeCoordinatesCustomer, setRouteCoordinatesCustomer] = useState([]);
  const [locateCurrent, setLocateCurrent] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [distanceCustomer, setDistanceCustomer] = useState(null);
  const [durationCustomer, setDurationCustomer] = useState(null);
  const [query, setQuery] = useState('');
  const [destinationCustomer, setDestinationCustomer] = useState(null);
  const [detailFoodOrder, setDetailFoodOrder] = useState(null);
  const [image, setImage] = useState('');
  const [index, setIndex] = useState(0);
  const [showNumberPhone, setShowNumberPhone] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const bottomSheetRef = useRef(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const snapPoints = useMemo(() => ['20%', '25%', '50%', '70%', '100%'], []);
  const [statusShipper, setStatusShipper] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [countdownTimePaymentMethod, setCountdownTimePaymentMethod] =
    useState(600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [valueCancelOrder, setValueCancelOrder] = useState(1);
  const navigationState = useNavigationState(state => state);
  const {user, sendMessage, receiveMessage} = useContext(UserContext);
  const [order, setOrder] = useState(null);
  const [checkImage, setCheckImage] = useState(false);
  var id;
  const idUser = user.checkAccount._id;
  const currentOrder = useRef(null);
  const currentOrderImage = useRef('');
  const currentLocationCustomer = useRef('');
  const currentLocationShipper = useRef('');
  //websocket

  useEffect(() => {
    if (user && receiveMessage) {
      receiveMessage(async message => {
        console.log(message);
        switch (message.command) {
          case 'placeOrder':
            if (message.command === 'placeOrder' && statusShipper) {
              setIndex(0);
              setCountdownTimePaymentMethod(600);
              setOrder(message);
              id = message.order._id;
              await UpdateShipperInformation(idUser, 8);
              setModalVisible(true);
              setIsTimerRunning(true);
            }
            break;
          case 'cancelled_from_merchant':
            console.log('cancelled_from_merchant');
            handleCancelToMerchant(6);
            break;
          case 'cancelled_from_customer':
            console.log('cancelled_from_customer');
            handleCancelFromCus()
            break;
          default:
            console.log('Unknown command:', message.command);
            break;
        }
      });
    } else {
      console.log('User is not set or receiveMessage is not defined');
    }
  }, [user, receiveMessage, statusShipper]);

  //websocket

  useEffect(() => {
    const backAction = () => {
      if (navigationState.index === 0) {
        Alert.alert(
          'Thoát App',
          'Bạn có chắc chắn muốn thoát khỏi ứng dụng không?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ],
        );
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigationState]);

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     try {
  //       const result = await GetOrderByID(id);
  //       setOrder(result);
  //       if (result.result) {
  //         await UpdateShipperInformation(idUser, 8);
  //         setModalVisible(true);
  //         setIsTimerRunning(true);
  //       }
  //     } catch (error) {
  //       console.log('Error fetching order:', error);
  //       throw error;
  //     }
  //   };
  //   if (!order && statusShipper) {
  //     fetchOrder();
  //   }
  // }, [countdown, id, idUser, order, statusShipper]);

  const handleLocateCurrent = async () => {
    // console.log('ahihi');
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const {latitude, longitude} = position.coords;
    //     setLocateCurrent({
    //       latitude,
    //       longitude,
    //     });
    //   },
    //   error => console.log(error.message),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    // );
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setLocateCurrent({
                latitude,
                longitude,
              });
            },
            error => {
              console.log(error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    handleLocateCurrent();
  }, []);

  useEffect(() => {
    if (order) {
      currentOrder.current = order;
    }
  }, [order]);

  useEffect(() => {
    currentOrderImage.current = image;
  }, [image]);

  useEffect(() => {
    currentLocationCustomer.current = destinationCustomer;
  }, [destinationCustomer]);

  useEffect(() => {
    currentLocationShipper.current = locateCurrent;
  }, [locateCurrent]);

  const handleSendMessage = command => {
    console.log(command);
    sendMessage('shipper', command, currentOrder.current.order);
  };

  useEffect(() => {
    const timeReceiveApplication = async () => {
      if (countdown === 0 && isTimerRunning) {
        handleSendMessage('refuse');
        setOrder(null);
        setModalVisible(false);
        setCountdown(60);
        setIsTimerRunning(false);
      }
    };
    timeReceiveApplication();
  }, [countdown]);

  useEffect(() => {
    if (locateCurrent && destination) {
      fetchRoute();
    }
  }, [locateCurrent, destination]);

  useEffect(() => {
    if (query) {
      searchPlaces();
    }
  }, [query]);

  useEffect(() => {
    if (destinationCustomer && destination) {
      fetchRouteCustomer();
    }
  }, [destinationCustomer, destination]);

  const fetchRoute = async () => {
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
      Alert.alert('Không thể tìm ra vị trí của cửa hàng');
      console.log(error);
    }
  };
  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const fetchRouteCustomer = async () => {
    try {
      const response = await axios.get(`https://rsapi.goong.io/Direction`, {
        params: {
          origin: `${destination.latitude},${destination.longitude}`,
          destination: `${destinationCustomer.lat},${destinationCustomer.lng}`,
          vehicle: 'bike',
          api_key: GOONG_API_KEY,
        },
      });

      const {routes} = response.data;

        const R = 6371; // Bán kính Trái đất theo km
        const dLat = degreesToRadians(destinationCustomer.lat - destination.latitude);
        const dLon = degreesToRadians(destinationCustomer.lng - destination.longitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(degreesToRadians(destination.latitude)) * Math.cos(degreesToRadians(destinationCustomer.lat)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Khoảng cách theo km

      if (routes && routes.length > 0) {
        const points = routes[0].overview_polyline.points;
        const coordinates = decodePolyline(points);
        setRouteCoordinatesCustomer(coordinates);
        // setDistanceCustomer(routes[0].legs[0].distance.text);
        // console.log(distance);
        // setDistanceCustomer(distance.toFixed(1)+ ' ' +'km');
        setDurationCustomer(routes[0].legs[0].duration.text);
      }
    } catch (error) {
      Alert.alert('Không thể tìm ra vị trí của khách hàng');
      console.log(error);
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

  const updateOrderStatus = async (id, status) => {
    const data = {
      status: status,
    };
    try {
      await UpdateOrder(id, data);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Show Bottom Sheet
  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.expand();
    setIsBottomSheetVisible(true);
  }, []);

  // Hide Bottom Sheet
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsBottomSheetVisible(false);
  }, []);

  const handleShipperDecision = async (id, status) => {
    try {
      if (status === 3) {
        if (
          order.order.merchantID.latitude &&
          order.order.merchantID.longitude
        ) {
          setDestination({
            latitude: order.order.merchantID.latitude,
            longitude: order.order.merchantID.longitude,
          });
          setQuery(`${order.order.deliveryAddress}`);
          setModalVisible(false);
          setModalVisibleConfirm(false);
          setIsTimerRunning(false);
          setCountdown(60);
          handlePresentPress();
          await updateOrderStatus(id, 8);
          await UpdateShipperInformation(idUser, 5);
          handleSendMessage('accept');
        } else {
          Alert.alert('Không tìm thấy vị trí nhà hàng');
        }
      } else if (status === 5) {
        setModalVisible(false);
        setModalVisibleConfirm(false);
        setOrder(null);
        setIsTimerRunning(false);
        setCountdown(60);
        handleSendMessage('refuse');
      } else {
        console.warn('Lựa chọn không hợp lệ');
      }
    } catch (error) {
      console.error('Error handling shipper decision:', error);
    }
  };

  const ShipperMarker = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../assets/delivery-bike.png')}
          style={{width: 40, height: 40}}
        />
      </View>
    );
  };

  const MerchantMarker = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../assets/merchant.png')}
          style={{width: 40, height: 40}}
        />
      </View>
    );
  };

  const CustomMarker = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../assets/customer-service.png')}
          style={{width: 40, height: 40}}
        />
      </View>
    );
  };

  const searchPlaces = async () => {
    try {
      const response = await axios.get(
        `https://rsapi.goong.io/Place/AutoComplete`,
        {
          params: {
            api_key: GOONG_API_KEY,
            input: query,
            location: '20.981971,105.864323',
            language: 'vi',
          },
        },
      );
      const places = response.data.predictions[0].place_id;
      if (places) {
        searchPlacesDetail(places);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch places.');
      console.error('Error fetching places:', error);
    }
  };

  const searchPlacesDetail = async places => {
    try {
      const response = await axios.get(`https://rsapi.goong.io/Place/Detail`, {
        params: {
          place_id: places,
          api_key: GOONG_API_KEY,
        },
      });
      setDestinationCustomer(response.data.result.geometry.location);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch places detail.');
      console.error('Error fetching places:', error);
    }
  };

  const handleShowDetail = async () => {
    setCheckImage(true);
    try {
      const result = await ShowDetail(currentOrder.current.order._id);
      setDetailFoodOrder(result);
      setCheckImage(false);
    } catch (error) {
      setCheckImage(false);
      console.log(error);
    }
  };

  const handleFlatlistFood = ({item}) => {
    return (
      <View style={styles.viewContainerItemInformationFoodBottomSheet}>
        <View style={styles.viewItemInformationFoodBottomSheet}>
          <Text style={styles.textInformationFoodBottomSheet}>{item.name}</Text>
          <Text
            style={[
              styles.textInformationFoodBottomSheet,
              {color: '#646982', fontSize: 14},
            ]}>
            {item.other.priceForSale != null ? item.other.priceForSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : item.other.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
          </Text>
        </View>
        <View style={styles.viewItemImageFoodBottomSheet}>
          <LoadImage
            style={{height: 47, width: 47, borderRadius: 50, marginEnd: 15}}
            uri={item.image}
          />
          <View style={{width:50}}>
            <Text style={styles.textInformationFoodBottomSheet}>
              x {item.food.quantity}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const items = [
    'Đã đến nhà hàng',
    'Đã lấy hàng',
    'Đã đến nơi giao',
    'Giao hoàn tất',
  ];

  const handleConfirmCancelOrder = async index => {
    const data =
      index === 1
        ? {
            status: 6,
          }
        : {
            status: 9,
          };
    try {
      await UpdateOrder(order.order._id, data);
      setModalVisibleCancelOrder(false);
      setModalVisibleCancelOrderFromMerchant(false);
      handleClosePress();
      setIndex(0);
      handleSendMessage('cancelled_from_shipper');
      translateX.setValue(0);
      navigation.navigate('CancelSuccessOrder', {
        order: currentOrder.current,
        index: index,
      });
      setOrder(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleCancelToMerchant = (index) => {
    try {
      handleClosePress();
      setIndex(0);
      translateX.setValue(0);
      navigation.navigate('CancelSuccessOrder', {
        order: currentOrder.current,
        index: index,
      });
      setOrder(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleCancelFromCus = () => {
    try {
      handleClosePress();
      setIndex(0);
      translateX.setValue(0);
      setOrder(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (
        countdownTimePaymentMethod > 0 &&
        index === 3 &&
        order.paymentMethod !== 3
      ) {
        setCountdownTimePaymentMethod(prevCountdown => prevCountdown - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownTimePaymentMethod, index]);

  const checkfetchRouteCustomer = async () => {
    try {
      const response = await axios.get(`https://rsapi.goong.io/Direction`, {
        params: {
          origin: `${locateCurrent.latitude},${locateCurrent.longitude}`,
          destination: `${currentLocationCustomer.current.lat},${currentLocationCustomer.current.lng}`,
          vehicle: 'bike',
          api_key: GOONG_API_KEY,
        },
      });

      const {routes} = response.data;

      const R = 6371; // Bán kính Trái đất theo km
      const dLat = degreesToRadians(currentLocationCustomer.current.lat - locateCurrent.latitude);
      const dLon = degreesToRadians(currentLocationCustomer.current.lng - locateCurrent.longitude);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(degreesToRadians(locateCurrent.latitude)) * Math.cos(degreesToRadians(currentLocationCustomer.current.lat)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceText = R * c; // Khoảng cách theo km

      if (routes && routes.length > 0) {
        // const distanceText = routes[0].legs[0].distance.text;
        return distanceText * 1000;
        // const match = distanceText.match(/^(\d+(\.\d+)?)[ ]?(km|m)$/i);
        // if (!match) {
        //   throw new Error('Invalid format');
        // }

        // const value = parseFloat(match[1]);
        // const unit = match[3].toLowerCase();

        // switch (unit) {
        //   case 'km':
        //     return value * 1000;
        //   case 'm':
        //     return value;
        //   default:
        //     throw new Error('Unsupported unit');
        // }
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  const checkDistance = async () => {
    const distance = await checkfetchRouteCustomer();
    if (distance !== null) {
      if (distance > 500) {
        setIndex(2);
        Alert.alert('Bạn chưa đi tới nơi nhỏ hơn 500 m');
      } else {
        handleSendMessage('arrived');
        setIndex(3);
      }
    } else {
      console.error('Unable to fetch distance');
    }
  };
  const fetchShipperToCustomer = async () => {
    try {
      const response = await axios.get(`https://rsapi.goong.io/Direction`, {
        params: {
          origin: `${currentLocationShipper.current.latitude},${currentLocationShipper.current.longitude}`,
          destination: `${destinationCustomer.lat},${destinationCustomer.lng}`,
          vehicle: 'bike',
          api_key: GOONG_API_KEY,
        },
      });

      const {routes} = response.data;

      const R = 6371; // Bán kính Trái đất theo km
        const dLat = degreesToRadians(destinationCustomer.lat - currentLocationShipper.current.latitude);
        const dLon = degreesToRadians(destinationCustomer.lng - currentLocationShipper.current.longitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(degreesToRadians(currentLocationShipper.current.latitude)) * Math.cos(degreesToRadians(destinationCustomer.lat)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Khoảng cách theo km

      if (routes && routes.length > 0) {
        const points = routes[0].overview_polyline.points;
        const coordinates = decodePolyline(points);
        setRouteCoordinatesCustomer(coordinates);
        setDistanceCustomer(distance.toFixed(1)+' '+'Km');
        console.log(distance);
        // setDistanceCustomer(routes[0].legs[0].distance.text);
        setDurationCustomer(routes[0].legs[0].duration.text);
      }
    } catch (error) {
      Alert.alert('Không tìm ra đường đến khách hàng');
      console.log(error);
    }
  };

  const handleUpdateIndex = () => {
    setIndex(prevIndex => {
      let newIndex;
      if (prevIndex === 1) {
        handleLocateCurrent();
        fetchShipperToCustomer();
        newIndex = 2;
      } else if (prevIndex === 2) {
        checkDistance();
      } else if (prevIndex === 3) {
        if (currentOrderImage.current) {
          newIndex = (prevIndex + 1) % (items.length + 1);
        } else {
          newIndex = 3;
          Alert.alert('Phải chụp hình ảnh');
        }
      } else {
        newIndex = (prevIndex + 1) % (items.length + 1);
      }
      switch (newIndex) {
        case 1:
          handleShowDetail();
          handleSendMessage('waiting');
          break;
        case 2:
          // thanh hoa
          const updateMerchant = async () => {
            await updateBalanceMerchant(currentOrder.current.order.merchantID, currentOrder.current.order.priceFood, currentOrder.current.order.paymentMethod )
          }
          updateMerchant()
          handleSendMessage('delivering');
          break;
        case 3:
          break;
        case 4:
          handleConfirmCancel();
          break;
        default:
          break;
      }
      return newIndex;
    });
  };

  /// xử lý hình ảnh
  const takePhoto = useCallback(async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (response.errorCode) {
      console.error('ImagePicker Error: ', response.errorCode);
      return;
    }
    if (response.errorMessage) {
      console.error('ImagePicker Error: ', response.errorMessage);
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      const formData = new FormData();
      formData.append('file', {
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      });
      try {
        setCheckImage(true);
        const result = await uploadImage(formData);
        setImage(result.url);
        setCheckImage(false);
      } catch (error) {
        setCheckImage(false);
        Alert.alert('Xảy ra lỗi mạng thử lại sau');
        // console.error('Error uploading image:', error);
      }
    }
  }, []);

  const openCamera = useCallback(() => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    launchCamera(options, takePhoto);
  }, [takePhoto]);

  const handleCall = phoneNumber => {
    setShowNumberPhone(false);
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleSetStatusShipper = async () => {
    try {
      if (statusShipper) {
        await UpdateShipperInformation(idUser, 4);
        setStatusShipper(false);
      } else {
        await UpdateShipperInformation(idUser, 3);
        setStatusShipper(true);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0 && isTimerRunning) {
        setCountdown(prevCountdown => prevCountdown - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, isTimerRunning]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleConfirmCancel = async () => {
    const data = {
      imageGiveFood: currentOrderImage.current,
      status: 5,
    };
    try {
      setIndex(0);
      handleClosePress();
      await UpdateOrder(currentOrder.current.order._id, data);
      translateX.setValue(0);
      handleSendMessage('success');
      setImage('');
      navigation.navigate('SuccessOrder', {order: currentOrder.current});
      setOrder(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const formatCurrency = amount => {
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
    return formattedAmount.replace('₫', '') + ' ₫';
  };

  if (!locateCurrent) {
    return <Loading />;
  }

  return (
    <View style={styles.viewContainerGoong}>
      <GestureHandlerRootView style={{flex: 1, position: 'relative'}}>
        <View style={styles.viewStatusShipper}>
          {statusShipper ? (
            <Text style={[styles.textStatusShipper, {color: '#005987',backgroundColor:"#A7F9FF"}]}>
              Đang hoạt động
            </Text>
          ) : (
            <Text style={styles.textStatusShipper}>Không hoạt động</Text>
          )}
          <TouchableOpacity
            onPress={() => {
              handleSetStatusShipper();
            }}
            style={styles.buttonPowerOffStatusShipper}>
            <FontAwesome6 name={'power-off'} size={25} color={'#fff'} />
          </TouchableOpacity>
        </View>
        <MapView
          style={{flex: 1, zIndex: -1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={
            locateCurrent
              ? {
                  latitude: locateCurrent.latitude,
                  longitude: locateCurrent.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : null
          }>
          {locateCurrent && (
            <Marker
              title="Vị trí của tôi"
              coordinate={{
                latitude: locateCurrent.latitude,
                longitude: locateCurrent.longitude,
              }}
              anchor={{x: 0.5, y: 1}}>
              <ShipperMarker />
            </Marker>
          )}
          {destination && order && index <= 1 && (
            <Marker
              draggable
              title={`${order.order.merchantID.name}`}
              coordinate={destination}
              onDragEnd={directions => {
                setDestination(directions.nativeEvent.coordinate);
              }}>
              <MerchantMarker />
            </Marker>
          )}
          {destinationCustomer && order && (
            <Marker
              draggable
              title={`${order.order.customerID.fullName}`}
              coordinate={{
                latitude: destinationCustomer.lat,
                longitude: destinationCustomer.lng,
              }}>
              <CustomMarker />
            </Marker>
          )}
          {order && routeCoordinates.length > 0 && index <= 1 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}

          {order && routeCoordinatesCustomer.length > 0 && (
            <Polyline
              coordinates={routeCoordinatesCustomer}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
        </MapView>

        <BottomSheetComponent
          order={order}
          destination={destination}
          snapPoints={snapPoints}
          isBottomSheetVisible={isBottomSheetVisible}
          setIsBottomSheetVisible={setIsBottomSheetVisible}
          index={index}
          detailFoodOrder={detailFoodOrder}
          distance={distance}
          distanceCustomer={distanceCustomer}
          handleFlatlistFood={handleFlatlistFood}
          formatCurrency={formatCurrency}
          image={image}
          handleUpdateIndex={handleUpdateIndex}
          items={items}
          setModalVisibleCancelOrder={setModalVisibleCancelOrder}
          countdownTimePaymentMethod={countdownTimePaymentMethod}
          formatTime={formatTime}
          openCamera={openCamera}
          showNumberPhone={showNumberPhone}
          setShowNumberPhone={setShowNumberPhone}
          handleCall={handleCall}
          checkImage={checkImage}
        />
      </GestureHandlerRootView>
      {order && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.viewContainerModalOrder}>
            <View style={styles.centeredView}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleConfirm(true);
                }}
                style={styles.buttonCloseOrder}>
                <Text style={styles.textXClose}>X</Text>
              </TouchableOpacity>
              <Text style={styles.textOrderNew}>Đơn Hàng Mới</Text>
              <View
                style={[
                  styles.viewContainerInformation,
                  {flexDirection: 'row'},
                ]}>
                <View style={styles.viewDot} />
                <View style={{marginEnd: 10}}>
                  <View style={styles.viewContainerNameUser}>
                    <Text style={styles.textInformation}>Lấy: </Text>
                    <Text style={styles.textInformation}>
                      {order.order.merchantID.name}
                    </Text>
                  </View>
                  <Text
                    style={[styles.textInformation, {fontWeight: '700'}]}
                    numberOfLines={2}>
                    {order.order.merchantID.address}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <FontAwesome
                  name={'angle-double-down'}
                  size={30}
                  color={'#005987'}
                />
              </View>
              <View
                style={[
                  styles.viewContainerInformation,
                  styles.viewContainerAddressCustomer,
                ]}>
                <View
                  style={[
                    styles.viewDot,
                    {
                      backgroundColor: '#29D8E4',
                    },
                  ]}
                />
                <View style={{marginEnd: 10}}>
                  <View style={[styles.viewContainerNameUser, {}]}>
                    <Text style={styles.textInformation}>Giao: </Text>
                    <Text style={styles.textInformation}>
                      {order.order.deliveryFullName}
                    </Text>
                  </View>
                  <Text
                    style={[styles.textInformation, {fontWeight: '700'}]}
                    numberOfLines={2}>
                    {order.order.deliveryAddress}
                  </Text>
                </View>
              </View>
              <View style={styles.viewContainerInformationIncom}>
                <View style={styles.viewItemIncom}>
                  <Text
                    style={[
                      styles.textItemIncom,
                      {color: '#333', fontSize: 14},
                    ]}>
                    Quảng đường ước tính:
                  </Text>
                  <Text
                    style={[
                      styles.textItemIncom,
                      styles.textTotalDistance,
                    ]}>
                    {order.order.totalDistance} Km
                  </Text>
                </View>
                <View style={styles.viewItemIncom}>
                  <Text
                    style={[
                      styles.textItemIncom,
                      {color: '#333', fontSize: 14},
                    ]}>
                    Thu nhập từ đơn này:
                  </Text>
                  <Text style={[styles.textItemIncom, styles.textDeliveryCost]}>
                    {order.order.revenueDelivery
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    đ
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleShipperDecision(order.order._id, 3);
                }}
                style={styles.buttonReceiveOrder}>
                <View style={{width: 12}} />
                <Text style={styles.textReceiveOrder}>NHẬN ĐƠN</Text>
                <Text
                  style={[
                    styles.textReceiveOrder,
                    {color: '#E46929', fontSize: 12},
                  ]}>
                  {formatTime(countdown)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {order && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleConfirm}>
          <View style={styles.viewContainerModalOrder}>
            <View style={styles.viewContainerConfirm}>
              <Text style={styles.TextConfirmOrder}>
                Xác nhận từ chối đơn hàng
              </Text>
              <View style={styles.viewButtonConfirm}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisibleConfirm(false);
                  }}
                  style={[styles.buttonConfirm, styles.buttonConfirmYes]}>
                  <Text style={styles.textConfirmYes}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleShipperDecision(order.order._id, 5)}
                  style={[styles.buttonConfirm, styles.buttonConfirmNo]}>
                  <Text style={styles.textConfirmNo}>Từ Chối</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCancelOrder}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibleConfirm(!modalVisibleCancelOrder);
        }}>
        <View style={styles.viewContainerModalOrder}>
          <View style={[styles.centeredView, {backgroundColor: '#F6F8FA'}]}>
            <TouchableOpacity
              onPress={() => {
                setModalVisibleCancelOrder(false);
              }}
              style={styles.buttonCloseOrder}>
              <Text style={styles.textXClose}>X</Text>
            </TouchableOpacity>
            <Text style={styles.textReasonForCancellation}>
              Chọn lý do hủy đơn
            </Text>
            <View style={styles.viewContainerTextInputCancelOrder}>
              <DropdownComponentGoong
                valueCancelOrder={valueCancelOrder}
                setValueCancelOrder={setValueCancelOrder}
                index={index}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleConfirmCancelOrder(index);
              }}
              style={styles.buttonReceiveCancelOrder}>
              <Text style={styles.textReceiveCancelOrder}>Xác nhận hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* {order && modalVisibleCancelOrderFromMerchant && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleCancelOrderFromMerchant}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisibleCancelOrderFromMerchant(
              !modalVisibleCancelOrderFromMerchant,
            );
          }}>
          <View style={styles.viewContainerModalOrder}>
            <View style={[styles.centeredView, {backgroundColor: '#F6F8FA'}]}>
              <Text style={styles.textReasonForCancellation}>
                Nhà hàng đã hết món
              </Text>
              <TouchableOpacity
                onPress={() => {
                  handleConfirmCancelOrder(index);
                }}
                style={[styles.buttonReceiveCancelOrder, {marginBottom: 10}]}>
                <Text style={styles.textReceiveCancelOrder}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )} */}
    </View>
  );
};

export default Goong;
