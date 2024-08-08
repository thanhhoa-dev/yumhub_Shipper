import { StyleSheet, Text, View, Pressable } from 'react-native'
import { TouchableOpacity, Image, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image';

/**
 * type 1 : success
 * type 2 : warning
 * type 3 : error
 * option : {
 *    title : string
 *    message : string
 *    type : number
 *    otherFunction? : function
 * }
 */

const AlertCustom = ({ closeModal, option }) => {
  let uri;
  switch (option.type) {
    default:
    case 1:
      uri = 'https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png'
      break;
    case 2:
      uri = 'https://logowik.com/content/uploads/images/warning6444.logowik.com.webp'
      break;
    case 3:
      uri = 'https://cdn-icons-png.flaticon.com/512/5219/5219070.png'
      break;
  }
  setTimeout(() => {
    closeModal(false)
    if(option.otherFunction){
        option.otherFunction()
    }
}, 2000);
  return (
    <View style={styles.containerOverlay}>
      <View style={styles.container}>
          <Text style={styles.header}>{option.title}</Text>
          <Image
            style={styles.imgGif}
            source={{
              uri: uri,
            }}
          />
          <Text style={styles.message}>{option.message}</Text>
      </View>
    </View>
  )
}

export default AlertCustom

const styles = StyleSheet.create({
  containerOverlay: {
    flex: 1,
    alignItems : 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '80%',
    backgroundColor: "white",
    paddingVertical : 3,
    borderRadius : 20,
    borderWidth : 1,
    borderColor : '#005987'
  },
  imgGif: {
    width : 80,
    height : 80,
    alignSelf : 'center',
    marginBottom : 20
  },
  header : {
    marginTop : 30,
    fontSize : 30,
    fontWeight : '700',
    color : 'black',
    textAlign : 'center',
    marginBottom : 50
  },
  message : {
    fontSize : 20,
    fontWeight : '700',
    color : 'black',
    textAlign : 'center',
    marginBottom : 50
  }
})