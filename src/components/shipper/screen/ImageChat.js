import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import ImageSize from 'react-native-image-size';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const ImageChat = ({ uri, style = {} }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const defaultImageUri = require('../../../assets/NoImage.jpg')

  useEffect(() => {
    const fetchImageSize = async () => {
      try {
        const { width: imgWidth, height: imgHeight } = await ImageSize.getSize(uri);
        let scaleFactor = 1/3;
        if (Math.ceil(imgWidth * scaleFactor) > screenWidth){
            scaleFactor = 1/7
        }if (Math.ceil(imgWidth * scaleFactor) < 100){
            scaleFactor = 1/2
        }
        setImageDimensions({
          width: imgWidth * scaleFactor,
          height: imgHeight * scaleFactor,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchImageSize();
  }, []);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const getImageSource = () => {
    if (error && defaultImageUri) {
      return typeof defaultImageUri === 'string' ? { uri: defaultImageUri } : defaultImageUri;
    }
    return typeof uri === 'string' ? { uri } : uri;
  };

  return (
    <View style={[styles.container, style]}>
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
      <Image
        source={getImageSource()}
        style={[style,{ width: imageDimensions.width, height: imageDimensions.height }]}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
  },
  hiddenImage: {
    width: 0,
    height: 0,
  },
});

export default ImageChat;
