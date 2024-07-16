import { Withdraw, topUp } from '../ShipperHTTP'

var commission = 0.1;  // 10%
const fee = (totalDeliveryFee) => {
    return totalDeliveryFee * commission;
};
const earn = (totalDeliveryFee) => {
    return (totalDeliveryFee * (1 - commission));
}


export const updateBalance = async (user, totalDeliveryFee, type) => {
    try {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const des = "hoàn thành đơn lúc: " + formattedDate;
        if (type == 3){
            const updateBalance = await Withdraw(user.checkAccount._id,
                {
                    amountTransantion: fee(totalDeliveryFee),
                    description: des,
                    status: 4
                });
            if (updateBalance.result) {
                user.checkAccount.balance -= fee(totalDeliveryFee)
            }
        }else{
            const updateBalance = await topUp(user.checkAccount._id, { amountTransantion: earn(totalDeliveryFee), description: des, status : 4 });
            if (updateBalance.result) {
                user.checkAccount.balance += earn(totalDeliveryFee)
            }
        }
        
    } catch (error) {
        Alert.alert("liên hệ YumHub", "yêu cầu nhân viên kiểm tra giao dịch");
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

export const topUpShipper = async (user, navigation, amountTopUp) => {
    try {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const des = "nạp tiền lúc: " + formattedDate;
        const updateBalance = await topUp(user.checkAccount._id, { amountTransantion: amountTopUp, description: des });
        if (updateBalance.result) {
            
            user.checkAccount.balance += amountTopUp
            navigation.reset({
                index: 0,
                routes: [{ name: 'ShipperTabNavigation' }],
            });
            setTimeout(() => {
                navigation.navigate('Tài khoản');
            }, 100);
        }
    } catch (error) {
        console.log(error);
        Alert.alert("liên hệ YumHub", "yêu cầu nhân viên kiểm tra giao dịch");
    }
}
export const withdrawShipper = async (user, navigation, amountWithdraw, nameBank, numberBank, nameHolder) => {
    try {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const des = "rút tiền lúc: " + formattedDate;
        const updateBalance = await Withdraw(user.checkAccount._id,
            {
                amountTransantion: amountWithdraw,
                description: des,
                bank: nameBank,
                numberBank: numberBank,
                name: nameHolder,
                status: 1
            });
        if (updateBalance.result) {
            user.checkAccount.balance -= amountWithdraw
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