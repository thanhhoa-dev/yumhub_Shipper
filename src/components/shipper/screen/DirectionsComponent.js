import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Button,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {GetOrderByID, SetStatus} from '../ShipperHTTP';
import MapViewDirections from 'react-native-maps-directions';
import {UpdateShipperInformation} from '../ShipperHTTP';
import { UserContext } from '../../user/UserContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const DirectionsComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [locateCurrent, setLocateCurrent] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const [order, setOrder] = useState(null);
  // const {user} = useContext(UserContext);
  const id = '660c9dc319f26b917ea15837';
  const idUser = '6604e1ec5a6c5ad8711aebfa'

  const fetchOrder = async () => {
    try {
      const result = await GetOrderByID(id);
      setOrder(result.order);
      console.log(result);
      if (result.order) {
        const updateStatusShipper = await UpdateShipperInformation(idUser, 8);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
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

  const updateOrderStatus = async (id, status) => {
    try {
      await SetStatus(id, status);

      console.log('cập nhập trạng thái thành công');
      // Nếu muốn cập nhật lại màn hình sau khi cập nhật trạng thái, có thể gọi fetchOrder(orderId) ở đây
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleShipperDecision = async (id, status) => {
    try {
      setModalVisible(false);
      if (status === 3) {
        await updateOrderStatus(id, 3);
        await UpdateShipperInformation(idUser, 6);

        // fetchOrder(id); // Cập nhật lại đơn hàng sau khi thay đổi trạng thái
      } else if (status === 5) {
        await updateOrderStatus(status, 5);
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
          source={require('../../../assets/delivery-bike.png')} // Đường dẫn của biểu tượng bạn muốn sử dụng
          style={{width: 20, height: 20}} // Chỉnh kích thước cho hình ảnh
        />
        <Text>Vị trí tôi</Text>
      </View>
    );
  };

  const handleSelectPlace = (place) => {
    setDestination({
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    });
  };

  return (
    <View style={{flex: 1}}>
      {/* <View style={{zIndex:1, flex:0.5}}>
      <GooglePlacesAutocomplete
        placeholder="Nhập địa chỉ giao hàng"
        fetchDetails={true}
        onPress={(data, details = null) => {
          handleSelectPlace(details);
        }}
        query={{
          key: 'AIzaSyCRAJhXjISdn1nLa1TwTTFEPjBqKLVXxaw',
          language: 'vi', // language of the results
        }}
        onFail={error => console.log(error)}
      />
      </View> */}

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
              setDestination(directions.nativeEvent.coordinate),
                console.log(destination);
            }}
          />
        )}
        <MapViewDirections
          origin={locateCurrent}
          destination={destination}
          apikey={'AIzaSyCRAJhXjISdn1nLa1TwTTFEPjBqKLVXxaw'}
          strokeWidth={4}
          strokeColor="blue"
          onReady={result => {
            setDistance(result.distance);
            setDuration(result.duration);
          }}
        />
      </MapView>
      <View style={{padding: 10}}>
        <Text>
          Destination:{' '}
          {destination
            ? `${destination.latitude}, ${destination.longitude}`
            : 'Not set'}
        </Text>

        <Button
          title="Set Destination"
          //37.4270, -122.1329 ; 10.813112, 106.668242; latitude: 37.4606, longitude: -122.1410
          onPress={() =>
            setDestination({latitude: 10.813112, longitude: 106.668242})
          }
        />
        {distance && <Text>Distance: {distance}</Text>}
        {duration && <Text>Duration: {duration}</Text>}
      </View>
      {order && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.centeredView}>
              <Text>{`ID Đơn hàng: ${order._id}`}</Text>
              <View style={styles.viewButtonOrder}>
                <TouchableOpacity
                  onPress={() => handleShipperDecision(order._id, 3)}>
                  <Text>Nhận đơn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleShipperDecision(order._id, 5)}>
                  <Text>Không nhập đơn</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DirectionsComponent;

const styles = StyleSheet.create({
  viewButtonOrder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  centeredView: {
    width: '80%',
    height: 200,
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
  },
});
