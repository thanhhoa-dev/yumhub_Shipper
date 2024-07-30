import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity, Dimensions, Modal, ScrollView } from 'react-native';
import { resetpass,  } from '../UserHTTP';
import AlertCustom from '../../../constants/AlertCustom';
import { ScreenStack } from 'react-native-screens';

const ResetPassword = (props) => {
    const {width, height} = Dimensions.get('window');
    const { route: { params: { email } } } = props;
    const navigation = props.navigation;
    const [password, setPassWord] = useState('');
    const [passConfirm, setPassWordConfirm] = useState('');
    const [isShowAlert, setisShowAlert] = useState(false);
    const [optionAlert, setoptionAlert] = useState({});

    
    const validate = () => {
        if (password != passConfirm) {
            setoptionAlert({
                title : "Lỗi",
                message : "Mật khẩu không trùng nhau",
                type: 3
            })
            setisShowAlert(true)
            return false;
        }
       
        if (passConfirm.length < 6) {
            setoptionAlert({
                title : "Lỗi",
                message : "Mật khẩu tổi thiểu 6 ký tự",
                type: 3
            })
            setisShowAlert(true)
            return false;
        }
        return true;
    }
    const handleNext = async () => {
        const checkValidate = validate();
        try {
            if (checkValidate) {
                const result = await resetpass(email, password);
                if (result.result) {
                    setoptionAlert({
                        title: "Thành công",
                        message: result.message,
                        type: 1,
                        otherFunction: () => navigation.navigate('Login')
                    })
                    setisShowAlert(true)
                }
            }

        } catch (error) {
            setoptionAlert({
                title: "Lỗi",
                message: result.message,
                type: 3
            })
            setisShowAlert(true)
        }
    };

    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: '#005987', width: width, height: height }}>
                <View style={styles.viewContainer}>
                    <View>
                        <Image style={{ height: 117, width: 117, marginEnd: 30 }} source={require("../../../assets/iconAsset.png")}></Image>
                        <Text style={styles.viewText}>Đổi mật khẩu</Text>

                    </View>
                </View>
                <View style={styles.viewBody}>
                    <View style={styles.viewEmail}>
                        <Text style={styles.viewTextEmail}>Mật khẩu mới</Text>
                    </View>
                    <View style={styles.viewTextInputPassword}>
                        <TextInput
                            value={password}
                            onChangeText={setPassWord}
                            placeholder=""
                            style={styles.viewTextInputEmail}
                            paddingStart={20}
                        />
                    </View>
                    <View style={styles.viewEmail}>
                        <Text style={styles.viewTextEmail}> Nhập lại mật khẩu mới</Text>
                    </View>
                    <View style={styles.viewTextInputPassword}>
                        <TextInput
                            value={passConfirm}
                            onChangeText={setPassWordConfirm}
                            placeholder=""
                            style={styles.viewTextInputEmail}
                            paddingStart={20}
                        />
                    </View>
                    <TouchableOpacity onPress={handleNext} style={styles.viewLogin}>
                        <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>Xác nhận</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isShowAlert}
                        onRequestClose={setisShowAlert}
                    >
                        <AlertCustom closeModal={setisShowAlert} option={optionAlert} />
                    </Modal>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    viewLogin: {
        marginStart: 20,
        marginTop: 31,
        width: "80%",
        height: 62,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#19D6E5',
        justifyContent: 'center',
        marginStart: 40,
    },
    viewForgotPass: {
        marginTop: 25,
        marginStart: 270,
    },
    viewTextInputEmail: {
        width: 327,
        height: 62,
        backgroundColor: '#F0F5FA',
        alignSelf: 'center',
        marginTop: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
    },
    viewTextEmail: {
        fontSize: 13,
        fontWeight: '400',
        color: '#32343E',
        marginStart: 44,
        marginTop: 24,
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
        borderRadius: 25,
    },
    viewContainer: {
        backgroundColor: '#005987',
        width: '100%',
        height: 230,
    }
});

export default ResetPassword;