import React, { useState } from 'react';
import { View, TextInput,  StyleSheet, Image, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { resetpass } from '../UserHTTP';



const ResetPassword = (props) => {
    const { route: { params: { email } } } = props;
    const navigation = props.navigation;
    const [password, setPassWord] = useState('');
    const [passConfirm, setPassWordConfirm] = useState('');
    const handleNext = async () => {
        try {
            if (password === passConfirm) {
                const result = await resetpass( password,email);
                console.log(result);
                if (result.result) {
                    ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
                    navigation.navigate('Login');
                }
            } else {
                ToastAndroid.show('Mật khẩu không trùng', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log('......dong 21', error);
            ToastAndroid.show('login failed', ToastAndroid.SHORT);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#005987' }}>
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
                    style={styles.viewTextInputEmail}
                    paddingStart={20}
                />
            </View>
            <TouchableOpacity onPress={handleNext} style={styles.viewLogin}>
                <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    </View>
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
