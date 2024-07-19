import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AccessLocation = () => {
  const navigation = useNavigation();
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.replace('ShipperTabNavigation');
        } else {
          setPermissionDenied(true);
        }
      } catch (err) {
        console.warn(err);
      }
    };

    fetchLocation();
  }, []);

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
          navigation.replace('ShipperTabNavigation');
        } else {
          setPermissionDenied(true);
          Alert.alert('Bạn cần cấp quyền truy cập vị trí mới có thể sử dụng chức năng app');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  if (!permissionDenied) {
    return null;
  }

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
          <EvilIcons style={styles.iconLocation} name={'location'} size={25} color={'#E46929'} />
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
  iconLocation:{
    position:'absolute', 
    right: '18%'},
  textContenLocation: {
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#646982',
  },
  textLocation: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
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
