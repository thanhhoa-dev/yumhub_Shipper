import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert, Dimensions, Modal } from 'react-native';

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../UserHTTP';
import AlertCustom from '../../../constants/AlertCustom';


const Login = (props) => {
    const navigation = useNavigation();
    const { setUser } = useContext(UserContext);
    const [phoneNumber, setPhoneNumber] = useState('0983826756');
    const [password, setPassword] = useState('846710');
    const [showPassword, setShowPassword] = useState(false);
    const [isshowAlert, setisshowAlert] = useState(false)
    const [optionAlert, setoptionAlert] = useState({})

    const handleLogin = async () => {
        try {
            const result = await login(phoneNumber, password);
            // console.log(result);
            if (result.data.token) {
                await AsyncStorage.setItem('token', result.data.token);
                await AsyncStorage.setItem('Username', phoneNumber);
                await AsyncStorage.setItem('Password', password);
                setUser(result.data);
            } else {
                setoptionAlert({
                    title : 'Lỗi đăng nhập',
                    message: result.data.message,
                    type: 3
                })
                setisshowAlert(true)
            }
        } catch (error) {
            setoptionAlert({
                title : 'Lỗi kết nối',
                message: "kiểm tra mạng của bạn",
                type: 3
            })
            setisshowAlert(true)
            console.error(error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy giá trị username và password từ AsyncStorage
                const storedUsername = await AsyncStorage.getItem('Username');
                const storedPassword = await AsyncStorage.getItem('Password');
                // Kiểm tra xem có giá trị hay không trước khi cập nhật
                if (storedUsername !== null) {
                    setPhone(storedUsername);
                }

                if (storedPassword !== null) {
                    setPassword(storedPassword);
                }
            } catch (error) {
                console.error('Lỗi data từ AsyncStorage:', error);
            }
        };
        fetchData();
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.viewContainer}>
                    <View>
                        <Image style={{ height: 117, width: 117, marginEnd: 30 }} source={require("../../../assets/iconAsset.png")}></Image>
                        <Text style={styles.viewText}>Yumhub chào bạn</Text>
                        <Text style={styles.viewText2}>Nhập hoặc tạo tài khoản với vài bước</Text>
                    </View>
                </View>
                <View style={styles.viewBody}>
                    <View style={styles.viewEmail}>
                        <Text style={styles.viewTextEmail}>Số điện thoại</Text>
                    </View>
                    <View style={styles.viewTextInputPassword}>
                        <TextInput
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder="Số điện thoại"
                            style={styles.viewTextInputEmail}
                            paddingStart={20}
                        />
                    </View>
                    <View style={styles.viewEmail}>
                        <Text style={styles.viewTextEmail}>MẬT KHẨU</Text>
                    </View>
                    <View style={styles.viewTextInputEmail}>
                        <TextInput
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Mật khẩu"
                            style={styles.textInputEmail}
                            paddingStart={20}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                            {
                                showPassword
                                    ? <Image style={styles.eyeIcon} source={require("../../../assets/Group.png")} />
                                    : <Image style={styles.eyeIcon} source={require("../../../assets/eye-off.png")} />
                            }
                            
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('ForgotPassword')} style={styles.viewForgotPass}>
                        <Text style={{ color: '#005987' }}>Quên mật khẩu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogin} style={styles.viewLogin}>
                        <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isshowAlert}
                    onRequestClose={setisshowAlert}
                >
                    <AlertCustom closeModal={setisshowAlert} option={optionAlert} />
                </Modal>
            </View>
        </ScrollView>
    )

};

export default Login;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({

    viewTextInputPass: {
        width: 327,
        height: 62,
        borderColor: '#9A9A9A',
        alignSelf: 'center',
        marginTop: 8,
        borderRadius: 8,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 50
    },
    eyeButton: {
        position: 'absolute',
        right: 15,
        top: '60%',
        transform: [{ translateY: -12.5 }],
        zIndex: 1,
    },
    eyeIcon: {
        width: 20,
        height: 14,
        resizeMode: 'contain',
    },
    viewLogin: {
        marginStart: 20,
        marginTop: 31,
        width: "90%",
        height: 62,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#19D6E5',
        justifyContent: 'center',
    },
    viewForgotPass: {
        marginTop: 25,
        alignSelf: 'flex-end',
        marginEnd: 20,
    },
    viewTextInputEmail: {
        width: 327,
        height: 62,
        backgroundColor: '#F0F5FA',
        alignSelf: 'center',
        marginTop: 8,
        borderRadius: 8,
        justifyContent: 'center',
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
    },
    container: {
        width: width,
        height: height,
        backgroundColor: '#005987',
    }
});
