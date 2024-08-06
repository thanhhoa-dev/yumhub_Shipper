import {
    Image, StyleSheet, Text, TextInput,
    TouchableOpacity, View, ToastAndroid, Modal, ScrollView,
    Dimensions
} from 'react-native';
import React, { useState, useRef, useContext } from 'react';
import { checkotp, forgotPass } from '../UserHTTP';
import { UserContext } from '../UserContext';
import AlertCustom from '../../../constants/AlertCustom';
import Loading from '../../shipper/screen/Loading';


const {width , height } = Dimensions.get('window')
const CheckOTP = (props) => {
    const { route: { params: { email } } } = props;
    const navigation = props.navigation;
    const [isLoading, setisLoading] = useState(false)

    const [otp_1, setOTP1] = useState('');
    const [otp_2, setOTP2] = useState('');
    const [otp_3, setOTP3] = useState('');
    const [otp_4, setOTP4] = useState('');
    const otp1Ref = useRef(null);
    const otp2Ref = useRef(null);
    const otp3Ref = useRef(null);
    const otp4Ref = useRef(null);

    const [isShowAlert, setisShowAlert] = useState(false);
    const [optionAlert, setoptionAlert] = useState({});

    const handleNext = async () => {
        setisLoading(true)
        try {
            let total = otp_1 + otp_2 + otp_3 + otp_4;
            const result = await checkotp(email, total);
            setisLoading(false)
            if (result.result) {
                setoptionAlert({
                    title: "Thành công",
                    message: result.message,
                    type: 1,
                    otherFunction: () => navigation.navigate('ResetPassword', { email: email, otp: total })
                })
                setisShowAlert(true)

            } else {
                clearOTPFields();
                setoptionAlert({
                    title: "Lỗi",
                    message: result.message,
                    type: 3
                })
                setisShowAlert(true)
            }
        } catch (error) {
            setisLoading(false)
            clearOTPFields();
            setoptionAlert({
                title: "Lỗi",
                message: result.message,
                type: 3
            })
            setisShowAlert(true)
        }
    };

    const clearOTPFields = () => {
        setOTP1('');
        setOTP2('');
        setOTP3('');
        setOTP4('');
        otp1Ref.current.focus();
    };

    const handleResendOtp = async () => {
        setisLoading(true)
        try {
            const result = await forgotPass(email);
            setisLoading(false)
            setoptionAlert({
                title: "Thành công",
                message: "Kiểm tra email của bạn",
                type: 1
            })
            setisShowAlert(true)
        } catch (error) {
            setisLoading(false)
            setoptionAlert({
                title: "Có lỗi xảy ra",
                message: "Thử lại sau",
                type: 3
            })
            setisShowAlert(true)
        }
    };

    const handleOTPChange = (otp, setOTP, nextRef, prevRef) => {
        if (otp === '') {
            setOTP(otp);
            if (prevRef) {
                prevRef.current.focus();
            }
        } else {
            setOTP(otp);
            if (nextRef) {
                nextRef.current.focus();
            }
        }
    };

    if(isLoading) return <Loading />
    return (
        <ScrollView style={{ flex: 1}}>
            <View style={{ flex: 1, backgroundColor: '#005987', height : height }}>
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
                        <Text style={styles.viewText}>Xác thực</Text>
                        <Text style={styles.viewText2}>Chúng tôi đã gửi mã về email:</Text>
                        <Text style={styles.viewText2}>{email}</Text>
                    </View>
                </View>
                <View style={styles.viewBody}>
                    <View style={{ flexDirection: 'row', marginTop: 24 }}>
                        <Text style={styles.viewTextEmail}>Mã</Text>
                        <TouchableOpacity onPress={handleResendOtp}>
                            <Text style={{ marginStart: 238, fontSize: 14, fontWeight: '400', color: '#32343E' }}>Gửi lại</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewTextInputOTP}>
                        <TextInput
                            ref={otp1Ref}
                            value={otp_1}
                            onChangeText={(otp) => handleOTPChange(otp, setOTP1, otp2Ref, null)}
                            maxLength={1}
                            style={styles.viewTextInputEmail}
                            keyboardType="numeric"
                        />
                        <TextInput
                            ref={otp2Ref}

                            value={otp_2}
                            onChangeText={(otp) => handleOTPChange(otp, setOTP2, otp3Ref, otp1Ref)}
                            maxLength={1}
                            style={styles.viewTextInputEmail}
                            keyboardType="numeric"
                        />
                        <TextInput
                            ref={otp3Ref}

                            value={otp_3}
                            onChangeText={(otp) => handleOTPChange(otp, setOTP3, otp4Ref, otp2Ref)}
                            maxLength={1}
                            style={styles.viewTextInputEmail}
                            keyboardType="numeric"
                        />
                        <TextInput
                            ref={otp4Ref}

                            value={otp_4}
                            onChangeText={(otp) => handleOTPChange(otp, setOTP4, null, otp3Ref)}
                            maxLength={1}
                            style={styles.viewTextInputEmail}
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableOpacity onPress={handleNext} style={styles.viewLogin}>
                        <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>XÁC THỰC</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isShowAlert}
                        onRequestClose={setisShowAlert}
                    >
                        <AlertCustom closeModal={setisShowAlert} option={optionAlert} />
                    </Modal>
                </View>
            </View>
        </ScrollView>
    );
};

export default CheckOTP;

const styles = StyleSheet.create({
    viewLogin: {
        width: "80%",
        height: 62,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#19D6E5',
        justifyContent: 'center',
        position : 'absolute',
        bottom : 50,
        left: '50%',
        transform: [{translateX: -(width*0.8)/2}]
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
        borderWidth: 1,
        borderColor: '#333',
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
        height: height - 230,
        borderTopLeftRadius: 25,
        borderTopRightRadius : 25
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
