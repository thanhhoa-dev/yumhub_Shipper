import React, { useState, useContext } from 'react';
import {
    View, TextInput, StyleSheet, Image, Text,
    TouchableOpacity, ToastAndroid, ScrollView,
    Modal
} from 'react-native';
import { changePass } from '../../user/UserHTTP';
import { UserContext } from '../../user/UserContext';
import AlertCustom from '../../../constants/AlertCustom';
import FastImage from 'react-native-fast-image';


const ChangePass = ({ navigation }) => {
    const [passOld, setPassOld] = useState('');
    const [passNew, setPassNew] = useState('');
    const [passConfirm, setPassWordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { user } = useContext(UserContext)
    const { setUser } = useContext(UserContext);
    const [isShowAlert, setisShowAlert] = useState(false)
    const [optionAlert, setoptionAlert] = useState({})
    const idUser = user.checkAccount._id;
    const [isLoading, setisLoading] = useState(false)


    const handleChange = async () => {
        if (passNew !== passConfirm) {
            setoptionAlert({
                title: 'Mật khẩu mới không khớp',
                message: "",
                type: 2
            })
            setisShowAlert(true)
            return;
        }
        if (passNew.length < 4) {
            setoptionAlert({
                title: 'Mật khẩu tối thiểu 4 ký tự',
                message: "",
                type: 2
            })
            setisShowAlert(true)
            return;
        }
        try {
            setisLoading(true)
            const result = await changePass(idUser, passOld, passNew);
            setisLoading(false)
            if (result.result) {
                setisShowAlert(true)
                setoptionAlert({
                    title: 'Thành công',
                    message: "Đã đổi mật khẩu",
                    type: 1,
                    otherFunction : ()=>{setUser(null)}
                })
            } else {
                setoptionAlert({
                    title: 'Mật khẩu không đúng',
                    message: "",
                    type: 3
                })
                setisShowAlert(true)
            }
        } catch (e) {
            setoptionAlert({
                title: 'Có lỗi xảy ra',
                message: "thử lại sau",
                type: 3
            })
            setisShowAlert(true)
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (

        <View style={{ flex: 1, backgroundColor: '#005987' }}>
            <View style={styles.viewContainer}>
                <View>
                    <Image style={{ height: 117, width: 117, marginEnd: 30 }} source={require("../../../assets/iconAsset.png")}></Image>
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
                        paddingStart={20}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                        <Image style={styles.eyeIcon} source={require("../../../assets/eye.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewEmail}>
                    <Text style={styles.viewTextEmail}>Mật khẩu mới</Text>
                </View>
                <View style={styles.viewTextInputPassword}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        value={passNew}
                        onChangeText={setPassNew}
                        placeholder=""
                        style={styles.viewTextInputEmail}
                        paddingStart={20}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                        <Image style={styles.eyeIcon} source={require("../../../assets/eye.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewEmail}>
                    <Text style={styles.viewTextEmail}> Nhập lại mật khẩu mới</Text>
                </View>
                <View style={styles.viewTextInputPassword}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        value={passConfirm}
                        onChangeText={setPassWordConfirm}
                        placeholder=""
                        style={styles.viewTextInputEmail}
                        paddingStart={20}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                        <Image style={styles.eyeIcon} source={require("../../../assets/eye.png")} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleChange} style={styles.viewLogin}>
                    <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>Xác nhận</Text>
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
    )
};

const styles = StyleSheet.create({
    viewTextInputPassword: {
        width: 327,
        height: 62,
        backgroundColor: '#F0F5FA',
        alignSelf: 'center',
        marginTop: 8,
        borderRadius: 8,
    },
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

    },
    eyeButton: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: -12.5 }],
        zIndex: 1,
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
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    viewContainer: {
        backgroundColor: '#005987',
        width: '100%',
        height: 230,
    }
});

export default ChangePass;