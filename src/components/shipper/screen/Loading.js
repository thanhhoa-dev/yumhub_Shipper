import { useNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const Loading = () => {
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    const backAction = () => {
      if (navigationState.index === 0) {
        Alert.alert(
          'Thoát App',
          'Bạn có chắc chắn muốn thoát khỏi ứng dụng không?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ],
        );
        return true;
      }
      return false; // Để mặc định hành vi quay lại màn hình trước đó nếu có
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigationState]);

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
