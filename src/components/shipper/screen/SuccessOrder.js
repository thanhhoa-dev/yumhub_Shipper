import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import { styles } from '../styles/SuccessOrderStyle';

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
        <Image
          style={styles.image}
          source={require('../../../assets/successGIF.gif')}
        />
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

