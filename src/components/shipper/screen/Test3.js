import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Test3 = () => {
  return (
    <View>
      <Text style={styles.test3}>Test3</Text>
      <Text  style={styles.test4}>Test3</Text>
    </View>
  )
}

export default Test3

const styles = StyleSheet.create({
    test3:{fontFamily:'Danfo'},
    test4:{}
})