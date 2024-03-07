import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={()=>{navigation.navigate('DetailHome')}}>
      <Text>Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home