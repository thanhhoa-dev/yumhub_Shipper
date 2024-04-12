import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation'; // Import Geolocation library

const ShipperApp = () => {
  const [customerLocation, setCustomerLocation] = useState({ latitude: 0, longitude: 0 });
  const [shipperLocation, setShipperLocation] = useState({ latitude: 0, longitude: 0 });
  const [distanceRemaining, setDistanceRemaining] = useState(0);

  // Simulate shipper's movement and update shipperLocation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate shipper moving towards customer's location
      const newLatitude = shipperLocation.latitude + 0.0005; // Adjust based on your simulation
      setShipperLocation({ ...shipperLocation, latitude: newLatitude });
      // Calculate distance remaining
      const distance = calculateDistance(shipperLocation, customerLocation);
      setDistanceRemaining(distance);
    }, 5000); // Update shipper's location every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [shipperLocation, customerLocation]);

  // Function to calculate distance between two points (in meters)
  const calculateDistance = (pointA, pointB) => {
    const earthRadius = 6371000; // Radius of the Earth in meters
    const lat1 = pointA.latitude;
    const lon1 = pointA.longitude;
    const lat2 = pointB.latitude;
    const lon2 = pointB.longitude;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  };

  // Function to convert degrees to radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  // Function to share shipper's location and remaining distance with customer
  const shareShipperLocationWithCustomer = () => {
    // Here you would implement your mechanism to share shipper's location and remaining distance with the customer
    console.log('Shipper location shared with customer:', shipperLocation);
    console.log('Distance remaining shared with customer:', distanceRemaining);
  };

  // Function to simulate customer location update
  const updateCustomerLocation = () => {
    // Simulate customer moving to a new location
    const newLatitude = customerLocation.latitude + 0.001; // Adjust based on your simulation
    setCustomerLocation({ ...customerLocation, latitude: newLatitude });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Share Shipper's Location with Customer" onPress={shareShipperLocationWithCustomer} />
      <Button title="Update Customer's Location" onPress={updateCustomerLocation} />
    </View>
  );
};

export default ShipperApp;
