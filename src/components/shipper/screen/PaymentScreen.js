import React from 'react';
import { View, Text } from 'react-native';
import VnPayQRCode from './VNPayTest'; // Đường dẫn đến component VnPayQRCode

const PaymentScreen = () => {
  // VNPay URL
  const vnpayUrl = "VPBANK://VPBankApp/forder?orderid=ORDER123456&amount=100000&orderdesc=Payment%20for%20goods";

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Scan the QR Code to make payment:</Text>
      <VnPayQRCode vnpayUrl={vnpayUrl} />
    </View>
  );
};

export default PaymentScreen;
