import { Withdraw, topUp } from '../ShipperHTTP'
import { useContext } from 'react';
import { UserContext } from '../../user/UserContext';

var commission = 0.1;  // 10%
const fee = (totalDeliveryFee) => {
    return totalDeliveryFee * commission;
};
const earn = (totalDeliveryFee) => {
    return (totalDeliveryFee * (1 - commission));
}


const updateBalance = async (totalDeliveryFee, type) => {
    const { user } = useContext(UserContext);
    try {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const des = "hoàn thành đơn lúc: " + formattedDate;
        if (type == "cash"){
            const updateBalance = await Withdraw(user.checkAccount._id,
                {
                    amountTransantion: fee(totalDeliveryFee),
                    description: des
                });
            if (updateBalance.result) {
                user.checkAccount.balance -= fee(totalDeliveryFee)
            }
        }else if(type == "card"){
            const updateBalance = await topUp(user.checkAccount._id, { amountTransantion: earn(totalDeliveryFee), description: des });
            if (updateBalance.result) {
                user.checkAccount.balance += earn(totalDeliveryFee)
            }
        }
        
    } catch (error) {
        Alert.alert("liên hệ YumHub", "yêu cầu nhân viên kiểm tra giao dịch");
    }
}