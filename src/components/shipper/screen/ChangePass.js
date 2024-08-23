import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Modal,
} from 'react-native';
import {changePass} from '../../user/UserHTTP';
import {UserContext} from '../../user/UserContext';
import AlertCustom from '../../../constants/AlertCustom';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';

const ChangePass = ({navigation}) => {
  const [passOld, setPassOld] = useState('');
  const [passNew, setPassNew] = useState('');
  const [passConfirm, setPassWordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const {user} = useContext(UserContext);
  const {setUser} = useContext(UserContext);
  const [isShowAlert, setisShowAlert] = useState(false);
  const [optionAlert, setoptionAlert] = useState({});
  const idUser = user.checkAccount._id;
  const [isLoading, setisLoading] = useState(false);

  const handleChange = async () => {
    if (passNew !== passConfirm) {
      setoptionAlert({
        title: 'Mật khẩu mới không khớp',
        message: '',
        type: 2,
      });
      setisShowAlert(true);
      return;
    }
    if (passNew.length < 4) {
      setoptionAlert({
        title: 'Mật khẩu tối thiểu 4 ký tự',
        message: '',
        type: 2,
      });
      setisShowAlert(true);
      return;
    }
    try {
      setisLoading(true);
      const result = await changePass(idUser, passOld, passNew);
      setisLoading(false);
      if (result.result) {
        setisShowAlert(true);
        setoptionAlert({
          title: 'Thành công',
          message: 'Đã đổi mật khẩu',
          type: 1,
          otherFunction: () => {
            setUser(null);
          },
        });
      } else {
        setoptionAlert({
          title: 'Mật khẩu không đúng',
          message: '',
          type: 3,
        });
        setisShowAlert(true);
      }
    } catch (e) {
      setoptionAlert({
        title: 'Có lỗi xảy ra',
        message: 'thử lại sau',
        type: 3,
      });
      setisShowAlert(true);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#005987'}}>
      <View style={styles.viewContainer}>
        <TouchableOpacity style={styles.viewIconBack} onPress={()=>{navigation.goBack()}}>
          <Image
            source={require('../../../assets/IconBack.png')}></Image>
        </TouchableOpacity>
        <View>
          <Image
            style={{height: 117, width: 117, marginEnd: 30}}
            source={require('../../../assets/iconAsset.png')}></Image>
          <Text style={styles.viewText}>Đổi mật khẩu</Text>
        </View>
      </View>
      <ScrollView style={styles.viewBody}>
        <View style={styles.viewEmail}>
          <Text style={styles.viewTextEmail}>Mật khẩu hiện tại</Text>
        </View>
        <View style={styles.viewTextInputPassword}>
          <TextInput
            secureTextEntry={!showPassword}
            value={passOld}
            onChangeText={setPassOld}
            placeholder=""
            style={styles.viewTextInputEmail}
          />
          {/* <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                        <Image style={styles.eyeIcon} source={require("../../../assets/eye.png")} />
                    </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            style={styles.eyeButton}>
            {showPassword ? (
              <Feather name="eye" size={20} />
            ) : (
              <Feather name="eye-off" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewEmail}>
          <Text style={styles.viewTextEmail}>Mật khẩu mới</Text>
        </View>
        <View style={styles.viewTextInputPassword}>
          <TextInput
            secureTextEntry={!showPassword2}
            value={passNew}
            onChangeText={setPassNew}
            placeholder=""
            style={styles.viewTextInputEmail}
          />
          {/* <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                        <Image style={styles.eyeIcon} source={require("../../../assets/eye.png")} />
                    </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              setShowPassword2(!showPassword2);
            }}
            style={styles.eyeButton}>
            {showPassword2 ? (
              <Feather name="eye" size={20} />
            ) : (
              <Feather name="eye-off" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewEmail}>
          <Text style={styles.viewTextEmail}> Nhập lại mật khẩu mới</Text>
        </View>
        <View style={styles.viewTextInputPassword}>
          <TextInput
            secureTextEntry={!showPassword3}
            value={passConfirm}
            onChangeText={setPassWordConfirm}
            placeholder=""
            style={styles.viewTextInputEmail}
          />
          {/* <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                        <Image style={styles.eyeIcon} source={require("../../../assets/eye.png")} />
                    </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              setShowPassword3(!showPassword3);
            }}
            style={styles.eyeButton}>
            {showPassword3 ? (
              <Feather name="eye" size={20} />
            ) : (
              <Feather name="eye-off" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleChange} style={styles.viewLogin}>
          <Text style={{color: '#333', fontSize: 14, fontWeight: '700'}}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowAlert}
        onRequestClose={setisShowAlert}>
        <AlertCustom closeModal={setisShowAlert} option={optionAlert} />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLoading}
        onRequestClose={setisLoading}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            style={{width: 200, height: 200}}
            source={require('../../../assets/loading3dot-unscreen.gif')}
            priority={FastImage.priority.normal}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  viewIconBack: {
    position: 'absolute',
    top: 40,
    left: 24,
    zIndex: 100,
  },
  viewTextInputPassword: {
    width: 327,
    height: 62,
    backgroundColor: '#F0F5FA',
    alignSelf: 'center',
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  viewLogin: {
    marginTop: 70,
    width: 327,
    height: 62,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#19D6E5',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewForgotPass: {
    marginTop: 25,
    marginStart: 270,
  },
  viewTextInputEmail: {
    flex: 1,
  },
  eyeButton: {
    // position: 'absolute',
    // right: 15,
    // top: '50%',
    // transform: [{ translateY: -12.5 }],
    // zIndex: 1,
    marginStart: 10,
  },
  viewTextEmail: {
    fontSize: 13,
    fontWeight: '400',
    color: '#32343E',
    marginStart: 37,
    marginTop: 24,
    textTransform: 'uppercase',
  },
  viewText2: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    alignSelf: 'center',
    marginTop: 9,
  },
  viewText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    alignSelf: 'center',
    marginTop: 12,
  },
  viewBody: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  viewContainer: {
    backgroundColor: '#005987',
    width: '100%',
    height: 230,
  },
});

export default ChangePass;
