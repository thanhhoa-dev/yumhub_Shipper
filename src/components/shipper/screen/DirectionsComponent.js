import React, { useEffect, useState } from 'react';
import { View, Button, Text, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'

const ShortestRouteComponent = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState(null);
  const [locateCurrent, setLocateCurrent] = useState(null);


  const CustomMarker = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../../assets/delivery-bike.png')} // Đường dẫn của biểu tượng bạn muốn sử dụng
          style={{ width: 20, height: 20 }} // Chỉnh kích thước cho hình ảnh
        />
        <Text>Your Text</Text>
      </View>
    );
  };


  const handleShortestRoute = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=AIzaSyCRAJhXjISdn1nLa1TwTTFEPjBqKLVXxaw`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch directions');
      }
      const data = await response.json();
      if (data.status !== 'OK') {
        throw new Error(`Google Maps API error: ${data.status}`);
      }
      if (!data.routes || !data.routes.length || !data.routes[0].legs || !data.routes[0].legs.length) {
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
    // Lấy vị trí hiện tại
    Geolocation.getCurrentPosition(position => {
      setLocateCurrent({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  

  // getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       this.setState({
  //         region: {
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //           latitudeDelta: 0.0922,
  //           longitudeDelta: 0.0421,
  //         },
  //       });
  //     },
  //     error => alert(error.message),
  //     { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {origin && <Marker coordinate={{ latitude: origin.lat, longitude: origin.lng }}  anchor={{ x: 0.5, y: 1 }}><CustomMarker /></Marker>}
        {destination && <Marker coordinate={{ latitude: destination.lat, longitude: destination.lng }} />}
        {route && <Polyline coordinates={decodePolyline(route)} strokeWidth={4} strokeColor="blue" />}
      </MapView>
      <View style={{ padding: 10 }}>
        <Text>Origin: {origin ? `${origin.lat}, ${origin.lng}` : 'Not set'}</Text>
        <Text>Destination: {destination ? `${destination.lat}, ${destination.lng}` : 'Not set'}</Text>
        <Button title="Set Origin" onPress={() => setOrigin({ lat: locateCurrent.latitude, lng: locateCurrent.longitude })} />
        <Button title="Set Destination" onPress={() => setDestination({ lat: 37.7749, lng: -122.4194 })} />
        <Button title="Find Shortest Route" onPress={handleShortestRoute} />
        {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
        {directions && (
          <View>
            <Text>Distance: {directions.distance.text}</Text>
            <Text>Duration: {directions.duration.text}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ShortestRouteComponent;

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
