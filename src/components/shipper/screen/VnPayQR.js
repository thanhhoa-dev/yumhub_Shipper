import React from 'react';
import { View, Button, Linking } from 'react-native';
import axios from 'axios';
import sha256 from 'js-sha256';
import { HmacSHA512 } from 'crypto-js';

const VNPayQRCode = () => {
    const generatePaymentUrl = async () => {
        try {
            var ipAddr = '192.168.89.148';
    
            // var config = require('config');
            // var dateFormat = require('dateformat');
    
            var tmnCode = '932M5WHU';
            var secretKey = 'JHKWCCYVIFOZRYTMEJAHUSRWMOUPCDCU';
            var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
            var returnUrl = 'https://sandbox.vnpayment.vn/vnpaygw-sit-testing/user/login';
    
            var date = new Date();
    
            var createDate = date;
            var orderId = date;
            var amount = 10000;
            var bankCode = 'NCB';
        
            var orderInfo = 'Payment for order';
            var orderType = 'ORDER';
            var locale = 'VN';
            if (locale === null || locale === '') {
                locale = 'vn';
            }
            var currCode = 'VND';
            var vnp_Params = {};
            vnp_Params['vnp_Version'] = '2.1.0';
            vnp_Params['vnp_Command'] = 'pay';
            vnp_Params['vnp_TmnCode'] = tmnCode;
            // vnp_Params['vnp_Merchant'] = ''
            vnp_Params['vnp_Locale'] = locale;
            vnp_Params['vnp_CurrCode'] = currCode;
            vnp_Params['vnp_TxnRef'] = orderId;
            vnp_Params['vnp_OrderInfo'] = orderInfo;
            vnp_Params['vnp_OrderType'] = orderType;
            vnp_Params['vnp_Amount'] = amount * 100;
            vnp_Params['vnp_ReturnUrl'] = returnUrl;
            vnp_Params['vnp_IpAddr'] = ipAddr;
            vnp_Params['vnp_CreateDate'] = createDate;
            if (bankCode !== null && bankCode !== '') {
                vnp_Params['vnp_BankCode'] = bankCode;
            }
    
            // Sort object by keys
            var sortedParams = Object.keys(vnp_Params).sort().reduce((acc, key) => {
                acc[key] = vnp_Params[key];
                return acc;
            }, {});
    
            var querystring = require('qs');
            var signData = querystring.stringify(sortedParams, { encode: false });
    
            var signed = HmacSHA512(signData, secretKey).toString();
            vnp_Params['vnp_SecureHash'] = signed;
    
            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    
            // Open the payment URL in the browser or a webview
            console.log(vnpUrl);
            Linking.openURL(vnpUrl);
        } catch (error) {
            console.error('Error generating VNPay payment URL:', error);
            // Handle errors
        }
    };

    return (
        <View>
            <Button title="Generate Payment URL" onPress={generatePaymentUrl} />
        </View>
    );
};

export default VNPayQRCode;
