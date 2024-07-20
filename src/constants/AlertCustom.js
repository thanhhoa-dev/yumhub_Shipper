import { StyleSheet, Text, View, Pressable } from 'react-native'
import { TouchableOpacity, Image, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image';

/**
 * type 1 : success
 * type 2 : warning
 * type 3 : error
 * 
 */

const AlertCustom = ({ closeModal, option }) => {
  let uri;
  switch (option.type) {
    default:
    case 1:
      uri = 'https://cdn.dribbble.com/users/251873/screenshots/9289747/13540-sign-for-success-alert.gif'
      break;
    case 2:
      uri = 'https://cdn.pixabay.com/animation/2023/03/19/14/10/14-10-13-121_512.gif'
      break;
    case 3:
      uri = 'https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif'
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
          <FastImage
            style={styles.imgGif}
            source={{
              uri: uri,
            }}
            priority={FastImage.priority.normal}
            resizeMode={FastImage.resizeMode.contain}
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
    width: '90%',
    backgroundColor: "white",
    paddingVertical : 8,
    borderRadius : 35,
    borderWidth : 1,
    borderColor : '#005987'
  },
  imgGif: {
    width: '90%',
    height: 200,
    alignSelf : 'center'
  },
  header : {
    fontSize : 20,
    fontWeight : '700',
    color : 'black',
    textAlign : 'center'
  },
  message : {
    fontSize : 16,
    fontWeight : '700',
    color : 'black',
    textAlign : 'center',
    marginBottom : 10
  }
})