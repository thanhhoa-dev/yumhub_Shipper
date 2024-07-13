import React, { useEffect, useState, useContext } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { useStripe, StripeProvider } from '@stripe/stripe-react-native';
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import { topUp } from '../ShipperHTTP'
import { UserContext } from '../../user/UserContext';

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const StripeApp = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { clientSecret, amount, idShipper } = route.params;
  const {user} = useContext(UserContext);

  const paymentSuccess = async () => {
    try {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const des = "nạp tiền lúc: " + formattedDate;
        const updateBalance = await topUp(idShipper, { amountTransantion: amount, description: des });
        if (updateBalance.result) {
            user.checkAccount.balance += amount
            navigation.reset({
                index: 0,
                routes: [{ name: 'ShipperTabNavigation' }],
            });
            setTimeout(() => {
                navigation.navigate('Tài khoản');
            }, 100);
        }
    } catch (error) {
        Alert.alert("Vui lòng liên hệ YumHub yêu cầu nhân viên kiểm tra giao dịch ", paymentLinkRes.orderCode);
    }
}

  useEffect(() => {
    const openPaymentSheet = async () => {
        setLoading(true);
        if (!clientSecret) {
          Alert.alert("Lỗi", "Vui lòng thử lại");
          navigation.goBack();
        }
        setLoading(false);
        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: 'YumHub',
          googlePay: true,
        });
    
        if (!error) {
          const { error: paymentError } = await presentPaymentSheet();
          if (paymentError) {
            Alert.alert(`Lỗi`, "Bạn đã hủy giao dịch");
            navigation.goBack();
          } else {
            Alert.alert('Thành công', 'Giao dịch của bạn đã được xác nhận!');
            paymentSuccess()
          }
        } else {
          Alert.alert(`Error initializing payment sheet: ${error.code}`, error.message);
        }
      };
    openPaymentSheet()
  }, []);



  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        null
      )}
    </View>
  );
};

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51PaYulRsnazNxSTCktHuuoNWsy68FTRjdLVA2JSUgjpUzM9alpEeRbMC04ZWunikpstGMwPcQKIVDVQGsS5WR6LK0041Ws5py9">
      <StripeApp />
    </StripeProvider>
  );
}
