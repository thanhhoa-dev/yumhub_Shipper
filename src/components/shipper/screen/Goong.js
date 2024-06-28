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
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  GetOrderByID,
  ShowDetail,
  uploadImage,
  UpdateOrder,
} from '../ShipperHTTP';
import axios from 'axios';
import {UpdateShipperInformation} from '../ShipperHTTP';
import {UserContext} from '../../user/UserContext';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating-widget';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import Loading from './Loading';
import {styles} from '../styles/GoogStyle';
import {GOONG_API_KEY} from '@env';

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
  const {width} = Dimensions.get('window');
  const bottomSheetRef = useRef(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const snapPoints = useMemo(() => ['20%', '25%', '50%', '70%', '100%'], []);
  const [statusShipper, setStatusShipper] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const {user, sendMessage, receiveMessage} = useContext(UserContext);

  const [order, setOrder] = useState(null);
  var id;
  const idUser = user.checkAccount._id;
  const currentOrder = useRef(null);
  //websocket

  useEffect(() => {
    if (user && receiveMessage) {
      receiveMessage(async message => {
        switch (message.command) {
          case 'placeOrder':
            setOrder(message);
            if (message.command === 'placeOrder') {
              id = message.order._id;
              const ai = await UpdateShipperInformation(idUser, 8);
              console.log(ai);
              setModalVisible(true);
              setIsTimerRunning(true);
            }
            break;
          case 'cancelled_from_merchant':
            console.log('cancelled_from_merchant');
            setModalVisibleCancelOrderFromMerchant(true);
            break;
          default:
            console.log('Unknown command:', message.command);
            break;
        }
      });
    } else {
      console.log('User is not set or receiveMessage is not defined');
    }
  }, [
    user,
    receiveMessage,
    countdown,
    id,
    idUser,
    order,
    statusShipper,
    index,
  ]);

  //websocket

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

  useEffect(() => {
    currentOrder.current = order;
  }, [order]);

  const handleSendMessage = command => {
    sendMessage('shipper', command, currentOrder.current.order);
  };

  useEffect(() => {
    const timeReceiveApplication = async () => {
      if (countdown === 0 && isTimerRunning) {
        setOrder(null);
        setModalVisible(false);
        setCountdown(60);
        setIsTimerRunning(false);
        await updateOrderStatus(id, 5);
        await UpdateShipperInformation(idUser, 7);
      }
    };
    timeReceiveApplication();
  }, [countdown]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocateCurrent({
          latitude,
          longitude,
        });
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

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
      console.error(error);
    }
  };

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
      } else if (status === 5) {
        setModalVisible(false);
        setModalVisibleConfirm(false);
        setOrder(null);
        setIsTimerRunning(false);
        setCountdown(60);
        await updateOrderStatus(id, 6);
        await UpdateShipperInformation(idUser, 3);
        handleSendMessage('refuse');
      } else {
        console.warn('Lựa chọn không hợp lệ');
      }
    } catch (error) {
      console.error('Error handling shipper decision:', error);
    }
  };

  const CustomMarker = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../assets/delivery-bike.png')}
          style={{width: 20, height: 20}}
        />
        <Text>Vị trí tôi</Text>
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
    try {
      const result = await ShowDetail(id);
      setDetailFoodOrder(result);
    } catch (error) {
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
            {item.food.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
          </Text>
        </View>
        <View style={styles.viewItemImageFoodBottomSheet}>
          <Image
            style={{height: 47, width: 47, borderRadius: 50, marginEnd: 35}}
            source={require('../../../assets/ZaloPlay.png')}
          />
          <Text style={styles.textInformationFoodBottomSheet}>
            x {item.food.quantity}
          </Text>
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

  const handleConfirmCancelOrder = async () => {
    try {
      setModalVisibleCancelOrder(false);
      setModalVisibleCancelOrderFromMerchant(false);
      handleClosePress();
      setIndex(0);
      handleSendMessage('cancelled_from_shipper');
      translateX.setValue(0);
      navigation.navigate('CancelSuccessOrder', {order: currentOrder.current});
      setOrder(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleUpdateIndex = order => {
    setIndex(prevIndex => {
      const newIndex = (prevIndex + 1) % (items.length + 1);
      switch (newIndex) {
        case 1:
          handleShowDetail();
          handleSendMessage('waiting');
          break;
        case 2:
          handleSendMessage('delivering');
          break;
        case 3:
          handleSendMessage('arrived');
          break;
        case 4:
          setIndex(3);
          openCamera();
          break;
        default:
          break;
      }
      return newIndex;
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx >= 0 && gestureState.dx <= width * 0.7) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx >= width * 0.7 && currentOrder.current) {
          handleUpdateIndex(currentOrder.current);
        }
        Animated.timing(translateX, {
          toValue: 0,
          duration: 20, // Trở về vị trí ban đầu ngay lập tức
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  /// xử lý hình ảnh
  const takePhoto = useCallback(async response => {
    if (response.didCancel) return;
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
        const result = await uploadImage(formData);
        const imageGiveFood = result.url;
        handleConfirmCancel(imageGiveFood);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }, []);

  const openCamera = useCallback(() => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    setIndex(3);
    launchCamera(options, takePhoto);
  }, [takePhoto]);

  const handleCall = phoneNumber => {
    setShowNumberPhone(false);
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleSetStatusShipper = () => {
    if (statusShipper) {
      setStatusShipper(false);
    } else {
      setStatusShipper(true);
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

  const handleConfirmCancel = async imageGiveFood => {
    const data = {
      imageGiveFood: imageGiveFood,
    };
    try {
      if (imageGiveFood && imageGiveFood.trim() !== '') {
        handleClosePress();
        setIndex(0);
        await updateOrderStatus(id, 5);
        await UpdateOrder(id, data);
        translateX.setValue(0);
        handleSendMessage('success');
        navigation.navigate('SuccessOrder');
        setTimeout(() => {
          navigation.navigate('SubmitReview', {order: currentOrder.current});
          setOrder(null);
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

  if (!locateCurrent) {
    return <Loading />;
  }

  return (
    <View style={styles.viewContainerGoong}>
      <GestureHandlerRootView style={{flex: 1, position: 'relative'}}>
        <View style={styles.viewStatusShipper}>
          {statusShipper ? (
            <Text style={[styles.textStatusShipper, {color: '#005987'}]}>
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
            <FontAwesome6 name={'power-off'} size={25} color={'#19D6E5'} />
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
              coordinate={{
                latitude: locateCurrent.latitude,
                longitude: locateCurrent.longitude,
              }}
              anchor={{x: 0.5, y: 1}}>
              <CustomMarker />
            </Marker>
          )}
          {destination && order && (
            <Marker
              draggable
              title={`${order.order.merchantID.name}`}
              coordinate={destination}
              onDragEnd={directions => {
                setDestination(directions.nativeEvent.coordinate);
              }}
            />
          )}
          {destinationCustomer && order && (
            <Marker
              draggable
              title={`${order.order.customerID.fullName}`}
              coordinate={{
                latitude: destinationCustomer.lat,
                longitude: destinationCustomer.lng,
              }}
            />
          )}
          {order && routeCoordinates.length > 0 && (
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
        {order && destination && isBottomSheetVisible && (
          <BottomSheet
            index={0}
            snapPoints={snapPoints}
            onClose={() => setIsBottomSheetVisible(false)}>
            <ScrollView>
              <View>
                <View style={styles.viewContainerBottomSheet}>
                  {index < 2 ? (
                    <View style={styles.viewInformationMerchantBottomSheet}>
                      <Image
                        style={styles.imageMerchantBottomSheet}
                        source={require('../../../assets/ZaloPlay.png')}
                      />
                      <View
                        style={
                          styles.viewContainerInformationMerchatBottomSheet
                        }>
                        <Text
                          style={styles.textNameMerchantBottomSheet}
                          numberOfLines={1}>
                          {order.order.merchantID.name}
                        </Text>
                        <Text
                          style={styles.textAddressMerchantBottomSheet}
                          numberOfLines={1}>
                          {order.order.merchantID.address}
                        </Text>
                        <View style={styles.viewContainerRating}>
                          <StarRating
                            disabled={true}
                            maxStars={1}
                            rating={1}
                            color={'#FC6E2A'}
                            starSize={22}
                            starStyle={{marginHorizontal: 0}}
                            onChange={() => {}}
                          />
                          <Text style={styles.textRatingBottomSheet}>
                            {order.order.merchantID.rating}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.viewInformationMerchantBottomSheet}>
                      <Image
                        style={styles.imageMerchantBottomSheet}
                        source={{uri: `${order.order.customerID.avatar}`}}
                      />
                      <View
                        style={
                          styles.viewContainerInformationMerchatBottomSheet
                        }>
                        <Text
                          style={styles.textNameMerchantBottomSheet}
                          numberOfLines={1}>
                          {order.order.customerID.fullName}
                        </Text>
                        <Text
                          style={styles.textAddressMerchantBottomSheet}
                          numberOfLines={1}>
                          {order.order.deliveryAddress}
                        </Text>
                        <View style={styles.viewContainerRating}>
                          <StarRating
                            disabled={true}
                            maxStars={1}
                            rating={1}
                            color={'#FC6E2A'}
                            starSize={22}
                            starStyle={{marginHorizontal: 0}}
                            onChange={() => {}}
                          />
                          <Text style={styles.textRatingBottomSheet}>
                            {order.order.merchantID.rating}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  {!detailFoodOrder && (
                    <View style={styles.viewTotalDistance}>
                      <Text style={styles.textNumberDistanceBottomSheet}>
                        {distance}
                      </Text>
                      <Text style={styles.textWishBottomSheet}>
                        Chúc tài xế thượng lộ bình an
                      </Text>
                    </View>
                  )}
                  {index == 2 && (
                    <View style={styles.viewTotalDistance}>
                      <Text style={styles.textNumberDistanceBottomSheet}>
                        {distanceCustomer}
                      </Text>
                      <Text style={styles.textWishBottomSheet}>
                        Chúc tài xế thượng lộ bình an
                      </Text>
                    </View>
                  )}
                  {detailFoodOrder && index == 1 && (
                    <View style={styles.viewListItemInformationFoodBottomSheet}>
                      <Text style={styles.textCodeOrdersBottomSheet}>
                        #{order.order._id}
                      </Text>
                      <Text style={styles.textListFoodBottomSheet}>
                        Danh Sách Món
                      </Text>
                      <FlatList
                        data={detailFoodOrder}
                        renderItem={handleFlatlistFood}
                        key={(index, item) => item.id}
                        scrollEnabled={false}
                      />
                    </View>
                  )}
                  <View style={styles.viewContainerStepsDeliveryBottomSheet}>
                    {detailFoodOrder ? (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <MaterialIcons
                          style={[
                            styles.IconStepsLoadDeliveryBottomSheet,
                            {backgroundColor: '#005987'},
                          ]}
                          color={'white'}
                          name={'done'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          shipper đã đến nhà hàng
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <Feather
                          style={[
                            styles.IconStepsLoadDeliveryBottomSheet,
                            {backgroundColor: '#005987'},
                          ]}
                          color={'white'}
                          name={'loader'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          shipper đã đến nhà hàng
                        </Text>
                      </View>
                    )}
                    {index >= 1 ? (
                      <View
                        style={[
                          styles.viewConnectingWireBottomSheet,
                          {borderStartColor: '#19D6E5'},
                        ]}
                      />
                    ) : (
                      <View style={styles.viewConnectingWireBottomSheet} />
                    )}

                    {index == 1 ? (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <Feather
                          style={[
                            styles.IconStepsLoadDeliveryBottomSheet,
                            {backgroundColor: '#005987'},
                          ]}
                          color={'white'}
                          name={'loader'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          Shipper đã lấy món ăn
                        </Text>
                      </View>
                    ) : index >= 2 ? (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <MaterialIcons
                          style={[
                            styles.IconStepsLoadDeliveryBottomSheet,
                            {backgroundColor: '#005987'},
                          ]}
                          color={'white'}
                          name={'done'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          Shipper đã lấy món ăn
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <MaterialIcons
                          style={[styles.IconStepsLoadDeliveryBottomSheet]}
                          color={'white'}
                          name={'done'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          Shipper đã lấy món ăn
                        </Text>
                      </View>
                    )}
                    {index >= 2 ? (
                      <View
                        style={[
                          styles.viewConnectingWireBottomSheet,
                          {borderStartColor: '#19D6E5'},
                        ]}
                      />
                    ) : (
                      <View style={styles.viewConnectingWireBottomSheet} />
                    )}
                    {index == 2 ? (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <Feather
                          style={[
                            styles.IconStepsLoadDeliveryBottomSheet,
                            {backgroundColor: '#005987'},
                          ]}
                          color={'white'}
                          name={'loader'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          Shipper đã đến nơi giao
                        </Text>
                      </View>
                    ) : index >= 3 ? (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <MaterialIcons
                          style={[
                            styles.IconStepsLoadDeliveryBottomSheet,
                            {backgroundColor: '#005987'},
                          ]}
                          color={'white'}
                          name={'done'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          Shipper đã đến nơi giao
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <MaterialIcons
                          style={[styles.IconStepsLoadDeliveryBottomSheet]}
                          color={'white'}
                          name={'done'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          Shipper đã đến nơi giao
                        </Text>
                      </View>
                    )}

                    {index >= 3 ? (
                      <View
                        style={[
                          styles.viewConnectingWireBottomSheet,
                          {borderStartColor: '#19D6E5'},
                        ]}
                      />
                    ) : (
                      <View style={styles.viewConnectingWireBottomSheet} />
                    )}
                    {index == 3 ? (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <Feather
                          style={[
                            styles.IconStepsLoadDeliveryBottomSheet,
                            {backgroundColor: '#005987'},
                          ]}
                          color={'white'}
                          name={'loader'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          Đơn hàng hoàn tất
                        </Text>
                      </View>
                    ) : index >= 4 ? (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <MaterialIcons
                          style={[
                            styles.IconStepsLoadDeliveryBottomSheet,
                            {backgroundColor: '#005987'},
                          ]}
                          color={'white'}
                          name={'done'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          Shipper đã đến nơi giao
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.viewStepsDeliveryBottomSheet}>
                        <MaterialIcons
                          style={[styles.IconStepsLoadDeliveryBottomSheet]}
                          color={'white'}
                          name={'done'}
                        />
                        <Text style={styles.textStepsDelivery}>
                          Đơn hàng hoàn tất
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.viewSummaryBottomSheet}>
                    <Text style={styles.textSummaryBottomSheet}>Tóm tắt</Text>
                    <View style={styles.viewContainerSummaryBottomSheet}>
                      <Text style={styles.textItemSummaryBottmSheet}>
                        Giá tiền
                      </Text>
                      <Text style={styles.textItemSummaryBottmSheet}>
                        {order.order.totalPaid
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </Text>
                    </View>
                    <View style={styles.viewContainerSummaryBottomSheet}>
                      <Text style={styles.textItemSummaryBottmSheet}>
                        Phí giao hàng
                      </Text>
                      <Text style={styles.textItemSummaryBottmSheet}>
                        {order.order.deliveryCost
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </Text>
                    </View>
                    <View style={styles.viewContainerSummaryBottomSheet}>
                      <Text style={styles.textItemSummaryBottmSheet}>
                        Thu hộ
                      </Text>
                      <Text style={styles.textItemSummaryBottmSheet}>0</Text>
                    </View>
                    <View style={styles.viewContainerSummaryBottomSheet}>
                      <Text
                        style={[
                          styles.textItemSummaryBottmSheet,
                          styles.textIncomeBottomSheet,
                        ]}>
                        Thu nhập
                      </Text>
                      <Text
                        style={[
                          styles.textItemSummaryBottmSheet,
                          styles.textIncomeBottomSheet,
                        ]}>
                        17.500
                      </Text>
                    </View>
                  </View>
                  <View style={styles.viewArriveRestaurantBottomSheet}>
                    <View style={styles.buttonArriveRestaurantBottomSheet}>
                      <Animated.View
                        style={[
                          styles.iconContainer,
                          {transform: [{translateX}]},
                        ]}
                        {...panResponder.panHandlers}>
                        <FontAwesome6
                          style={styles.iconRightBottomSheet}
                          name={'angles-right'}
                          size={30}
                        />
                      </Animated.View>
                      <Text style={styles.textArriveRestaurantBottomSheet}>
                        {items[index]}
                      </Text>
                    </View>
                  </View>
                  {index >= 3 && (
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisibleCancelOrder(true);
                      }}
                      style={[
                        styles.buttonTakePhotoBottomSheet,
                        {backgroundColor: '#E04444'},
                      ]}>
                      <Text style={styles.textTakePhotoBottomSheet}>
                        Giao hàng không thành công
                      </Text>
                    </TouchableOpacity>
                  )}
                  {index == 1 && (
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisibleCancelOrder(true);
                      }}
                      style={[
                        styles.buttonTakePhotoBottomSheet,
                        {backgroundColor: '#E04444'},
                      ]}>
                      <Text style={styles.textTakePhotoBottomSheet}>
                        Nhà hàng đóng cửa/hết món
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.viewContainerCallUserBottomSheet}>
                  {!showNumberPhone && (
                    <View style={styles.viewInformationUserBottomSheet}>
                      {order.order.customerID.avatar ? (
                        <Image
                          style={{height: 70, width: 70, borderRadius: 50}}
                          source={{uri: `${order.order.customerID.avatar}`}}
                        />
                      ) : (
                        <Image
                          style={{height: 70, width: 70, borderRadius: 50}}
                          source={require('../../../assets/ZaloPlay.png')}
                        />
                      )}
                      <View style={styles.viewContainerInformationCustomer}>
                        <Text style={styles.textUserBottomSheet}>
                          {order.order.customerID.fullName}
                        </Text>
                        <View style={styles.viewContainerRating}>
                          <StarRating
                            disabled={true}
                            maxStars={1}
                            rating={1}
                            color={'#FC6E2A'}
                            starSize={22}
                            starStyle={{marginHorizontal: 0}}
                            onChange={() => {}}
                          />
                          <Text style={styles.textRatingBottomSheet}>4.7</Text>
                        </View>
                      </View>
                    </View>
                  )}
                  {!showNumberPhone && (
                    <View style={styles.viewContainerIconBottomSheet}>
                      <TouchableOpacity
                        onPress={() => {
                          setShowNumberPhone(true);
                        }}>
                        <Ionicons
                          style={styles.iconCallBottomSheet}
                          color={'white'}
                          name={'call-outline'}
                          size={20}
                        />
                      </TouchableOpacity>
                      <FontAwesome6
                        style={styles.iconMessageBottomSheet}
                        color={'#005987'}
                        name={'message'}
                        size={20}
                      />
                    </View>
                  )}
                  {showNumberPhone && (
                    <View
                      style={[
                        styles.viewContainerIconBottomSheet,
                        {justifyContent: 'space-between', flex: 1},
                      ]}>
                      <Text style={styles.textCustomerPhoneNumber}>
                        {order.order.customerID.phoneNumber}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          handleCall(order.order.customerID.phoneNumber);
                        }}>
                        <Ionicons
                          style={styles.iconCallBottomSheet}
                          color={'white'}
                          name={'call-outline'}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </BottomSheet>
        )}
      </GestureHandlerRootView>
      {order && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
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
              <View style={styles.viewContainerInformation}>
                <View style={styles.viewContainerNameUser}>
                  <Text style={styles.textInformation}>Đặt bởi: </Text>
                  <Text style={styles.textInformation}>
                    {order.order.customerID.fullName}
                  </Text>
                </View>
                <Text style={styles.textInformation} numberOfLines={1}>
                  {order.order.deliveryAddress}
                </Text>
              </View>
              <View style={styles.viewContainerInformation}>
                <View style={styles.viewContainerNameUser}>
                  <Text style={styles.textInformation}>Nhà hàng: </Text>
                  <Text style={styles.textInformation}>
                    {order.order.merchantID.name}
                  </Text>
                </View>
                <Text style={styles.textInformation} numberOfLines={1}>
                  {order.order.merchantID.address}
                </Text>
              </View>
              <View style={styles.viewContainerInformationIncom}>
                <View style={styles.viewItemIncom}>
                  <Text style={styles.textItemIncom}>Thanh toán:</Text>
                  <Text style={styles.textItemIncom}>
                    Thanh toán khi nhận hàng
                  </Text>
                </View>
                <View style={styles.viewItemIncom}>
                  <Text style={styles.textItemIncom}>Tổng hóa đơn:</Text>
                  <Text style={styles.textItemIncom}>
                    {order.order.totalPaid
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    đ
                  </Text>
                </View>
                <View style={styles.viewItemIncom}>
                  <Text style={styles.textItemIncom}>Thu nhập:</Text>
                  <Text style={styles.textItemIncom}>
                    {order.order.deliveryCost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    đ
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleShipperDecision(order.order._id, 3)}
                style={styles.buttonReceiveOrder}>
                <Text style={styles.textReceiveOrder}>NHẬN ĐƠN</Text>
                <Text style={[styles.textReceiveOrder, {marginStart: 10}]}>
                  {formatTime(countdown)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleConfirm}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibleConfirm(!modalVisibleConfirm);
        }}>
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
            <Text style={styles.textReasonForCancellation}>Lý Do Hủy Đơn</Text>
            <View style={styles.viewContainerTextInputCancelOrder}>
              <TextInput
                style={styles.textInputCancelOrder}
                placeholder="Nhập lý do hủy đơn"
                multiline
              />
            </View>
            <TouchableOpacity
              onPress={handleConfirmCancelOrder}
              style={styles.buttonReceiveCancelOrder}>
              <Text style={styles.textReceiveCancelOrder}>Xác nhận hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {order && modalVisibleCancelOrderFromMerchant && (
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
              {/* <TouchableOpacity
              onPress={() => {
                setModalVisibleCancelOrder(false);
              }}
              style={styles.buttonCloseOrder}>
              <Text style={styles.textXClose}>X</Text>
            </TouchableOpacity> */}
              <Text style={styles.textReasonForCancellation}>
                Nhà hàng hết món
              </Text>
              {/* <View style={styles.viewContainerTextInputCancelOrder}>
              <TextInput
                style={styles.textInputCancelOrder}
                placeholder="Nhập lý do hủy đơn"
                multiline
              />
            </View> */}
              <TouchableOpacity
                onPress={handleConfirmCancelOrder}
                style={styles.buttonReceiveCancelOrder}>
                <Text style={styles.textReceiveCancelOrder}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Goong;
