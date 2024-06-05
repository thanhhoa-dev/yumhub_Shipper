import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { changePass } from '../UserHTTP';


const NewPassword = () => {
    const [passNew, setPassWord] = useState('');
    const [passOld, setPassWordOld] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleChangePass = async () => {
        try {
    
            // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp nhau không
            if (passNew !== confirmPassword) {
                Alert.alert('Error', 'New password and confirm password do not match');
                return;
            }

            // Gọi API để kiểm tra mật khẩu cũ và đổi mật khẩu mới
            const result = await changePass(passNew, passOld);

            // Xử lý kết quả từ API
            if (result.data.success) {
                Alert.alert('Success', 'Password changed successfully');
                // Thực hiện các hành động tiếp theo sau khi đổi mật khẩu thành công
            } else {
                Alert.alert('Error', 'Failed to change password');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while changing password');
        }
    };
    return (
        <View style={styles.viewContainer}>
            <View>
                <Image style={styles.viewImage} source={require("../../../assets/arrow.png")}></Image>
            </View>
            <View style={styles.viewText}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Đổi mật khẩu</Text>
            </View>
            <View style={styles.viewInput}>
                <TextInput style={styles.passInput}
                    value={passNew}
                    onChangeText={setPassWord}
                    placeholder='Old Password'
                    secureTextEntry={false}></TextInput>
            </View>

            <View style={styles.viewInput}>
                <TextInput style={styles.passInput}
                    value={passOld}
                    onChangeText={setPassWordOld}
                    placeholder='New Password'
                    secureTextEntry={false}></TextInput>
            </View>

            <View style={styles.viewInput}>
                <TextInput style={styles.passInput}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder='Confirm Password'
                    secureTextEntry={false}></TextInput>
            </View>
            <View>
                <Text style={styles.viewText2}>Bằng việc tiếp tục, Bạn đồng ý với Quy chế sàn TMDT, Hợp đồng vận chuyển của be và be được xử lý giữ liệu cá nhân của mình.</Text>
            </View>
            <TouchableOpacity onPress={handleChangePass} style={styles.viewBorder}>
                <Text style={{ width: 340, fontSize: 18, fontWeight: '400', color: 'grey', textAlign: 'center', }}>Xong</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    passInput: {
        marginTop: 4,
        width: "80%",
        height: 48,
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#4E4B66',
        backgroundColor: '#fff'
      },
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
    viewText2: {
        width: '95%',
        marginStart: 10,
        marginTop: 40,
        fontWeight: '400',
        color: 'black',
        fontSize: 15,
    },
    viewInput: {
        flexDirection: 'row',
        marginStart: 10,
        marginTop: 30,
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

export default NewPassword;
