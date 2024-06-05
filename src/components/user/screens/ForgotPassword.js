import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { forgotPass } from '../UserHTTP';

const ForgotPassword = (props) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleForgotPass = async () => {
        if (!email) {
            ToastAndroid.show('Please enter your email', ToastAndroid.SHORT);
            return;
        }
        try {
            console.log(email);
            const result = await forgotPass(email);
            if ( result.result) {
                navigation.navigate('Checkotp', { email: email })
            }
            console.log('>>>>17', result);
        } catch (error) {
            console.log('......dong 37', error);
            ToastAndroid.show('failed', ToastAndroid.SHORT);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#005987' }}>
            <View style={styles.viewContainer}>
                <View>
                    <Image style={{ height: 117, width: 117, marginEnd: 30 }} source={require("../../../assets/iconAsset.png")}></Image>
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
                        placeholder="   Email"
                        style={styles.viewTextInputEmail}
                        paddingStart={20}
                    />
                </View>
                <TouchableOpacity onPress={handleForgotPass} style={styles.viewLogin}>
                    <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>GỬI MÃ </Text>
                </TouchableOpacity>
            </View>
        </View>
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
