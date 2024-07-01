import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';

const Loading = () => {
  return (
    <View style={styles.viewContainer}>
      <FastImage
        style={styles.image}
        source={require('../../../assets/tenor.gif')}
        priority={FastImage.priority.normal}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  textSuccessOrder: {
    color: '#005987',
    fontSize: 22,
    fontWeight: '400',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  image: {
    width: 160,
    height: 160,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
