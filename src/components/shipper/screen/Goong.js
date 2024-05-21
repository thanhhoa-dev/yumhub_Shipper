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
import {GetOrderByID, SetStatus, ShowDetail, uploadImage} from '../ShipperHTTP';
import axios from 'axios';
import {UpdateShipperInformation} from '../ShipperHTTP';
import {UserContext} from '../../user/UserContext';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const Goong = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
  const [modalVisibleCancelOrder, setModalVisibleCancelOrder] = useState(false);
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
  const [places, setPlaces] = useState([]);
  const [destinationCustomer, setDestinationCustomer] = useState(null);
  const [detailFoodOrder, setDetailFoodOrder] = useState(null);
  const [image, setImage] = useState(null);
  const [index, setIndex] = useState(0);
  const [showNumberPhone, setShowNumberPhone] = useState(false);

  const [order, setOrder] = useState(null);
  const id = '660c9dc319f26b917ea15837';
  const idUser = '6604e1ec5a6c5ad8711aebfa';
  const GOONG_API_KEY = 'wfCk7bvFrsdfFOxyWEG4KuHEhZNHyuD47VXOzLQm'; // Thay bằng API Key của bạn

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await GetOrderByID(id);
        setOrder(result.order);
        if (result.order) {
          await UpdateShipperInformation(idUser, 8);
          setModalVisible(true);
        }
      } catch (error) {
        console.log('Error fetching order:', error);
        throw error;
      }
    };
    if (!order) {
      fetchOrder();
    }
  }, [id, idUser, order]);

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

      // console.log(response.data);
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

      // console.log(response.data);
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
    try {
      await SetStatus(id, status);
      console.log('Cập nhập trạng thái thành công');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const bottomSheetRef = useRef(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

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
          latitude: order.merchantID.latitude,
          longitude: order.merchantID.longitude,
        });
        setQuery(`${order.deliveryAddress}`);
        setModalVisible(false);
        setModalVisibleConfirm(false);
        handlePresentPress();

        await updateOrderStatus(id, 3);
        await UpdateShipperInformation(idUser, 6);
      } else if (status === 5) {
        setModalVisible(false);
        setModalVisibleConfirm(false);
        setOrder(null);
        await updateOrderStatus(id, 5);
        await UpdateShipperInformation(idUser, 7);
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

  const snapPoints = useMemo(() => ['20%', '25%', '50%', '70%', '100%'], []);

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

  const translateX = useRef(new Animated.Value(0)).current;
  const {width} = Dimensions.get('window');

  const handleConfirmCancel = async () => {
    try {
      handleClosePress();
      setIndex(0);
      await updateOrderStatus(id, 5);
      setOrder(null);
      navigation.navigate('SuccessOrder');
      translateX.setValue(0);
      setTimeout(() => {
        navigation.navigate('Goong');
      }, 3000);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleConfirmCancelOrder = async () => {
    try {
      setModalVisibleCancelOrder(false);
      handleClosePress();
      setIndex(0);
      await updateOrderStatus(id, 6);
      setOrder(null);
      navigation.navigate('SuccessOrder');
      translateX.setValue(0);
      setTimeout(() => {
        navigation.navigate('Goong');
      }, 3000);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleUpdateIndex = () => {
    setIndex(prevIndex => {
      const newIndex = (prevIndex + 1) % (items.length + 1);

      switch (newIndex) {
        case 1:
          handleShowDetail();
          break;
        case 2:
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
        if (gestureState.dx >= width * 0.7) {
          handleUpdateIndex();
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
        setImage(result.url);
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
    launchCamera(options, takePhoto);
  }, [takePhoto]);

  const handleCall = phoneNumber => {
    setShowNumberPhone(false);
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
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
              title={`${order.merchantID.name}`}
              coordinate={destination}
              onDragEnd={directions => {
                setDestination(directions.nativeEvent.coordinate);
              }}
            />
          )}
          {destinationCustomer && order && (
            <Marker
              draggable
              title={`${order.customerID.fullName}`}
              coordinate={{
                latitude: destinationCustomer.lat,
                longitude: destinationCustomer.lng,
              }}
            />
          )}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}

          {routeCoordinatesCustomer.length > 0 && (
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
                          {order.merchantID.name}
                        </Text>
                        <Text
                          style={styles.textAddressMerchantBottomSheet}
                          numberOfLines={1}>
                          {order.merchantID.address}
                        </Text>
                        <View style={styles.viewContainerRating}>
                          <StarRating
                            disabled={false}
                            maxStars={1}
                            rating={1}
                            fullStarColor={'orange'}
                            starSize={20}
                          />
                          <Text style={styles.textRatingBottomSheet}>
                            {order.merchantID.rating}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.viewInformationMerchantBottomSheet}>
                      <Image
                        style={styles.imageMerchantBottomSheet}
                        source={{uri: `${order.customerID.avatar}`}}
                      />
                      <View
                        style={
                          styles.viewContainerInformationMerchatBottomSheet
                        }>
                        <Text
                          style={styles.textNameMerchantBottomSheet}
                          numberOfLines={1}>
                          {order.customerID.fullName}
                        </Text>
                        <Text
                          style={styles.textAddressMerchantBottomSheet}
                          numberOfLines={1}>
                          {order.deliveryAddress}
                        </Text>
                        <View style={styles.viewContainerRating}>
                          <StarRating
                            disabled={false}
                            maxStars={1}
                            rating={1}
                            fullStarColor={'orange'}
                            starSize={20}
                          />
                          <Text style={styles.textRatingBottomSheet}>
                            {order.merchantID.rating}
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
                        {order.totalPaid
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </Text>
                    </View>
                    <View style={styles.viewContainerSummaryBottomSheet}>
                      <Text style={styles.textItemSummaryBottmSheet}>
                        Phí giao hàng
                      </Text>
                      <Text style={styles.textItemSummaryBottmSheet}>
                        {order.deliveryCost
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

                  {image && (
                    <View
                      style={{
                        marginHorizontal: 20,
                        height: 190,
                        marginTop: 10,
                      }}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={{uri: image}}
                      />
                    </View>
                  )}

                  {index >= 3 && (
                    <TouchableOpacity
                      onPress={openCamera}
                      style={styles.buttonTakePhotoBottomSheet}>
                      <Text style={styles.textTakePhotoBottomSheet}>
                        Chụp ảnh
                      </Text>
                    </TouchableOpacity>
                  )}
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
                </View>
                <View style={styles.viewContainerCallUserBottomSheet}>
                  {!showNumberPhone && (
                    <View style={styles.viewInformationUserBottomSheet}>
                      {order.customerID.avatar ? (
                        <Image
                          style={{height: 70, width: 70, borderRadius: 50}}
                          source={{uri: `${order.customerID.avatar}`}}
                        />
                      ) : (
                        <Image
                          style={{height: 70, width: 70, borderRadius: 50}}
                          source={require('../../../assets/ZaloPlay.png')}
                        />
                      )}
                      <View style={styles.viewContainerInformationCustomer}>
                        <Text style={styles.textUserBottomSheet}>
                          {order.customerID.fullName}
                        </Text>
                        <View style={styles.viewContainerRating}>
                          <StarRating
                            disabled={false}
                            maxStars={1}
                            rating={1}
                            fullStarColor={'orange'}
                            starSize={20}
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
                        {order.customerID.phoneNumber}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          handleCall(order.customerID.phoneNumber);
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
                    {order.customerID.fullName}
                  </Text>
                </View>
                <Text style={styles.textInformation} numberOfLines={1}>
                  {order.deliveryAddress}
                </Text>
              </View>
              <View style={styles.viewContainerInformation}>
                <View style={styles.viewContainerNameUser}>
                  <Text style={styles.textInformation}>Nhà hàng: </Text>
                  <Text style={styles.textInformation}>
                    {order.merchantID.name}
                  </Text>
                </View>
                <Text style={styles.textInformation} numberOfLines={1}>
                  {order.merchantID.address}
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
                    {order.totalPaid
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    đ
                  </Text>
                </View>
                <View style={styles.viewItemIncom}>
                  <Text style={styles.textItemIncom}>Thu nhập:</Text>
                  <Text style={styles.textItemIncom}>
                    {order.deliveryCost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    đ
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleShipperDecision(order._id, 3)}
                style={styles.buttonReceiveOrder}>
                <Text style={styles.textReceiveOrder}>NHẬN ĐƠN</Text>
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
                onPress={() => handleShipperDecision(order._id, 5)}
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
    </View>
  );
};

export default Goong;

const styles = StyleSheet.create({
  viewContainerBottomSheet: {
    flex: 1,
  },
  textCustomerPhoneNumber: {
    color: '#005987',
    fontSize: 20,
    fontWeight: '600',
  },
  viewContainerInformationCustomer: {
    marginStart: 10,
  },
  textReceiveCancelOrder: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10,
    textAlign: 'center',
  },
  buttonReceiveCancelOrder: {
    borderRadius: 20,
    backgroundColor: '#19D6E5',
    marginHorizontal: 40,
    marginVertical: 35,
  },
  textInputCancelOrder: {
    color: '#32343E',
    fontSize: 14,
    fontWeight: '400',
  },
  viewContainerTextInputCancelOrder: {
    backgroundColor: '#F0F5FA',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 15,
    paddingHorizontal: 10,
    height: 190,
  },
  textReasonForCancellation: {
    color: '#32343E',
    fontSize: 20,
    fontWeight: '700',
    marginStart: 20,
  },
  textTakePhotoBottomSheet: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10,
  },
  buttonTakePhotoBottomSheet: {
    backgroundColor: '#19D6E5',
    borderRadius: 15,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textListFoodBottomSheet: {
    color: '#32343E',
    fontSize: 20,
    fontWeight: '400',
    marginStart: 15,
  },
  textInformationFoodBottomSheet: {
    color: '#32343E',
    fontSize: 16,
    fontWeight: '600',
  },
  viewItemImageFoodBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContainerItemInformationFoodBottomSheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  viewListItemInformationFoodBottomSheet: {
    marginTop: 30,
  },
  textUserBottomSheet: {
    color: '#005987',
    fontSize: 20,
    fontWeight: '700',
  },
  iconMessageBottomSheet: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 50,
    marginEnd: 15,
    borderColor: '#005987',
    borderWidth: 1,
  },
  iconCallBottomSheet: {
    padding: 15,
    backgroundColor: '#005987',
    borderRadius: 50,
    elevation: 15,
    shadowColor: '#19D6E5',
    marginEnd: 15,
  },
  viewContainerIconBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewInformationUserBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContainerCallUserBottomSheet: {
    marginTop: 27,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    marginHorizontal: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 116,
  },
  textArriveRestaurantBottomSheet: {
    color: '#FFF',
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
    zIndex: 1,
  },
  iconRightBottomSheet: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    zIndex: 2,
  },
  iconContainer: {zIndex: 2},
  buttonArriveRestaurantBottomSheet: {
    backgroundColor: '#005987',
    borderRadius: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 60,
  },
  viewArriveRestaurantBottomSheet: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  textIncomeBottomSheet: {
    fontWeight: '600',
    fontSize: 20,
  },
  textItemSummaryBottmSheet: {
    color: '#005987',
    fontSize: 16,
    fontWeight: '400',
  },
  viewContainerSummaryBottomSheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  textSummaryBottomSheet: {
    color: '#005987',
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 20,
  },
  viewSummaryBottomSheet: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  viewConnectingWireBottomSheet: {
    height: 25,
    borderStartWidth: 1.5,
    width: 0,
    marginStart: 10,
    borderStartColor: '#646982',
  },
  IconStepsLoadDeliveryBottomSheet: {
    backgroundColor: '#BFBCBA',
    borderRadius: 15,
    padding: 4,
  },
  textStepsDelivery: {
    paddingStart: 15,
    color: '#646982',
    fontSize: 13,
    fontWeight: '400',
  },
  viewStepsDeliveryBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 25,
  },
  viewContainerStepsDeliveryBottomSheet: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  textWishBottomSheet: {
    color: '#646982',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
  textNumberDistanceBottomSheet: {
    color: '#005987',
    fontSize: 30,
    fontWeight: '800',
  },
  viewTotalDistance: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageMerchantBottomSheet: {
    height: 90,
    width: 90,
    borderRadius: 10,
  },
  textRatingBottomSheet: {
    color: '#005987',
    fontSize: 16,
    fontWeight: '700',
    paddingStart: 10,
  },
  viewContainerRating: {
    flexDirection: 'row',
    marginTop: 15,
  },
  textAddressMerchantBottomSheet: {
    color: '#646982',
    fontSize: 14,
    fontWeight: '400',
  },
  textNameMerchantBottomSheet: {
    color: '#005987',
    fontSize: 18,
    fontWeight: '400',
  },
  viewContainerInformationMerchatBottomSheet: {
    marginStart: 15,
    flex: 1,
  },
  viewInformationMerchantBottomSheet: {
    marginHorizontal: 30,
    paddingTop: 20,
    flexDirection: 'row',
  },
  contentContainerBottmSheet: {
    flex: 1,
    alignItems: 'center',
  },
  contentTitleBottmSheet: {
    fontSize: 24,
  },
  ViewContainerBottmSheet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textConfirmNo: {
    color: '#32343E',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  textConfirmYes: {
    color: '#646982',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  buttonConfirmNo: {
    backgroundColor: '#19D6E5',
  },
  buttonConfirmYes: {
    backgroundColor: '#F5FEFF',
  },
  buttonConfirm: {
    borderRadius: 15,
    width: '40%',
  },
  viewButtonConfirm: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  TextConfirmOrder: {
    color: '#646982',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24 /* 150% */,
  },
  viewContainerConfirm: {
    width: '80%',
    backgroundColor: '#F0F5FA',
    borderRadius: 10,
    padding: 15,
  },
  textXClose: {
    fontSize: 16,
    color: '#000',
  },
  buttonCloseOrder: {
    position: 'absolute',
    right: -10,
    top: -10,
    width: 40,
    height: 40,
    backgroundColor: '#FC6E2A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  textReceiveOrder: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 20,
  },
  buttonReceiveOrder: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#005987',
    backgroundColor: '#19D6E5',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30,
  },
  textItemIncom: {
    color: '#32343E',
    fontSize: 13,
    fontWeight: '400',
  },
  viewItemIncom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
  },
  viewContainerInformationIncom: {
    marginTop: 13,
  },
  textInformation: {
    color: '#32343E',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  viewContainerNameUser: {
    flexDirection: 'row',
  },
  viewContainerInformation: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5FEFF',
    paddingVertical: 14,
  },
  textOrderNew: {
    color: '#005987',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '800',
    paddingBottom: 25,
  },
  viewContainerModalOrder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  viewButtonOrder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  centeredView: {
    width: '85%',
    backgroundColor: '#F6F8FA',
    borderRadius: 35,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
