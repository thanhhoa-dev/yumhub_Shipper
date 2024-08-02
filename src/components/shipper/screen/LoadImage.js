import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

const LoadImage = ({ uri, style = {} }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const defaultImageUri = require('../../../assets/noimg.jpg')
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
    if(uri == null) return typeof defaultImageUri === 'string' ? { uri: defaultImageUri } : defaultImageUri;
    if (error) {
      return typeof defaultImageUri === 'string' ? { uri: defaultImageUri } : defaultImageUri;
    }
    return typeof uri === 'string' ? { uri } : uri;
  };

  return (
    <View style={[styles.container, style]}>
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
      <Image
        source={getImageSource()}
        style={[style, loading && styles.hiddenImage]}
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

export default LoadImage;
