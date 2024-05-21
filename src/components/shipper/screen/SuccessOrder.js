import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';

const SuccessOrder = () => {
  const [showStaticImage, setShowStaticImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStaticImage(true);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.viewContainer}>
      {showStaticImage ? (
        <Image style={styles.image} source={require('../../../assets/successGIF.gif')}/>
      ) : (
        <FastImage
          style={styles.image}
          source={require('../../../assets/successGIF.gif')}
          priority={FastImage.priority.normal}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
      <Text style={styles.textSuccessOrder}>
        Chúc mừng bạn đã hoàn thành chuyến đi !
      </Text>
    </View>
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({
    imageStatic:{},
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
    backgroundColor: '#F5FEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
