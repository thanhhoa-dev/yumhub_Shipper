import React, {useEffect, useState} from 'react';
import {View, Button, Text, Image, Modal, StyleSheet} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {GetOrderByID, SetStatus} from '../ShipperHTTP';

const DirectionsComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState(null);
  const [locateCurrent, setLocateCurrent] = useState(null);

  const [order, setOrder] = useState(null);
  const id = '660c9dc319f26b917ea15837';

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await GetOrderByID(id);
        setOrder(result.order);
        if (result.order) {
          setModalVisible(true)
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
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
        // fetchOrder(id); // Cập nhật lại đơn hàng sau khi thay đổi trạng thái
      } else if (status === 5) {
        await updateOrderStatus(status, 5);
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

  const handleShortestRoute = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=AIzaSyCRAJhXjISdn1nLa1TwTTFEPjBqKLVXxaw`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch directions');
      }
      const data = await response.json();
      if (data.status !== 'OK') {
        throw new Error(`Google Maps API error: ${data.status}`);
      }
      if (
        !data.routes ||
        !data.routes.length ||
        !data.routes[0].legs ||
        !data.routes[0].legs.length
      ) {
        throw new Error('Directions data is incomplete');
      }
      setDirections(data.routes[0].legs[0]);
      setRoute(data.routes[0].overview_polyline.points);
      setError(null);
    } catch (error) {
      console.error('Error fetching directions:', error);
      setError(error.message || 'An unknown error occurred');
      setDirections(null);
      setRoute(null);
    }
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setLocateCurrent({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {origin && (
          <Marker
            coordinate={{latitude: origin.lat, longitude: origin.lng}}
            anchor={{x: 0.5, y: 1}}>
            <CustomMarker />
          </Marker>
        )}
        {destination && (
          <Marker
            coordinate={{latitude: destination.lat, longitude: destination.lng}}
          />
        )}
        {route && (
          <Polyline
            coordinates={decodePolyline(route)}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>
      <View style={{padding: 10}}>
        <Text>
          Origin: {origin ? `${origin.lat}, ${origin.lng}` : 'Not set'}
        </Text>
        <Text>
          Destination:{' '}
          {destination ? `${destination.lat}, ${destination.lng}` : 'Not set'}
        </Text>
        <Button
          title="Set Origin"
          onPress={() => [
            setModalVisible(true),
            setOrigin({
              lat: locateCurrent.latitude,
              lng: locateCurrent.longitude,
            }),
          ]}
        />
        <Button
          title="Set Destination"
          onPress={() => setDestination({lat: 37.7749, lng: -122.4194})}
        />
        <Button title="Find Shortest Route" onPress={handleShortestRoute} />
        {error && <Text style={{color: 'red'}}>Error: {error}</Text>}
        {directions && (
          <View>
            <Text>Distance: {directions.distance.text}</Text>
            <Text>Duration: {directions.duration.text}</Text>
          </View>
        )}
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
                <Button
                  title="Nhận đơn"
                  onPress={() => handleShipperDecision(order._id, 3)}
                />
                <Button
                  title="Không nhận đơn"
                  onPress={() => handleShipperDecision(order._id, 5)}
                />
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

function decodePolyline(encoded) {
  const poly = [];
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
    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    const p = {
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    };
    poly.push(p);
  }
  return poly;
}
