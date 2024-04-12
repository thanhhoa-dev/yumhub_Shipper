import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DirectionsComponent = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  const handleDirections = async () => {
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
      setError(null);
    } catch (error) {
      console.error('Error fetching directions:', error);
      setError(error.message || 'An unknown error occurred');
      setDirections(null);
    }
  };

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
        {origin && <Marker coordinate={{ latitude: origin.lat, longitude: origin.lng }} />}
        {destination && <Marker coordinate={{ latitude: destination.lat, longitude: destination.lng }} />}
      </MapView>
      <View style={{ padding: 10 }}>
        <Text>Origin: {origin ? `${origin.lat}, ${origin.lng}` : 'Not set'}</Text>
        <Text>Destination: {destination ? `${destination.lat}, ${destination.lng}` : 'Not set'}</Text>
        <Button title="Set Origin" onPress={() => setOrigin({ lat: 37.78825, lng: -122.4324 })} />
        <Button title="Set Destination" onPress={() => setDestination({ lat: 37.7749, lng: -122.4194 })} />
        <Button title="Get Directions" onPress={handleDirections} />
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

export default DirectionsComponent;
