import React, { useContext, useEffect, useState } from 'react';
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
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GetOrderByID, SetStatus } from '../ShipperHTTP';
import axios from 'axios';
import { UpdateShipperInformation } from '../ShipperHTTP';
import { UserContext } from '../../user/UserContext';

const Goong = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [locateCurrent, setLocateCurrent] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);

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
    fetchOrder();
  }, []);

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     try {
  //       const result = await GetOrderByID(id);
  //       setOrder(result.order);
  //       console.log(result);
  //     } catch (error) {
  //       console.error('Error fetching order:', error);
  //     }
  //   };
  //   fetchOrder();
  // }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocateCurrent({
          latitude,
          longitude,
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  useEffect(() => {
    if (locateCurrent && destination) {
      fetchRoute();
    }
  }, [locateCurrent, destination]);

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

      const { routes } = response.data;
      
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

  const decodePolyline = (encoded) => {
    let poly = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      let p = {
        latitude: lat / 1E5,
        longitude: lng / 1E5
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

  const handleShipperDecision = async (id, status) => {
    try {
      setModalVisible(false);
      if (status === 3) {
        await updateOrderStatus(id, 3);
        await UpdateShipperInformation(idUser, 6);
      } else if (status === 5) {
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
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../../assets/delivery-bike.png')}
          style={{ width: 20, height: 20 }}
        />
        <Text>Vị trí tôi</Text>
      </View>
    );
  };

  const searchPlaces = async () => {
    console.log(query);
    try {
      const response = await axios.get(`https://rsapi.goong.io/Place/AutoComplete`,{
        params: {
          api_key: GOONG_API_KEY,
          input: query,
          location: '20.981971,105.864323', // Ví dụ: Tọa độ tại Thành phố Hồ Chí Minh
          // radius: 5000, // Bán kính tìm kiếm (đơn vị: mét)
          language: 'vi',
        },
      });
      // console.log(response.data.predictions[0]);
      setPlaces(response.data.predictions);
      // console.log(response);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch places.');
      console.error('Error fetching places:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
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
            anchor={{ x: 0.5, y: 1 }}>
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
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>
      <View style={{ padding: 10 }}>
        <Text>
          Destination:{' '}
          {destination
            ? `${destination.latitude}, ${destination.longitude}`
            : 'Not set'}
        </Text>

        <Button
          title="Set Destination"
          onPress={() =>
            setDestination({ latitude: 10.813112, longitude: 106.668242 })
          }
        />
        {distance && <Text>Distance: {distance}</Text>}
        {duration && <Text>Duration: {duration}</Text>}

        <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={text => setQuery(text)}
        value={query}
        placeholder="Enter search query"
      />
      <Button title="Search Places" onPress={searchPlaces} />
      {places.map(place => (
        <View key={place.place_id} style={{backgroundColor:'red'}}>
          <Text style={{color:'black'}}>{place.description}</Text>
          {/* <Text style={{color:'black'}}>{place.formatted_address}</Text> */}
        </View>
      ))}
      </View>
      {console.log(order)}
      {order && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.centeredView}>
              <Text>{`ID Đơn hàng: ${order._id}`}</Text>
              <View style={styles.viewButtonOrder}>
                <TouchableOpacity
                  onPress={() => handleShipperDecision(order._id, 3)}>
                  <Text>Nhận đơn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleShipperDecision(order._id, 5)}>
                  <Text>Không nhận đơn</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Goong;

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