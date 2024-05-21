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
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {GetOrderByID, SetStatus} from '../ShipperHTTP';
import axios from 'axios';
import {UpdateShipperInformation} from '../ShipperHTTP';
import {UserContext} from '../../user/UserContext';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import { useWindowDimensions } from 'react-native';

const Goong = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [locateCurrent, setLocateCurrent] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [showGestureHandlerRootView, setShowGestureHandlerRootView] = useState(false);

  const [order, setOrder] = useState(null);
  const id = '660c9dc319f26b917ea15837';
  const idUser = '6604e1ec5a6c5ad8711aebfa';
  const GOONG_API_KEY = 'wfCk7bvFrsdfFOxyWEG4KuHEhZNHyuD47VXOzLQm'; // Thay bằng API Key của bạn

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await GetOrderByID(id);
        setOrder(result.order);
      } catch (error) {
        console.log('Error fetching order:', error);
        throw error;
      }
    };
    fetchOrder();
  }, []);

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

  // Tạo tham chiếu cho BottomSheetModal
  const bottomSheetModalRef = useRef(null);

  // Hàm để hiển thị BottomSheet
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const snapPoints = useMemo(() => ['15%','25%', '50%', '70%', '100%'], []);

  return (
    <View style={{flex: 1}}>
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
        {destination && (
          <Marker
            draggable
            coordinate={destination}
            onDragEnd={directions => {
              setDestination(directions.nativeEvent.coordinate);
            }}
          />
        )}
      </MapView>
      
      {/* {order && ( */}
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
                setShowGestureHandlerRootView(true);
                setModalVisibleConfirm(true);
                setModalVisible(false);
              }}
              style={styles.buttonCloseOrder}>
              <Text style={styles.textXClose}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* )} */}
      {showGestureHandlerRootView && (
      <GestureHandlerRootView style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 , display:'flex'}}>
        <BottomSheet index={1} snapPoints={snapPoints}>
          <View style={styles.contentContainerBottomSheet}>
            <Text style={styles.containerHeadline}>
              Awesome Bottom Sheet 🎉
            </Text>
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    )}
    <TouchableOpacity onPress={()=>{setModalVisible(true)}}><Text>Button</Text></TouchableOpacity>
    </View>
  );
};

export default Goong;

const styles = StyleSheet.create({
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
    marginTop: 22,
    backgroundColor: '#F6F8FA',
    borderRadius: 35,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
