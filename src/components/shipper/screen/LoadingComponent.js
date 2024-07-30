import { useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const LoadingComponent = ({backgroundColorStyle}) => {
  const backgroundColor = backgroundColorStyle || '#FFF';
  return (
    <View style={[styles.viewContainer, {backgroundColor}]}>
      <FastImage
        style={styles.image}
        source={require('../../../assets/LoadingComponent-unscreen.gif')}
        priority={FastImage.priority.normal}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default LoadingComponent;

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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
