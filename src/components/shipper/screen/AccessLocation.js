import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AccessLocation = () => {
  const navigation = useNavigation();
  const handleEnableLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate('ShipperTabNavigation');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <View style={styles.containerBackground}>
      <View style={styles.viewLogo}>
        <Image source={require('../../../assets/Logo_location.png')} />
      </View>
      <View>
        <TouchableOpacity
          onPress={handleEnableLocation}
          style={styles.buttonLocation}>
          <Text style={styles.textLocation}>Truy cập vị trí</Text>
          <EvilIcons name={'location'} size={20} color={'#fff'} />
        </TouchableOpacity>
        <Text style={styles.textContenLocation} numberOfLines={2}>
          YUMHUB SẼ TRUY CẬP VỊ TRÍ CỦA BẠN CHỈ KHI BẠN ĐANG SỬ DỤNG ỨNG DỤNG
        </Text>
      </View>
    </View>
  );
};

export default AccessLocation;

const styles = StyleSheet.create({
  textContenLocation: {
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#646982',
  },
  textLocation: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    paddingEnd: 20,
  },
  buttonLocation: {
    backgroundColor: '#19D6E5',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  viewLogo: {
    alignItems: 'center',
    height: '50%',
    justifyContent: 'center',
  },
  containerBackground: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 24,
  },
});
