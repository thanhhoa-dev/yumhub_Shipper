const express = require('express');
const app = express();
const paymentRouter = require('./paymentRouter'); // Import router từ paymentRouter.js

app.use(express.json());

// Sử dụng router
app.use('/payment', paymentRouter);

// Cấu hình các routes khác ở đây nếu cần

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});