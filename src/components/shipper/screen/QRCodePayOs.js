import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, PermissionsAndroid, BackHandler, Image, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
const PayOS = require("@payos/node");
import { uploadImage, topUp } from '../ShipperHTTP'
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { FontWeight } from '../../../constants/theme';
import { styles } from '../styles/TopUpPaymentMethodStyle'


const formatCurrency2 = (amount) => {
    if (amount == undefined || amount.length == 0) return '0 ₫'
    const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    return formattedAmount.replace('₫', '') + ' ₫';
};
const QRCodePayOs = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { paymentLinkRes, data } = route.params;
    const viewShotRef = useRef(null);
    const [isChecking, setIsChecking] = useState(false);
    console.log("xxx");

    const cancelPayment = async () => {
        const payOS = new PayOS("d595ed43-ecf6-4f2a-9c9b-c3a0a00aeb5d", "8e8f0123-db64-468d-92cc-68d990a9bd11", "58dbb967ca269e3b2b9f51c3e85a79a1251027b8004910b05ad2b460a7a12bd1");
        const cancelledPaymentLink = await payOS.cancelPaymentLink(paymentLinkRes.orderCode);
        console.log(cancelledPaymentLink);
        if (cancelledPaymentLink.status === "CANCELLED") {
            Alert.alert('đã hủy giao dịch')
            navigation.goBack()
        }
    }

    const captureQRCode = async () => {
        try {
            const uri = await viewShotRef.current.capture();
            await uploadCapturedImage(uri);
        } catch (error) {
            console.error('Capture QR code error:', error);
            Alert.alert('Error', 'Failed to capture QR code.');
        }
    };

    const uploadCapturedImage = async (uri) => {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: uri,
                name: 'qrcode.png',
                type: 'image/png'
            });

            const response = await uploadImage(formData);
            if (response.url) {
                downloadImg(response.url);
            }
        } catch (error) {
            console.error('Upload error:', error);
            Alert.alert('Error', 'Failed to upload QR code.');
        }
    };

    const downloadImg = async (uri) => {
        try {
            const fileName = uri.substring(uri.lastIndexOf('/') + 1);
            const destination = `${RNFS.DownloadDirectoryPath}/${fileName}`;
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'cấp quyền bộ nhớ',
                    message: 'Vui lòng cho phép ứng dụng ghi file vào bộ nhớ thiết bị',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Từ chối quyền!', 'bạn cần cho phép ứng dụng ghi file vào bộ nhớ thiết bị');
                return;
            }

            const { promise } = RNFS.downloadFile({
                fromUrl: uri,
                toFile: destination,
            });

            const result = await promise;
            if (result.statusCode === 200) {
                Alert.alert('Thành công', `File downloaded successfully to ${destination}`);
            } else {
                Alert.alert('Failed', 'Failed to download file');
            }
        } catch (error) {
            console.error('Download error:', error);
            Alert.alert('Error', 'Failed to download file');
        }
    }

    const checkPayment = async () => {
        const payOS = new PayOS("d595ed43-ecf6-4f2a-9c9b-c3a0a00aeb5d", "8e8f0123-db64-468d-92cc-68d990a9bd11", "58dbb967ca269e3b2b9f51c3e85a79a1251027b8004910b05ad2b460a7a12bd1");
        const paymentLink = await payOS.getPaymentLinkInformation(paymentLinkRes.orderCode);
        console.log(paymentLink);
        switch (paymentLink.status) {
            case "PENDING":
                break;
            case "PAID":
                paymentSuccess()
                Alert.alert("giao dịch thành công");
                break;
            case "CANCELLED":
                Alert.alert("giao dịch này đã bị hủy");
                // navigation.goBack()
                break;

            default:
                break;
        }
    }
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    const paymentSuccess = async () => {
        try {
            const currentDate = new Date();
            const formattedDate = formatDate(currentDate);
            const des = "nạp tiền lúc: " + formattedDate;
            const updateBalance = await topUp(data.items[0].idmerchant, { amountTransantion: data.amount, description: des });
            if (updateBalance.result) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MerchantTabNavigation' }],
                });
                setTimeout(() => {
                    navigation.navigate('Tài khoản');
                }, 100);
            }
        } catch (error) {
            Alert.alert("Vui lòng liên hệ YumHub yêu cầu nhân viên kiểm tra giao dịch ", paymentLinkRes.orderCode);
        }
    }
    useEffect(() => {
        // Hàm xử lý khi nhấn nút back
        const handleBackPress = () => {
            Alert.alert(
                'Xác nhận',
                'Bạn có chắc chắn muốn hủy giao dịch?',
                [
                    {
                        text: 'Hủy',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {
                        text: 'Đồng ý',
                        onPress: () => cancelPayment(),
                    },
                ],
                { cancelable: false }
            );
            return true; // Chặn hành vi mặc định
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, []);

    useEffect(() => {
        let intervalId;
        let initialTimeoutId;

        const startSetTimeOut = () => {
            initialTimeoutId = setTimeout(() => {
                setIsChecking(true);
            }, 10000);
        }

        const startChecking = () => {
            intervalId = setInterval(async () => {
                await checkPayment();
            }, 3000);
        };

        if (isChecking) {
            startChecking();
        }
        if (!isChecking)
            startSetTimeOut();

        return () => {
            if (intervalId) clearInterval(intervalId);
            if (initialTimeoutId) clearTimeout(initialTimeoutId);
        };
    }, [isChecking]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.viewBack}>
                <TouchableOpacity style={styles.viewICBack}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Icon
                        name="chevron-left"
                        size={12}
                        color="#005987"
                        FontWeight={FontWeight.FW700}
                    />
                </TouchableOpacity>
                <Text style={styles.textHeader}>{"Xác nhận giao dịch"}</Text>
            </View>
            <View style={styles.rowConfirmAmount}>
                <Image source={require('../../../assets/iccash.png')} style={styles.icCash} />
                <View style={styles.confirmAmount}>
                    <Text style={styles.titleConfirmAmount}>Tổng tiền</Text>
                    <Text style={styles.txtAmount}>{formatCurrency2(paymentLinkRes.amount)}</Text>
                </View>
            </View>
            <View style={styles.containerDetail}>
                <View style={styles.rowDetail}>
                    <Text style={styles.txtDetail}>Số tiền</Text>
                    <Text style={styles.txtDetail}>{formatCurrency2(paymentLinkRes.amount)}</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.txtDetail}>Tài khoản</Text>
                    <Text style={styles.txtDetail}>0337295209</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.txtDetail}>Hình thức TT</Text>
                    <Text style={styles.txtDetail}>QRCode</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.txtDetail}>Phí giao dịch</Text>
                    <Text style={styles.txtDetail}>miễn phí</Text>
                </View>
            </View>
            <ViewShot
                ref={viewShotRef}
                options={{ format: 'jpg', quality: 0.9 }}
                style={styles.viewQR}
            >
                <QRCode
                    value={paymentLinkRes.qrCode}
                    size={200}
                    bgColor="black"
                    fgColor="white"
                />
            </ViewShot>
            <TouchableOpacity style={[styles.bntConfirm, {marginTop : 28, marginBottom : 80}]}
                onPress={captureQRCode}
            >
                <Text style={styles.txtConfirm}>Lưu QR Code</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default QRCodePayOs;
