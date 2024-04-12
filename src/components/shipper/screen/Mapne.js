import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location'

const Mapne = () => {
  const [permissionsGranter, setPermissionsGranter] = useState(false);


  useEffect(()=>{
    _getLocationpermission();
  },[])

  async function _getLocationpermission(){
    if(Platform.OS === "android"){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message:
              'Please Allow Location permissions to continue...',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionsGranter(true);
          _getCurrentLocation();
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  function _getCurrentLocation(){
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
  })
  .then(location => {
      console.log('My Current location =>',location);
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
  }


  if(!permissionsGranter){
    return <View><Text>Please Allow Location permissions to continue...</Text></View>
  }

  return (
    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} 
       style={styles.map}
       region={{
         latitude: 10.8231,
         longitude: 106.6297,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
  )
}

export default Mapne

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex:1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });