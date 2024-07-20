import React, { useEffect, useState, useContext } from 'react';
import { Modal, View, Alert, ActivityIndicator } from 'react-native';
import { useStripe, StripeProvider } from '@stripe/stripe-react-native';
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../user/UserContext';
import { topUpShipper } from './Transaction';
import AlertCustom from '../../../constants/AlertCustom';

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
  const { clientSecret, amount } = route.params;
  const {user} = useContext(UserContext);
  const [isShowAlert, setisShowAlert] = useState(false)
  const [optionAlert, setoptionAlert] = useState({})

  const paymentSuccess = async () => {
    try {
      const updateBalance = await topUpShipper(user, "Visa/Mastercard", amount);
      
      if (updateBalance) {
        setisShowAlert(true)
        setoptionAlert({
          title: "Thành công",
          message: "Thanh toán thành công",
          type: 1,
          otherFunction: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ShipperTabNavigation' }],
            });
            setTimeout(() => {
              navigation.navigate('Tài khoản');
            }, 100);
          }
        })


      } else {
        setoptionAlert({
          title: "Lỗi",
          message: "Thanh toán không thành công",
          type: 3,
          otherFunction: () => {
            navigation.goBack()
          }
        })
        setisShowAlert(true)
      }
    } catch (error) {
      setoptionAlert({
        title: "Lỗi",
        message: "Thanh toán không thành công",
        type: 3,
        otherFunction: () => {
          navigation.goBack()
        }
      })
      setisShowAlert(true)
      console.log(error);
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowAlert}
        onRequestClose={setisShowAlert}
      >
        <AlertCustom closeModal={setisShowAlert} option={optionAlert} />
      </Modal>
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
