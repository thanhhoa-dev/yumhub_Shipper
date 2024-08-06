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
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { getAll, UpdateProfile, uploadImage } from '../ShipperHTTP';
import { UserContext } from '../../user/UserContext';
import { Dropdown } from 'react-native-element-dropdown';
import AlertCustom from '../../../constants/AlertCustom';
import DatePicker from 'react-native-date-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import LoadImage from './LoadImage';
import FastImage from 'react-native-fast-image';

const data = [
  { label: 'Nam', value: 'Male' },
  { label: 'Nữ', value: 'Female' },
];

const Profile = ({ navigation }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const idUser = user.checkAccount._id;
  const [fullName, setFullName] = useState(user.checkAccount.fullName);
  const [email, setemail] = useState(user.checkAccount.email);
  const [phoneNumber, setPhoneNumber] = useState(user.checkAccount.phoneNumber);
  const [gender, setGender] = useState(user.checkAccount.sex);
  const [birthDay, setBirthDay] = useState(user.checkAccount.birthDay);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [optionAlert, setOptionAlert] = useState({});
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [avatar, setavatar] = useState(user.checkAccount.avatar)
  const [isShowGetImgFrom, setisShowGetImgFrom] = useState(false)
  const [isLoading, setisLoading] = useState(false)

  const renderLabel = () => {
    if (value || isFocus) {
    }
    return null;
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };
  const handleDateChange = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    setBirthDay(`${day}/${month}/${year}`);
    setDatePickerVisible(false);
  };

  const takePhoto = useCallback(async response => {
    setisLoading(true)
    setisShowGetImgFrom(false)
    if (response.didCancel) return;
    if (response.errorCode) {
      console.error('ImagePicker Error: ', response.errorCode);
      return;
    }
    if (response.errorMessage) {
      console.error('ImagePicker Error: ', response.errorMessage);
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      const formData = new FormData();
      formData.append('file', {
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      });
      try {
        const result = await uploadImage(formData);
        if (result) {
          setavatar(result.url)
          setisLoading(false)
        } else {
          setOptionAlert({
            title: 'Có lỗi xảy ra',
            message: "Thử lại sau",
            type: 3
          })
          setIsShowAlert(true)
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setOptionAlert({
          title: 'Có lỗi xảy ra',
          message: "Thử lại sau",
          type: 3
        })
        setIsShowAlert(true)
      }
    }
  }, []);

  const openCamera = useCallback(async () => {

    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    launchCamera(options, takePhoto);

  }, [takePhoto]);

  //hiển thị thư viện
  const openLibrary = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchImageLibrary(options, takePhoto);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
          <View style={{ alignSelf: 'center', marginTop: 31 }}>
            <View style={{ alignSelf: 'center', marginTop: 31 }}>
              <LoadImage
                uri={avatar}
                style={styles.viewImage}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#E46929", width: 41, height: 41,
                  justifyContent: 'center', alignItems: 'center',
                  borderRadius: 20, position: 'absolute', right: 0, bottom: 0
                }}
                onPress={() => setisShowGetImgFrom(true)}
              >
                <Icon
                  name="camera-rotate"
                  size={20}
                  color="#005987"
                  FontWeight={"700"}
                />
              </TouchableOpacity>
            </View>
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
                value={fullName}
                paddingStart={20}
                onChangeText={text => setFullName(text)}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Email</Text>
              <TextInput
                style={styles.viewInput}
                value={email}
                onChangeText={text => setemail(text)}
                paddingStart={20}
                editable={false}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Số điện thoại</Text>
              <TextInput
                style={styles.viewInput}
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                keyboardType="numeric"
                paddingStart={20}
                editable={false}
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
                placeholder={gender === 'Male' ? 'Nam' : 'Nữ'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setGender(item.value);
                  setIsFocus(false);
                }}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Ngày sinh</Text>
              <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                <View style={styles.viewInput}>
                  <Text style={styles.birthdayText}>{birthDay}</Text>
                </View>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={datePickerVisible}
                date={parseDate(birthDay)}
                onConfirm={handleDateChange}
                onCancel={() => setDatePickerVisible(false)}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Hãng xe</Text>
              <TextInput
                style={styles.viewInput}
                value={user.checkAccount.modeCode}
                paddingStart={20}
                editable={false}
              />
            </View>

            <View>
              <Text style={styles.textContent}>Biển số xe</Text>
              <TextInput
                style={styles.viewInput}
                value={user.checkAccount.idBike}
                paddingStart={20}
                editable={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.viewLogin}
        onPress={async () => {
          const handleUpdateProfile = await UpdateProfile(idUser, {
            avatar : avatar,
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            birthDay: birthDay,
          });
          if (handleUpdateProfile.result) {
            setUser({ checkAccount: handleUpdateProfile.data })
            setOptionAlert({
              title: 'Thành công',
              message: 'Cập nhật thông tin thành công',
              type: 1,
            });
            setIsShowAlert(true);
          } else {
            setOptionAlert({
              title: 'Lỗi kết nối',
              message: 'kiểm tra mạng của bạn',
              type: 3,
            });
            setIsShowAlert(true);
          }
        }}>
        <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>
          Cập nhật
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isShowGetImgFrom}
        onRequestClose={setisShowGetImgFrom}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', width: "100%", height: "100%", justifyContent: "flex-end" }}>
          <View style={{
            height: 125, width: "100%", backgroundColor: 'white', flexDirection: 'row',
            justifyContent: 'space-around', alignItems: 'center'
          }}>
            <TouchableOpacity style={{
              backgroundColor: '#E46929', width: '40%', height: 62,
              borderRadius: 15, justifyContent: 'center', alignItems: 'center'
            }} onPress={openCamera}>
              <Text style={{ color: '#FFF9E6', fontSize: 12, fontWeight: '700' }}>CHỤP ẢNH</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: '#29D8E4', width: '40%', height: 62,
              justifyContent: 'center', alignItems: 'center', borderRadius: 15
            }} onPress={openLibrary}>
              <Text style={{ color: 'black', fontSize: 12, fontWeight: '700', width: 90, textAlign: 'center' }}>CHỌN ẢNH TỪ THƯ VIỆN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isShowAlert}
        onRequestClose={setIsShowAlert}>
        <AlertCustom closeModal={setIsShowAlert} option={optionAlert} />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLoading}
        onRequestClose={setisLoading}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <FastImage
            style={{ width: 200, height: 200 }}
            source={require('../../../assets/loading3dot-unscreen.gif')}
            priority={FastImage.priority.normal}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </Modal>
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
    borderRadius: 100
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
  birthdayText: {
    color: '#000',
    fontSize: 16,
    lineHeight: 56,
    paddingHorizontal: 20,
    width: '100%'
  }
});
