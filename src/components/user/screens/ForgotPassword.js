import {
    Image, StyleSheet, Text, TextInput,
    TouchableOpacity, View, ToastAndroid,
    Modal, ScrollView, Dimensions
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { forgotPass } from '../UserHTTP';
import AlertCustom from '../../../constants/AlertCustom';

const {width, height} = Dimensions.get('window');

const ForgotPassword = (props) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [isshowAlert, setisshowAlert] = useState(false)
    const [optionAlert, setoptionAlert] = useState({})
    const handleForgotPass = async () => {
        if (!email) {
            setoptionAlert({
                title: "Lỗi",
                message: "sai định dạng Email",
                type: 2
            })
            setisshowAlert(true)
            return;
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailPattern.test(email)) {
            setoptionAlert({
                title: "Lỗi",
                message: "sai định dạng Email",
                type: 2
            })
            setisshowAlert(true)
            return;
        }
        try {
            // console.log(email);
            const result = await forgotPass(email);
            if (result.result) {
                setoptionAlert({
                    title: "Thành công",
                    message: result.message,
                    type: 1,
                    otherFunction: () => navigation.navigate('Checkotp', { email: email })
                })
                setisshowAlert(true)
            }else{
                console.log(result);
                setoptionAlert({
                    title: "Lỗi",
                    message: result.message,
                    type: 3
                })
                setisshowAlert(true)
            }
        } catch (error) {
            setoptionAlert({
                title: "Lỗi",
                message: "thử lại sau",
                type: 3
            })
            setisshowAlert(true)
        }
    };
    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: '#005987', width: width, height: height }}>
                <View style={styles.viewContainer}>
                    <View>
                        <View style={{ flexDirection: 'column-reverse' }}>
                            <Image style={{ position: 'absolute', top: 0, height: 117, width: 117, marginEnd: 30, zIndex: -100 }} source={require("../../../assets/iconAsset.png")}></Image>
                            <View style={styles.overlay}></View>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ width: 100, height: 100 }}
                            >
                                <View>
                                    <Image style={styles.viewIconBack} source={require("../../../assets/IconBack.png")}></Image>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.viewText}>Quên mật khẩu</Text>
                    </View>
                </View>
                <View style={styles.viewBody}>
                    <View style={styles.viewEmail}>
                        <Text style={styles.viewTextEmail}>EMAIL</Text>
                    </View>
                    <View style={styles.viewTextInputPassword}>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            style={styles.viewTextInputEmail}
                            paddingStart={20}
                        />
                    </View>
                    <TouchableOpacity onPress={handleForgotPass} style={styles.viewLogin}>
                        <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>GỬI MÃ </Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isshowAlert}
                        onRequestClose={setisshowAlert}
                    >
                        <AlertCustom closeModal={setisshowAlert} option={optionAlert} />
                    </Modal>
                </View>
            </View>
        </ScrollView>
    )

};

export default ForgotPassword;

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
    },
    viewIconBack: {
        position: 'absolute',
        top: 40,
        left: 24,
        zIndex: 100
    },
    overlay: {
        backgroundColor: 'rgba(0, 89, 135, 0.9)',
        width: 250,
        height: 250,
        zIndex: 0,
        position: 'absolute',
        top: -133,
        left: -132,
        borderRadius: 125
    }

});
