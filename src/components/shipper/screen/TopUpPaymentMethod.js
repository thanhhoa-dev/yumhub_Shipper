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
import { ShowDetail, getReviewOfOrder } from '../ShipperHTTP';
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';
const PayOS = require("@payos/node");
import { UserContext } from '../../user/UserContext';
import { NativeModules, NativeEventEmitter } from 'react-native';
import moment from 'moment';
import CryptoJS from 'crypto-js'
import axios from 'axios';

function generateRandomNumber(length) {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const TopUpPaymentMethod = () => {

    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const [formattedValue, setFormattedValue] = useState('');
    const [numericValue, setNumericValue] = useState('');
    const [confirm, setconfirm] = useState(false)
    const [methodSelect, setmethodSelect] = useState(null)

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

    const methodZalo = () => {
        if (numericValue == '' || numericValue == 0)
            Alert.alert("Nhập số tiền muốn nạp")
        else if (numericValue > 999 && numericValue < 50000000) {
            setmethodSelect('ZaloPay')
            setconfirm(!confirm)
            Keyboard.dismiss();
        } else
            Alert.alert("Nạp tối thiểu 50.000 và không quá 50 triệu")
    }

    const methodPayOs = () => {
        if (numericValue == '' || numericValue == 0)
            Alert.alert("Nhập số tiền muốn nạp")
        else if (numericValue > 999 && numericValue < 50000000) {
            setmethodSelect('QRCode')
            setconfirm(!confirm)
            Keyboard.dismiss();
        } else
            Alert.alert("Nạp tối thiểu 50.000 và không quá 50 triệu")
    }

    const methodCard = () => {
        if (numericValue == '' || numericValue == 0)
            Alert.alert("Nhập số tiền muốn nạp")
        else if (numericValue > 999 && numericValue < 50000000) {
            setmethodSelect('Card')
            setconfirm(!confirm)
            Keyboard.dismiss();
        } else
            Alert.alert("Nạp tối thiểu 50.000 và không quá 50 triệu")
    }

    /// PayOs 

    const handlePaymentQRCode = async () => {
        const amount = Number(numericValue);
        try {
            const payOS = new PayOS("d595ed43-ecf6-4f2a-9c9b-c3a0a00aeb5d",
                "8e8f0123-db64-468d-92cc-68d990a9bd11",
                "58dbb967ca269e3b2b9f51c3e85a79a1251027b8004910b05ad2b460a7a12bd1");
            let orderCode = Number(generateRandomNumber(15));
            const body = {
                orderCode: orderCode,
                amount: amount,
                description: 'Nộp tiền vào tài khoản',
                items: [{
                    idshipper: user.checkAccount._id,
                    name: user.checkAccount.fullName,
                    quantity: 1,
                    price: amount
                }],
                cancelUrl: 'http://127.0.0.1:5500/src/return.html',
                returnUrl: 'http://127.0.0.1:5500/src/return.html',
                buyerName: user.checkAccount.fullName,
                buyerEmail: user.checkAccount.email,
                buyerPhone: user.checkAccount.phoneNumber
            };
            const paymentLinkRes = await payOS.createPaymentLink(body);
            navigation.navigate("QRCodePayOs", { paymentLinkRes: paymentLinkRes, data: body })
        } catch (error) {
            Alert.alert("đã có lỗi xảy ra, thử lại sau!")
            console.log(error);
        }
    }

    /// visa/mastercard

    const handlePaymentCard = async () => {
        const amount = Number(numericValue);
        const response = await axios.post('https://duantotnghiep-api-a32664265dc1.herokuapp.com/stripe/create-payment-intent', { amount: amount });
        navigation.navigate("PaymentCard", {clientSecret : response.data.clientSecret, amount : amount, idShipper : user.checkAccount._id})
    }

    /// zalopay

    const { PayZaloBridge } = NativeModules;
    const config = {
        app_id: "2554",
        key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
        key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    };
    const embed_data = {};
    const createOrder = {
        app_id: config.app_id,
        app_trans_id: ``, // Translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // Milliseconds
        item: JSON.stringify([{}]),
        embed_data: JSON.stringify(embed_data),
        amount: 5000,
        description: ``,
        bank_code: "zalopayapp",
        mac: ""
    };

    const order = {
        total: 50000,
        listFood: [{}],
        orderId: Math.floor(Math.random() * 1000000), // Thay bằng id của order trong database
        userId: "user1234", // Thay bằng id người dùng
    };
    const convertToEmbed = (order) => {
        const dummy_orderId = Math.floor(Math.random() * 1000000);
        createOrder.app_id = config.app_id;
        createOrder.app_trans_id = `${moment().format('YYMMDD')}_${dummy_orderId}`;
        createOrder.app_user = order.userId;
        createOrder.app_time = Date.now();
        createOrder.item = JSON.stringify(order.listFood);
        createOrder.embed_data = JSON.stringify(embed_data);
        createOrder.amount = order.total;
        createOrder.description = `Yumhub - Payment for the order #${order.orderId}`;
        createOrder.bank_code = "zalopayapp";
        const inputMac = config.app_id + "|" + createOrder.app_trans_id + "|" + order.userId + "|" + order.total + "|" + createOrder.app_time + "|" + createOrder.embed_data + "|" + createOrder.item;
        createOrder.mac = CryptoJS.HmacSHA256(inputMac, config.key1).toString();
    }
    async function handlePaymentZalo() {
        convertToEmbed(order);
        try {
            const response = await axios.post(config.endpoint, null, { params: createOrder });
            if (response.data.return_code === 1) {
                const zpTransToken = response.data.zp_trans_token;
                PayZaloBridge.payOrder(zpTransToken);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (methodSelect && methodSelect == "ZaloPay") {
            const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
            const subscription = payZaloBridgeEmitter.addListener(
                'EventPayZalo',
                (data) => {
                    if (data.returnCode === 1) {
                        OnPaymentZaloSuccess();
                    } else {
                        OnPaymentZaloFail();
                    }
                }
            );
            console.log("Listener for 'EventPayZalo' added");
            return () => {
                console.log("Listener for 'EventPayZalo' removed");
                subscription.remove();

            };
        }
    }, [methodSelect]);

    const OnPaymentZaloSuccess = () => {
        console.log("Thành công");
    };

    const OnPaymentZaloFail = () => {
        console.log("Lỗi");
    };

    /// zalopay

    const goToPaid = () => {
        switch (methodSelect) {
            case "ZaloPay":
                handlePaymentZalo()
                break;
            default:
            case "QRCode":
                handlePaymentQRCode()
                break;
            case "Card":
                handlePaymentCard()
                break;
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
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
                    <Text style={styles.textHeader}>{confirm ? "Xác nhận giao dịch" : "Nạp tiền"}</Text>
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
                        <Text style={styles.txtMoney}>Nguồn tiền</Text>
                    </View>
                    <View style={styles.containerPaymentMethod}>
                        <Text style={styles.txtTitleMethod}>Chọn nguồn tiền</Text>
                        <TouchableOpacity
                            onPress={methodZalo}
                            style={styles.itemPaymentMethod}>
                            <Image source={require('../../../assets/iczalo.png')} style={styles.icItemPayment} />
                            <View style={styles.infoPaymentMethod}>
                                <Text style={styles.nameZalo}>Ví ZaloPay</Text>
                                <Text style={styles.desZalo}>
                                    Nguồn tiền thanh toán sẽ dựa trên thứ tụ được thiết lập trong Tài khoản ZaloPay của bạn.
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={methodPayOs}
                            style={styles.itemPaymentMethod}>
                            <Image source={require('../../../assets/icqrcode.png')} style={styles.icItemPayment} />
                            <View style={styles.infoPaymentMethod}>
                                <Text style={styles.nameZalo}>Nạp bằng app ngân hàng</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={methodCard}
                            style={styles.itemPaymentMethod}>
                            <Image source={require('../../../assets/card.png')} style={styles.icItemPayment} />
                            <View style={styles.infoPaymentMethod}>
                                <Text style={styles.nameZalo}>Nạp bằng Thẻ Visa/MasterCard</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
                            <Text style={styles.txtDetail}>0337295209</Text>
                        </View>
                        <View style={styles.rowDetail}>
                            <Text style={styles.txtDetail}>Hình thức TT</Text>
                            <Text style={styles.txtDetail}>{methodSelect ? methodSelect : ""}</Text>
                        </View>
                        <View style={styles.rowDetail}>
                            <Text style={styles.txtDetail}>Phí giao dịch</Text>
                            <Text style={styles.txtDetail}>miễn phí</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.bntConfirm}
                        onPress={goToPaid}
                    >
                        <Text style={styles.txtConfirm}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default TopUpPaymentMethod