import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Theo Ngày', value: 1},
  {label: 'Theo Tuần', value: 2},
  {label: 'Theo Tháng', value: 3},
  {label: 'Tùy chọn ngày', value: 4},
];

const DropdownComponent = ({index, setIndex}) => {
  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={index}
        onChange={item => {
          setIndex(item.value)
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    width: 150,
    backgroundColor: '#005987',
    borderRadius: 8,
    padding: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});
