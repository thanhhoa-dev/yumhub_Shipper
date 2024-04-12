import React from 'react';
import { View, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const VnPayQRCode = ({ vnpayUrl }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <QRCode
        value={vnpayUrl}
        size={200}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

export default VnPayQRCode;
