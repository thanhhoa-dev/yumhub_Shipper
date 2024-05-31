import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import { styles } from '../styles/SuccessOrderStyle';

const CancelSuccessOrder = () => {
  const [showStaticImage, setShowStaticImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStaticImage(true);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.viewContainer}>
      {showStaticImage ? (
        <Image
          style={styles.image}
          source={require('../../../assets/CancelSuccess.gif')}
        />
      ) : (
        <FastImage
          style={styles.image}
          source={require('../../../assets/CancelSuccess.gif')}
          priority={FastImage.priority.normal}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
    </View>
  );
};

export default CancelSuccessOrder;

