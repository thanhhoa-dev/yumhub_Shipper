import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { resetpass } from '../UserHTTP';


const ResetPassword = () => {
    const [password, setPassWord] = useState('');
    const handleNext = async () => {
        try {
            if (password === passConfirm) {
                const result = await resetpass(id, password);
                if (result.status) {
                    ToastAndroid.show('doi mat khau thanh cong', ToastAndroid.SHORT);
                    // navigation.navigate('Login');
                }
            } else {
                ToastAndroid.show('mat khau ko trung', ToastAndroid.SHORT);
            }

        } catch (error) {
            console.log('......dong 37', error);
            ToastAndroid.show('login failed', ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.viewContainer}>
            <View>
                <Image style={styles.viewImage} source={require("../../user/image/arrow.png")}></Image>
            </View>
            <View style={styles.viewText}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Nhập mật khẩu mới</Text>
            </View>
            <View style={styles.viewInput}>
                <TextInput
                    style={styles.passInput}
                    value={password}
                    onChangeText={setPassWord}
                    placeholder='Password'
                    secureTextEntry={false}></TextInput>
            </View>

            <TouchableOpacity onPress={handleNext} style={styles.viewBorder}>
                <Text style={{ width: 340, fontSize: 18, fontWeight: '400', color: 'grey', textAlign: 'center', }}>Xong</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    viewBorder: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#BBBBBB',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        marginStart: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    passInput: {
        marginTop: 4,
        width: "80%",
        height: 48,
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#4E4B66',
        backgroundColor: '#fff',
        marginStart: 20,
    },
    viewInput: {
        flexDirection: 'row',
        marginStart: 10,
        marginTop: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        width: '13%',
        borderRadius: 15,
        height: 60,
        marginEnd: 10,
        textAlign: 'center'
    },
    viewText: {
        marginTop: 30,
        marginStart: 10,
    },
    viewImage: {
        marginTop: 20,
        marginStart: 10,
    }
});

export default ResetPassword;
