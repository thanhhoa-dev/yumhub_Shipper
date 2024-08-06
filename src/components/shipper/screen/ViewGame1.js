import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Immersive } from 'react-native-immersive';

const ViewGame1 = () => {
    const { link } = useRoute().params

    useEffect(() => {
        // Ẩn thanh trạng thái và các thanh điều hướng
        Immersive.on();
        StatusBar.setHidden(true);
    
        // Hiển thị lại các thanh điều hướng khi component bị hủy
        return () => {
          Immersive.off();
          StatusBar.setHidden(false);
        };
      }, []);
  return (
    <WebView
      source={{ uri: link }}
      style={{ flex: 1 }}
    />
  );
};

export default ViewGame1;