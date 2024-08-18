import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Khách không nhận hàng', value: 1},
  {label: 'Khách bom hàng', value: 2},
  {label: 'Sự cố không muốn', value: 3},
];

const dataMerchant = [
  {label: 'Nhà hàng hết món', value: 1},
  {label: 'Nhà hàng đóng cửa', value: 2},
  {label: 'Sự cố không muốn', value: 3},
];

const DropdownComponentGoong = ({valueCancelOrder, setValueCancelOrder, index}) => {
  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={index === 1 ? dataMerchant : data }
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={valueCancelOrder}
        onChange={item => {
          setValueCancelOrder(item.value)
        }}
      />
    </View>
  );
};

export default DropdownComponentGoong;

const styles = StyleSheet.create({
  dropdown: {
    height: 62,
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    borderWidth:1,
    borderColor:'#333333',
    padding: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333333',
  },
  iconStyle: {
    width: 30,
    height: 30,
    tintColor: '#333333',
  },
});
