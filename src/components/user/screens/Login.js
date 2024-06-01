import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {login} from '../UserHTTP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../UserContext';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext);
  // Sto;

  // const handleLogin = async () => {
  //   try {
  //     const result = await login(phoneNumber, password);
  //     await AsyncStorage.setItem('token', result.data.token);
  //     setUser(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  return (
    <View>
      <TouchableOpacity>
        <Text>Login</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Nhap so dien thoại"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        placeholder="Nhập mật khẩu"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
