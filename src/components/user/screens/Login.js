import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { login } from '../UserHTTP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../UserContext';

const Login = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('0983826756');
  const [password, setPassword] = useState('846710');
  const { setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async () => {
    try {
      const result = await login(phoneNumber, password);
      await AsyncStorage.setItem('token', result.data.token);
      setUser(result.data);
      await AsyncStorage.setItem('userPhone', phoneNumber);
      await AsyncStorage.setItem('userPassword', password);
      Alert.alert('Thông tin đã được lưu thành công');
    } catch (e) {
      Alert.alert('Lỗi khi lưu thông tin');
      throw e;
    }
  };

  const loadUserData = async () => {
    try {
      const savedPhone = await AsyncStorage.getItem('userPhone');
      const savedPassword = await AsyncStorage.getItem('userPassword');
      if (savedPhone !== null && savedPassword !== null) {
        setPhoneNumber(savedPhone);
        setPassword(savedPassword);
      }
    } catch (e) {
      Alert.alert('Lỗi khi tải thông tin');
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

  return (
    <View style={{ flex: 1, backgroundColor: '#005987', }}>
      <View style={styles.viewContainer}>
        <View>
          <Image style={{ height: 117, width: 117, marginEnd: 30 }} source={require("../../../assets/iconAsset.png")}></Image>
          <Text style={styles.viewText}>Yumhub chào bạn</Text>
          <Text style={styles.viewText2}>Nhập hoặc tạo tài khoản với vài bước</Text>
        </View>
      </View>
      <View style={styles.viewBody}>
        <View style={styles.viewEmail}>
          <Text style={styles.viewTextEmail}>EMAIL</Text>
        </View>
        <View style={styles.viewTextInputPassword}>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Email"
            style={styles.viewTextInputEmail}
            paddingStart={20}
          />
        </View>
        <View style={styles.viewEmail}>
          <Text style={styles.viewTextEmail}>MẬT KHẨU</Text>
        </View>
        <View style={styles.viewTextInputEmail}>
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            style={styles.viewTextInputEmail}
            paddingStart={20}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
            <Image style={styles.eyeIcon} source={require("../../../assets/eye.png")} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() =>
          navigation.navigate('ForgotPassword')} style={styles.viewForgotPass}>
          <Text style={{ color: '#005987' }}>Quên mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.viewLogin}>
          <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 38, marginStart: 77 }}>
          <View>
            <Text style={{ marginStart: 24, color: '#646982', fontSize: 16, fontWeight: '400' }}>Chưa có tài khoản?</Text>
          </View>
          <TouchableOpacity onPress={() =>
            navigation.navigate('SignUp')}>
            <Text style={{ marginStart: 24, color: '#005987', fontSize: 14, fontWeight: '700' }}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>
        {/* <View>
                <Text style={{ marginTop: 27, color: '#646982', fontSize: 16, fontWeight: '400', textAlign: 'center' }}>Hoặc</Text>
            </View> */}
        {/* <View style={{ flexDirection: 'row', marginTop: 15, alignSelf: 'center' }}>
                <Image style={{ height: 62, width: 62, marginEnd: 30 }} source={require("../../asset/image/iconFB.png")}></Image>
                <Image style={{ height: 62, width: 62 }} source={require("../../asset/image/iconT.png")}></Image>
                <Image style={{ height: 62, width: 62, marginStart: 30 }} source={require("../../asset/image/iconApple.png")}></Image>
            </View> */}
      </View>
    </View>
  )
};

export default Login;

const styles = StyleSheet.create({
  viewTextInputPass: {
    width: 327,
    height: 62,
    borderColor: '#9A9A9A',
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 50
},
eyeButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12.5 }],
    zIndex: 1,
},
eyeIcon: {
    width: 25,
    height: 25,
},
viewLogin: {
    marginStart: 20,
    marginTop: 31,
    width: "90%",
    height: 62,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#19D6E5',
    justifyContent: 'center',
},
viewForgotPass: {
    marginTop: 25,
    marginStart: 270,
},
viewTextInputEmail: {
    width: 327,
    height: 62,
    backgroundColor: '#F0F5FA',
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 8,

},
viewTextEmail: {
    fontSize: 13,
    fontWeight: '400',
    color: '#32343E',
    marginStart: 44,
    marginTop: 24,
},
viewText2: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    alignSelf: 'center',
    marginTop: 9,
},
viewText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
    marginTop: 12,
},
viewBody: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 25,
},
viewContainer: {
    backgroundColor: '#005987',
    width: '100%',
    height: 230,
}

});
