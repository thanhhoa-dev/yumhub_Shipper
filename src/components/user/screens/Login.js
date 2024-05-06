import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {useNavigation} from '@react-navigation/native';
import { login } from '../UserHTTP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../UserContext';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext);
  

  const handleLogin = async () =>{
    try {
      const result = await login(phoneNumber, password);
      await AsyncStorage.setItem('token', result.data.token);
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(()=>{
  //   const fetchData = async () =>{
      
  //   }
  // })
  return (
    <View>
      <TouchableOpacity>
      <Text>Login</Text>
      </TouchableOpacity>
      <TextInput placeholder='Nhap so dien thoại'
      value={phoneNumber}
      onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput placeholder='Nhập mật khẩu'
      value={password}
      onChangeText={(text) => setPassword(text)}/>
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})