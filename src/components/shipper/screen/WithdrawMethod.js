import {
    View, Text, ScrollView,
    TouchableOpacity, Image,
    TextInput,
    Alert, TouchableWithoutFeedback,
    Modal
} from 'react-native'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { styles } from '../styles/TopUpPaymentMethodStyle'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { FontWeight } from '../../../constants/theme';
import { Withdraw } from '../ShipperHTTP';
import { forgotPass, checkotp } from '../../user/UserHTTP';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';
import { UserContext } from '../../user/UserContext';
import { VietQR } from 'vietqr';
import { Dropdown } from 'react-native-element-dropdown';
import { withdrawShipper } from './Transaction';
import AlertCustom from '../../../constants/AlertCustom';

const WithdrawPaymentMethod = () => {

    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const [formattedValue, setFormattedValue] = useState('');
    const [numericValue, setNumericValue] = useState('');
    const [confirm, setconfirm] = useState(1)
    const [methodSelect, setmethodSelect] = useState(null)
    const [listBank, setlistBank] = useState(null)
    const [numberBank, setnumberBank] = useState('')
    const [name, setname] = useState('DOAN THANH HOA')
    const [isShowAlert, setisShowAlert] = useState(false)
    const [optionAlert, setoptionAlert] = useState({})

    const [otp_1, setOTP1] = useState('');
    const [otp_2, setOTP2] = useState('');
    const [otp_3, setOTP3] = useState('');
    const [otp_4, setOTP4] = useState('');

    const otp1Ref = useRef(null);
    const otp2Ref = useRef(null);
    const otp3Ref = useRef(null);
    const otp4Ref = useRef(null);

    const [countDownTime, setcountDownTime] = useState(0)

    useEffect(() => {
        if (countDownTime > 0) {
            const timer = setTimeout(() => setcountDownTime(countDownTime - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countDownTime]);

    useEffect(() => {
        let vietQR = new VietQR({
            clientID: 'client_id_here',
            apiKey: 'api_key_here',
        });

        // list banks are supported create QR code by Vietqr
        vietQR.getBanks().then((banks) => {
            const formattedBanks = banks.data.map(bank => ({
                label: "(" + bank.code + ") " + bank.shortName,
                name: bank.shortName,
                logo: bank.logo,
                value: bank.bin,
            }));
            setlistBank(formattedBanks);
        }).catch((err) => { });
    }, []);
    const formatCurrency = (numericValue) => {
        // Định dạng theo kiểu tiền tệ VNĐ
        if (numericValue) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(numericValue);
        }
        return '';
    };
    const formatCurrency2 = (amount) => {
        if (amount == undefined || amount.length == 0) return '0 ₫'
        const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        return formattedAmount.replace('₫', '') + ' ₫';
    };

    const handleChangeText = (text) => {
        let numericValue = text.replace(/\D/g, '');
        setNumericValue(numericValue);

        // Định dạng giá trị tiền tệ
        const formattedValue = formatCurrency(numericValue);
        setFormattedValue(formattedValue);
    };

    const step2 = () => {
        if (numericValue == '' || numericValue == 0)
            Alert.alert("Nhập số tiền muốn nạp")
        else if (user.checkAccount.balance - numericValue < 200000) {
            Alert.alert("số dư còn lại tối thiểu 200000");
        }
        else if (numericValue > 999 && numericValue < 50000000) {
            setconfirm(2)
            Keyboard.dismiss();

        } else
            Alert.alert("Nạp tối thiểu 50.000 và không quá 50 triệu")
    }

    const getNameBank = () => {
        if (listBank) {
            const bank = listBank.find(bank => bank.value === methodSelect);
            return bank ? bank.name + " " + bank.logo : 'banking';
        }
        else return 'banking'
    };



    const sendOTP = async () => {
        setconfirm(3)
        try {
            const sendOTPEmail = await forgotPass("pr0h0afccf@gmail.com");
            //    const sendOTPEmail = await forgotPass(user.checkAccount.email);
            if (sendOTPEmail.result) {
                Alert.alert(sendOTPEmail.message);
                setcountDownTime(60);
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Lỗi", "thử lại sau");
        }
    }
    const sendOTPAgain = async () => {
        if (countDownTime == 0) {
            try {
                //    const sendOTPEmail = await forgotPass(user.checkAccount.email);
                const sendOTPEmail = await forgotPass("pr0h0afccf@gmail.com");
                if (sendOTPEmail.result) {
                    Alert.alert(sendOTPEmail.message);
                    setcountDownTime(60);
                }
            } catch (error) {
                console.log(error);
                Alert.alert("Lỗi", "thử lại sau");
            }
        } else {
            Alert.alert("Lỗi", "Thao tác quá nhanh");
        }
    }
    const checkOTP = async () => {
        try {
            let otp = otp_1 + otp_2 + otp_3 + otp_4;
            const checkOTP = await checkotp("pr0h0afccf@gmail.com", otp);
            if (checkOTP.result) {
                const withdraw = await withdrawShipper(user, "bank", Number(numericValue), getNameBank(), numberBank, name);
                if (withdraw) {
                    setisShowAlert(true)
                    setoptionAlert({
                        title: "Thành công",
                        message: "Thanh toán thành công",
                        type: 1,
                        otherFunction: () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'ShipperTabNavigation' }],
                            });
                            setTimeout(() => {
                                navigation.navigate('Tài khoản');
                            }, 200);
                        }
                    })
                }
            } else {
                setoptionAlert({
                    title: "Lỗi",
                    message: "Sai OTP",
                    type: 3
                })
                setisShowAlert(true)
            }
        } catch (error) {
            setoptionAlert({
                title: "Lỗi",
                message: "thử lại sau",
                type: 3
            })
            setisShowAlert(true)
        }
    }

    const handleOTPChange = (otp, setOTP, nextRef) => {
        setOTP(otp);
        if (otp && nextRef) {
            nextRef.current.focus();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <ScrollView style={styles.container}>
                <View style={styles.viewBack}>
                    <TouchableOpacity style={styles.viewICBack}
                        onPress={() => {
                            if (confirm == 2) setconfirm(1)
                            else if (confirm == 3) setconfirm(2)
                            else navigation.goBack()
                        }}
                    >
                        <Icon
                            name="chevron-left"
                            size={12}
                            color="#005987"
                            FontWeight={FontWeight.FW700}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>{confirm != 1 ? "Xác nhận giao dịch" : "Rút tiền"}</Text>
                </View>
                <View style={confirm != 1 ? { display: 'none' } : null}>
                    <View style={styles.rowQuickAmount}>
                        <TouchableOpacity
                            style={[styles.itemQuickAmount, numericValue == 200000 ? { backgroundColor: '#FFF9E6' } : { backgroundColor: '#F0F5FA' }]}
                            onPress={() => handleChangeText("200000")}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.quickAmount, numericValue == 200000 ? { color: '#19D6E5' } : { color: '#005987' }]}>200.000</Text>
                                <View style={[styles.icCheck, numericValue == 200000 ? { backgroundColor: '#29D8E4' } : { backgroundColor: '#F0F5FA' }]}>
                                    <Icon
                                        name="check"
                                        size={5}
                                        color={numericValue == 200000 ? 'white' : '#F0F5FA'}
                                        FontWeight={FontWeight.FW700}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.itemQuickAmount, numericValue == 500000 ? { backgroundColor: '#FFF9E6' } : { backgroundColor: '#F0F5FA' }]}
                            onPress={() => handleChangeText("500000")}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.quickAmount, numericValue == 500000 ? { color: '#19D6E5' } : { color: '#005987' }]}>500.000</Text>
                                <View style={[styles.icCheck, numericValue == 500000 ? { backgroundColor: '#29D8E4' } : { backgroundColor: '#F0F5FA' }]}>
                                    <Icon
                                        name="check"
                                        size={5}
                                        color={numericValue == 500000 ? 'white' : '#F0F5FA'}
                                        FontWeight={FontWeight.FW700}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.itemQuickAmount, numericValue == 1000000 ? { backgroundColor: '#FFF9E6' } : { backgroundColor: '#F0F5FA' }]}
                            onPress={() => handleChangeText("1000000")}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.quickAmount, numericValue == 1000000 ? { color: '#19D6E5' } : { color: '#005987' }]}>1.000.000</Text>
                                <View style={[styles.icCheck, numericValue == 1000000 ? { backgroundColor: '#29D8E4' } : { backgroundColor: '#F0F5FA' }]}>
                                    <Icon
                                        name="check"
                                        size={5}
                                        color={numericValue == 1000000 ? 'white' : '#F0F5FA'}
                                        FontWeight={FontWeight.FW700}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewInput}>
                        <TextInput
                            style={styles.input}
                            value={formattedValue}
                            onChangeText={(text) => {
                                if ((text + "₫") !== formattedValue) {
                                    handleChangeText(text)
                                } else {
                                    handleChangeText(text.slice(0, -2))
                                }
                            }}
                            keyboardType="numeric"
                            placeholder="0 VNĐ"
                            maxLength={13}
                        />
                    </View>

                    <View style={styles.rowPaymentMethod}>
                        <Image source={require('../../../assets/dollar.png')} style={styles.icMoney} />
                        <Text style={styles.txtMoney}>Thông tin tài khoản ngân hàng nhận tiền</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => {
                        // if (methodSelect) {
                        //     var data = JSON.stringify({
                        //         bin: methodSelect,
                        //         accountNumber: numberBank
                        //     });
                        //     var config = {
                        //         method: 'post',
                        //         url: 'https://api.vietqr.io/v2/lookup',
                        //         headers: {
                        //             'x-client-id': '649d8eed-d8d6-47c6-a5f3-c3fbebd2e642',
                        //             'x-api-key': 'b10976ce-ea0a-4344-9c9d-6ea845effc63',
                        //             'Content-Type': 'application/json',
                        //         },
                        //         data: data
                        //     };
                        //     axios(config)
                        //         .then(function (response) {
                        //             setname(response.data.data.accountName)
                        //         })
                        //         .catch(function (error) {
                        //             console.log(error);
                        //         });
                        // }
                        Keyboard.dismiss()
                    }}>
                        <View style={styles.containerInputBank}>
                            <View>
                                <Text style={styles.label}>
                                    Ngân hàng
                                </Text>
                                {
                                    listBank && (
                                        <Dropdown
                                            style={styles.viewInput}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            iconStyle={styles.iconStyle}
                                            data={listBank}
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Chọn ngân hàng"
                                            value={methodSelect}
                                            onChange={item => {
                                                setmethodSelect(item.value);
                                            }}
                                        />)
                                }
                            </View>
                            <View>
                                <Text style={styles.label}>
                                    Số tài khoản
                                </Text>
                                <TextInput
                                    keyboardType='numeric'
                                    style={styles.viewInput}
                                    onChangeText={(text) => setnumberBank(text)}
                                >

                                </TextInput>
                            </View>
                            <View>
                                <Text style={styles.label}>
                                    Tên chủ tài khoản
                                </Text>
                                <View

                                    style={styles.viewInput}
                                >
                                    {name && (
                                        <Text style={styles.input}>{name}</Text>
                                    )}
                                </View>
                            </View>
                            {name && (
                                <TouchableOpacity style={styles.btnContinue}
                                    onPress={step2}
                                >
                                    <Text style={styles.txtConfirm}>Tiếp tục</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </TouchableWithoutFeedback>


                </View>
                <View style={confirm != 2 ? { display: 'none' } : null}>
                    <View style={styles.rowConfirmAmount}>
                        <Image source={require('../../../assets/iccash.png')} style={styles.icCash} />
                        <View style={styles.confirmAmount}>
                            <Text style={styles.titleConfirmAmount}>Tổng tiền</Text>
                            <Text style={styles.txtAmount}>{formatCurrency2(numericValue)}</Text>
                        </View>
                    </View>
                    <View style={styles.containerDetail}>
                        <View style={styles.rowDetail}>
                            <Text style={styles.txtDetail}>Số tiền</Text>
                            <Text style={styles.txtDetail}>{formatCurrency2(numericValue)}</Text>
                        </View>
                        <View style={styles.rowDetail}>
                            <Text style={styles.txtDetail}>Tài khoản</Text>
                            <Text style={styles.txtDetail}>{numberBank}</Text>
                        </View>
                        <View style={styles.rowDetail}>
                            <Text style={styles.txtDetail}>Hình thức TT</Text>
                            <Text style={styles.txtDetail}>{getNameBank().split(' ')[0]}</Text>
                        </View>
                        <View style={styles.rowDetail}>
                            <Text style={styles.txtDetail}>Phí giao dịch</Text>
                            <Text style={styles.txtDetail}>miễn phí</Text>
                        </View>
                    </View>

                </View>
                <View style={confirm != 3 ? { display: 'none' } : null}>
                    <View style={styles.viewBody}>
                        <View style={styles.viewHeader}>
                            <Text style={styles.viewTextHeader}>vui lòng nhập Mã OTP</Text>
                            <TouchableOpacity
                                onPress={sendOTPAgain}
                                style={styles.viewSendAgain}
                            >
                                <Text style={styles.txtSendAgain}>Gửi lại</Text>
                                <Text style={styles.txtCountDown}>{countDownTime > 0 ? countDownTime + "s" : null}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewTextInputOTP}>
                            <TextInput
                                ref={otp1Ref}
                                value={otp_1}
                                onChangeText={(otp) => handleOTPChange(otp, setOTP1, otp2Ref)}
                                maxLength={1}
                                style={styles.txtOTP}
                                keyboardType="numeric"
                            />
                            <TextInput
                                ref={otp2Ref}
                                value={otp_2}
                                onChangeText={(otp) => handleOTPChange(otp, setOTP2, otp3Ref)}
                                maxLength={1}
                                style={styles.txtOTP}
                                keyboardType="numeric"
                            />
                            <TextInput
                                ref={otp3Ref}
                                value={otp_3}
                                onChangeText={(otp) => handleOTPChange(otp, setOTP3, otp4Ref)}
                                maxLength={1}
                                style={styles.txtOTP}
                                keyboardType="numeric"
                            />
                            <TextInput
                                ref={otp4Ref}
                                value={otp_4}
                                onChangeText={(otp) => handleOTPChange(otp, setOTP4, null)}
                                maxLength={1}
                                style={styles.txtOTP}
                                keyboardType="numeric"
                            />
                        </View>

                    </View>
                </View>
                {
                    confirm == 2 && (
                        <TouchableOpacity style={[styles.bntConfirm, { marginTop: '35%' }]}
                            onPress={sendOTP}
                        >
                            <Text style={styles.txtConfirm}>Xác nhận</Text>
                        </TouchableOpacity>
                    )
                }
                {
                    confirm == 3 && (
                        <TouchableOpacity onPress={checkOTP} style={[styles.bntConfirm, { marginTop: '100%' }]}>
                            <Text style={styles.txtConfirm}>XÁC THỰC</Text>
                        </TouchableOpacity>
                    )
                }

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isShowAlert}
                    onRequestClose={setisShowAlert}
                >
                    <AlertCustom closeModal={setisShowAlert} option={optionAlert} />
                </Modal>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default WithdrawPaymentMethod