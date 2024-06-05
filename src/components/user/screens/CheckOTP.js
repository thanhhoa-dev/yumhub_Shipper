import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { checkotp } from '../UserHTTP';



const CheckOTP = (props) => {
    const { route: { params: { email } } } = props;
    const navigation = props.navigation;
    const [otp_2, setOTP2] = useState('');
    const [otp_1, setOTP1] = useState('');
    const [otp_3, setOTP3] = useState('');
    const [otp_4, setOTP4] = useState('');
    const [otp, setOTP] = useState('');
   
    const handleNext = async () => {
        try {
            let total = otp_1 + otp_2 + otp_3 + otp_4;
          
            console.log(email);
            const result = await checkotp(email, total);
            
            if (result.result) {
                navigation.navigate('ChangePassword', { email: email, otp: total });
            }
            console.log('>>>>17', result);
        } catch (error) {
            console.log('......dong 37', error);
            ToastAndroid.show(' failed', ToastAndroid.SHORT);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#005987',}}>
            <View style={styles.viewContainer}>
                <View>
                    <Image style={{ height: 117, width: 117, marginEnd: 30 }} source={require("../../../assets/iconAsset.png")}></Image>
                    <Text style={styles.viewText}>Xác thực</Text>
                    <Text style={styles.viewText2}>Chúng tôi đã gửi mã về email:</Text>
                    <Text style={styles.viewText2}>example@gmail.com</Text>
                </View>
            </View>
            <View style={styles.viewBody}>
                <View style={{ flexDirection: 'row', marginTop: 24 }}>
                    <Text style={styles.viewTextEmail}>Mã</Text>
                    <TouchableOpacity>
                        <Text style={{ marginStart: 238, fontSize: 14, fontWeight: '400', color: '#32343E' }}>Gửi lại</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewTextInputOTP}>
                    <TextInput
                        value={otp_1}
                        onChangeText={(e) => setOTP1(e)}
                        maxLength={1}
                        placeholder=""
                        style={styles.viewTextInputEmail}
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={otp_2}
                        onChangeText={(e) => setOTP2(e)}
                        maxLength={1}
                        placeholder=""
                        style={styles.viewTextInputEmail}
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={otp_3}
                        onChangeText={(e) => setOTP3(e)}
                        maxLength={1}
                        placeholder=""
                        style={styles.viewTextInputEmail}
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={otp_4}
                        onChangeText={(e) => setOTP4(e)}
                        maxLength={1}
                        placeholder=""
                        style={styles.viewTextInputEmail}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity onPress={handleNext} style={styles.viewLogin}>
                    <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>XÁC THỰC</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

};

export default CheckOTP;

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
    viewTextInputOTP: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginStart: 20,
    },
    viewTextInputEmail: {
        width: 67,
        height: 67,
        backgroundColor: '#F0F5FA',
        marginEnd: 20,
        marginTop: 8,
        borderRadius: 8,
        textAlign: 'center',

    },
    viewTextEmail: {
        fontSize: 13,
        fontWeight: '400',
        color: '#32343E',
        marginStart: 44,

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
        marginTop: 1,
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
