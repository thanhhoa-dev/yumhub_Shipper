import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, FontWeight, Size} from '../../../constants/theme';

const ModalPaymentMethod = ({
  countdownPaymentMethod,
  setCountdownPaymentMethod,
  countdownTimePaymentMethod,
  setCountdownTimePaymentMethod,
}) => {

    useEffect(() => {
        const timer = setInterval(() => {
          if (countdownTimePaymentMethod > 0) {
            setCountdownTimePaymentMethod(prevCountdown => prevCountdown - 1);
          }
        }, 1000);
    
        return () => clearInterval(timer);
      }, [countdownTimePaymentMethod]);


      const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
      };

  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={countdownPaymentMethod}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setCountdownPaymentMethod(
            !countdownPaymentMethod,
          );
        }}>
        <View style={styles.viewContainerModalOrder}>
          <View style={[styles.centeredView, {backgroundColor: '#F6F8FA'}]}>
            <Text style={styles.textReasonForCancellation}>
              Xin vui lòng đợi 15 phút hãy huỷ
            </Text>
            <TouchableOpacity
              onPress={() => {
                setCountdownPaymentMethod(
                  !countdownPaymentMethod,
                );
              }}
              style={[styles.buttonReceiveCancelOrder, {marginBottom: 10}]}>
              <Text>{formatTime(countdownTimePaymentMethod)}</Text>
              <Text style={styles.textReceiveCancelOrder}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalPaymentMethod;

const styles = StyleSheet.create({
  textReasonForCancellation: {
    color: Color.textBold,
    fontSize: Size.S20,
    fontWeight: FontWeight.FW700,
    marginStart: Size.S20,
    textAlign: 'center',
  },
  textReceiveCancelOrder: {
    color: Color.textBold,
    fontSize: Size.S16,
    fontWeight: FontWeight.FW700,
  },
  buttonReceiveCancelOrder: {
    borderRadius: Size.S12,
    backgroundColor: Color.primary2,
    height: 50,
    marginHorizontal: 40,
    marginVertical: 35,
    borderWidth: 1,
    borderColor: Color.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    width: '90%',
    backgroundColor: '#F6F8FA',
    borderRadius: 35,
    paddingVertical: Size.S20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#29D8E4',
  },
  viewContainerModalOrder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
