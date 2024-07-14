import {
    View, Text, ScrollView,
    TouchableOpacity, FlatList, Image,
    TextInput,
    Alert, TouchableWithoutFeedback
} from 'react-native'
import React, { useEffect, useState, useRef, useContext } from 'react'
import { styles } from '../styles/TopUpPaymentMethodStyle'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Color, Size, FontWeight, FontFamily } from '../../../constants/theme';
import { ShowDetail, getReviewOfOrder, Withdraw } from '../ShipperHTTP';
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';
const PayOS = require("@payos/node");
import { UserContext } from '../../user/UserContext';
import { NativeModules, NativeEventEmitter } from 'react-native';
import moment from 'moment';
import CryptoJS from 'crypto-js'
import axios from 'axios';
import { VietQR } from 'vietqr';
import { Dropdown } from 'react-native-element-dropdown';

function generateRandomNumber(length) {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const WithdrawPaymentMethod = () => {

    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const [formattedValue, setFormattedValue] = useState('');
    const [numericValue, setNumericValue] = useState('');
    const [confirm, setconfirm] = useState(false)
    const [methodSelect, setmethodSelect] = useState(null)
    const [listBank, setlistBank] = useState(null)
    const [numberBank, setnumberBank] = useState('')
    const [name, setname] = useState('DOAN THANH HOA')

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
        else if (numericValue > 999 && numericValue < 50000000) {
            setconfirm(!confirm)
            Keyboard.dismiss();
        } else
            Alert.alert("Nạp tối thiểu 50.000 và không quá 50 triệu")
    }
    const getNameBank = () => {
        if (listBank) {
            const bank = listBank.find(bank => bank.value === methodSelect);
            return bank ? bank.name : 'banking';
        }
        else return 'banking'
    };

    const confirmWithdraw = async () => {
        try {
            const currentDate = new Date();
            const formattedDate = formatDate(currentDate);
            const des = "rút tiền lúc: " + formattedDate;
            const updateBalance = await Withdraw(user.checkAccount._id,
                {
                    amountTransantion: numericValue,
                    description: des,
                    infoBank: {
                        bank: getNameBank(),
                        numberBank: numberBank,
                        name: name
                    }
                });
            console.log(updateBalance);
            if (updateBalance.result) {
                user.checkAccount.balance -= numericValue
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'ShipperTabNavigation' }],
                });
                setTimeout(() => {
                    navigation.navigate('Tài khoản');
                }, 100);
            }
        } catch (error) {
            Alert.alert("Vui lòng liên hệ YumHub", "yêu cầu nhân viên kiểm tra giao dịch");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <ScrollView style={styles.container}>
                <View style={styles.viewBack}>
                    <TouchableOpacity style={styles.viewICBack}
                        onPress={() => {
                            if (confirm) setconfirm(!confirm)
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
                    <Text style={styles.textHeader}>{confirm ? "Xác nhận giao dịch" : "Rút tiền"}</Text>
                </View>
                <View style={confirm ? { display: 'none' } : null}>
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
                        //     console.log(data);
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
                        //     console.log(data);
                        //     axios(config)
                        //         .then(function (response) {
                        //             console.log(response.data);
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
                                <TouchableOpacity style={styles.bntContinue}
                                    onPress={step2}
                                >
                                    <Text style={styles.txtConfirm}>Tiếp tục</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </TouchableWithoutFeedback>


                </View>
                <View style={!confirm ? { display: 'none' } : null}>
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
                            <Text style={styles.txtDetail}>{getNameBank()}</Text>
                        </View>
                        <View style={styles.rowDetail}>
                            <Text style={styles.txtDetail}>Phí giao dịch</Text>
                            <Text style={styles.txtDetail}>miễn phí</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.bntConfirm}
                        onPress={() => { confirmWithdraw(); }}
                    >
                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default WithdrawPaymentMethod