const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const router = express.Router();

router.post('/create_payment_url', async (req, res, next) => {
    try {
        const ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        const tmnCode = '932M5WHU'; // Your Terminal ID / Mã Website
        const secretKey = 'JHKWCCYVIFOZRYTMEJAHUSRWMOUPCDCU'; // Your Secret Key / Chuỗi bí mật tạo checksum
        const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // VNPay payment URL
        const returnUrl = 'https://example.com/payment/callback'; // Your return URL

        const date = new Date();
        const createDate = date.toISOString().replace(/[^0-9]/g, '').slice(0, -3); // Format the date as required

        const orderId = createDate.slice(4); // Extract a part of the date for orderId
        const amount = req.body.amount;
        const orderInfo = req.body.orderDescription;
        const orderType = req.body.orderType;
        const locale = req.body.language || 'vn'; // Default locale if not provided
        const currCode = 'VND';

        const vnp_Params = {
            'vnp_Version': '2.1.0',
            'vnp_Command': 'pay',
            'vnp_TmnCode': tmnCode,
            'vnp_Locale': locale,
            'vnp_CurrCode': currCode,
            'vnp_TxnRef': orderId,
            'vnp_OrderInfo': orderInfo,
            'vnp_OrderType': orderType,
            'vnp_Amount': amount * 100, // Convert to VNPay currency (in cents)
            'vnp_ReturnUrl': returnUrl,
            'vnp_IpAddr': ipAddr,
            'vnp_CreateDate': createDate
        };

        const sortedParams = {};
        Object.keys(vnp_Params).sort().forEach(key => {
            sortedParams[key] = vnp_Params[key];
        });

        const signData = querystring.stringify(sortedParams, { encode: false });
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(new Bufferfer(signData, 'utf-8')).digest('hex');
        sortedParams['vnp_SecureHash'] = signed;

        const vnpQueryString = querystring.stringify(sortedParams, { encode: false });
        const vnpRedirectUrl = vnpUrl + '?' + vnpQueryString;

        res.json(vnpRedirectUrl); // Return the VNPay redirect URL to the client
    } catch (error) {
        console.error('Error generating VNPay payment URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
