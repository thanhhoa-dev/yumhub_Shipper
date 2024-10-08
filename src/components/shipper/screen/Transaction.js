import {Withdraw, topUp} from '../ShipperHTTP';

var commission = 0.1; // 10%
const fee = totalDeliveryFee => {
  return totalDeliveryFee * commission;
};
const earn = totalDeliveryFee => {
  return totalDeliveryFee * (1 - commission);
};

export const updateBalance = async (
  user,
  totalDeliveryFee,
  type,
  {voucherID},
) => {
  try {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const des = 'hoàn thành đơn lúc: ' + formattedDate;
    if (type == 3) {
      if (voucherID) {
        if (
          order.order.voucherID.typeOfVoucherID !== '6656cfad8913d56206f64e05'
        ) {
          const updateBalance = await Withdraw(user.checkAccount._id, {
            amountTransantion: fee(totalDeliveryFee),
            description: des,
            status: 4,
          });
          if (updateBalance.result) {
            user.checkAccount.balance -= fee(totalDeliveryFee);
          }
        } else {
          const updateBalance = await Withdraw(user.checkAccount._id, {
            amountTransantion: fee(totalDeliveryFee),
            description: des,
            status: 4,
          });
          if (updateBalance.result) {
            const updateBalanceTopUp = await topUp(user.checkAccount._id, {
              amountTransantion: voucherID.discountAmount,
              description: des,
              status: 4,
            });
            if (updateBalanceTopUp.result) {
              user.checkAccount.balance =
                user.checkAccount.balance -
                fee(totalDeliveryFee) +
                voucherID.discountAmount;
            }
          }
        }
      } else {
        const updateBalance = await Withdraw(user.checkAccount._id, {
          amountTransantion: fee(totalDeliveryFee),
          description: des,
          status: 4,
        });
        if (updateBalance.result) {
          user.checkAccount.balance -= fee(totalDeliveryFee);
        }
      }
    } else {
      if (voucherID) {
        if (order.order.voucherID.typeOfVoucherID !== '6656cfad8913d56206f64e05') {
            const updateBalance = await topUp(user.checkAccount._id, {
                amountTransantion: earn(totalDeliveryFee),
                description: des,
                status: 4,
              });
              if (updateBalance.result) {
                user.checkAccount.balance += earn(totalDeliveryFee);
              }     
        } else {
            const updateBalance = await topUp(user.checkAccount._id, {
                amountTransantion: voucherID.discountAmount,
                description: des,
                status: 4,
              });
              if (updateBalance.result){
                const updateBalanceWithdraw = await Withdraw(user.checkAccount._id, {
                    amountTransantion: fee(totalDeliveryFee),
                    description: des,
                    status: 4,
                  });

                  if (updateBalanceWithdraw.result) {
                    user.checkAccount.balance = user.checkAccount.balance - fee(totalDeliveryFee) + voucherID.discountAmount;
                  }

              }
        }
      } else {
        const updateBalance = await topUp(user.checkAccount._id, {
          amountTransantion: earn(totalDeliveryFee),
          description: des,
          status: 4,
        });
        if (updateBalance.result) {
          user.checkAccount.balance += earn(totalDeliveryFee);
        }
      }
    }
  } catch (error) {
    Alert.alert('liên hệ YumHub', 'yêu cầu nhân viên kiểm tra giao dịch');
  }
};
export const updateBalanceMerchant = async (merchant, totalPriceFood, type) => {
  try {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const des = 'hoàn thành đơn lúc: ' + formattedDate;
    if (type == 3) {
      const updateBalance = await Withdraw(merchant._id, {
        amountTransantion: fee(totalPriceFood),
        description: des,
        status: 4,
      });
    } else {
      const updateBalance = await topUp(merchant._id, {
        amountTransantion: earn(totalPriceFood),
        description: des,
        status: 4,
      });
    }
    return true;
  } catch (error) {
    return false;
  }
};
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export const topUpShipper = async (user, method, amountTopUp) => {
  try {
    const updateBalance = await topUp(user.checkAccount._id, {
      amountTransantion: amountTopUp,
      description: method,
    });
    if (updateBalance.result) {
      user.checkAccount.balance += amountTopUp;
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const withdrawShipper = async (
  user,
  method,
  amountWithdraw,
  nameBank,
  numberBank,
  nameHolder,
) => {
  try {
    const updateBalance = await Withdraw(user.checkAccount._id, {
      amountTransantion: amountWithdraw,
      description: method,
      nameBank: nameBank,
      numberBank: numberBank,
      accountHolder: nameHolder,
      status: 1,
    });
    if (updateBalance.result) {
      user.checkAccount.balance -= amountWithdraw;
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
