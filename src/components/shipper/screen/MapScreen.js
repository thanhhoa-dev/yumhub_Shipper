import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'

class MapScreen extends Component {
  state = {
    region: null,
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.region && (
          <MapView
            style={styles.map}
            region={this.state.region}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
              }}
              title="Vị trí của bạn"
            />
          </MapView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

export default MapScreen;
