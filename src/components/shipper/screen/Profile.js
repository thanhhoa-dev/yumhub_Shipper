import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {getAll} from '../ShipperHTTP';
import {UserContext} from '../../user/UserContext';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Nam', value: '1'},
  {label: 'Nữ', value: '2'},
];

const Profile = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const {user} = useContext(UserContext);
  const {setUser} = useContext(UserContext);
  const idUser = user.checkAccount._id;
  // console.log(user);

  const renderLabel = () => {
    if (value || isFocus) {
    }
    return null;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.viewHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{}} source={require('../../../assets/IconBack.png')} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '400',
            color: '#005987',
            marginStart: 20,
            marginTop: 10,
          }}>
          Thông tin cá nhân
        </Text>
      </View>
      <ScrollView>
        <View>
          <View style={{alignSelf: 'center', marginTop: 31}}>
            <Image
              style={styles.viewImage}
              source={require('../../../assets/Donut.png')}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#005987',
                alignSelf: 'center',
                marginTop: 17,
              }}>
              Quản lý
            </Text>
          </View>
          <View style={styles.viewBody}>
            <View>
              <Text style={styles.textContent}>Họ tên</Text>
              <TextInput
                style={styles.viewInput}
                value={user.checkAccount.fullName}
                paddingStart={20}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Email</Text>
              <TextInput
                style={styles.viewInput}
                value={user.checkAccount.email}
                paddingStart={20}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Số điện thoại</Text>
              <TextInput
                style={styles.viewInput}
                value={user.checkAccount.phoneNumber}
                keyboardType="numeric"
                paddingStart={20}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Giới tính</Text>
              {renderLabel()}
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={user.checkAccount.sex === 1 ? 'Nam' : 'Nữ'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Ngày sinh</Text>
              <TextInput
                style={styles.viewInput}
                value={user.checkAccount.birthDay}
                paddingStart={20}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Hãng xe</Text>
              <TextInput
                style={styles.viewInput}
                value={user.checkAccount.modeCode}
                paddingStart={20}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Biển số xe</Text>
              <TextInput
                style={styles.viewInput}
                value={user.checkAccount.brandBike}
                paddingStart={20}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.viewLogin}>
        <Text style={{color: '#FFF', fontSize: 14, fontWeight: '700'}}>
          Cập nhật
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  dropdown: {
    alignSelf: 'center',
    marginTop: 8,
    width: 328,
    height: 56,
    backgroundColor: '#F0F5FA',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  viewLogin: {
    marginStart: 20,
    marginTop: 31,
    width: '80%',
    height: 62,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#19D6E5',
    justifyContent: 'center',
    marginStart: 40,
  },
  textButton: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  viewButton: {
    width: 110,
    height: 37,
    backgroundColor: '#FC6E2A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton2: {
    width: 100,
    height: 37,
    backgroundColor: '#E04444',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInput: {
    width: 328,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#F0F5FA',
    alignSelf: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    color: '#32343E',
    marginStart: 44,
    marginTop: 22,
  },
  viewImage: {
    width: 128,
    height: 128,
  },
  viewHeader: {
    marginTop: 20,
    marginBottom: 15,
    marginStart: 24,
    flexDirection: 'row',
  },
  modalOverlay: {
    width: '100%',
    height: 700,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingStart: 50,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
  },
  modalItem: {
    padding: 1,
  },
  modalItemText: {
    fontSize: 18,
  },
});
