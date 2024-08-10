import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import ImageSize from 'react-native-image-size';

const { width: screenWidth } = Dimensions.get('window');
const MAX_WIDTH_PERCENTAGE = 0.6;

const ImageChat = ({ uri, style = {} }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const defaultImageUri = require('../../../assets/NoImage.jpg')

  useEffect(() => {
    const fetchImageSize = async () => {
      try {
        const { width: imgWidth, height: imgHeight } = await ImageSize.getSize(uri);

        // Tính toán chiều rộng và chiều cao mới của ảnh
        const maxWidth = screenWidth * MAX_WIDTH_PERCENTAGE;
        let finalWidth = imgWidth;
        let finalHeight = imgHeight;

        if (imgWidth > maxWidth) {
          const scaleFactor = maxWidth / imgWidth;
          finalWidth = imgWidth * scaleFactor;
          finalHeight = imgHeight * scaleFactor;
        }

        setImageDimensions({
          width: finalWidth,
          height: finalHeight,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchImageSize();
  }, [uri]);

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
        style={[style, { width: imageDimensions.width, height: imageDimensions.height }]}
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
});

export default ImageChat;
