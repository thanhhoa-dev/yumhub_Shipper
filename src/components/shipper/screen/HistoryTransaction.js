import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {styles} from '../styles/HistoryTransactionStyle';
import {getHistoryTransaction} from '../ShipperHTTP';
import Entypo from 'react-native-vector-icons/Entypo';
import PickerMonthYear from './PickerMonthYear';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserContext} from '../../user/UserContext';
import LoadingComponent from './LoadingComponent';
import { Marquee } from '@animatereactnative/marquee';

const formatCurrency2 = amount => {
  if (amount == undefined || amount.length == 0) return '0 ₫';
  const formattedAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
  return formattedAmount.replace('₫', '') + ' ₫';
};

function formatDate(stringdate) {
  const date = new Date(stringdate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

const HistoryTransaction = () => {
  const navigation = useNavigation();
  const [listTopUp, setListTopUp] = useState([]);
  const {user} = useContext(UserContext);
  const currentDate = new Date();
  const [monthFilter, setMonthFilter] = useState(currentDate.getMonth() + 1);
  const [yearFilter, setYearFilter] = useState(currentDate.getFullYear());
  const [isShowPickerTime, setisShowPickerTime] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getListHistoryTransaction = await getHistoryTransaction(
          user.checkAccount._id,
        );
        const filteredTransactions =
          getListHistoryTransaction.walletShipper.filter(transaction => {
            const transactionDate = new Date(transaction.time);
            return (
              transactionDate.getMonth() + 1 === monthFilter &&
              transactionDate.getFullYear() === yearFilter
            );
          });
        setListTopUp(filteredTransactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filterList = (month, year, list) => {
    const filteredTransactions = list.filter(transaction => {
      const transactionDate = new Date(transaction.time);
      return (
        transactionDate.getMonth() + 1 == month &&
        transactionDate.getFullYear() == year
      );
    });
    return filteredTransactions;
  };

  const nameStatus = number => {
    switch (number) {
      case 1:
        return 'Chờ duyệt';
      case 2:
        return 'Thành công';
      case 3:
        return 'Thất bại';

      default:
        break;
    }
  };
  const getIconPTTT = name => {
    switch (name) {
      default:
      case 'Zalopay':
        return (
          <Image
            style={styles.imageLogoBank}
            source={require('../../../assets/ic_zalopay.png')}
          />
        );

      case 'QRCode':
        return (
          <Image
            style={styles.imageLogoBank}
            source={require('../../../assets/ic_vietqr.png')}
          />
        );

      case 'Visa/Mastercard':
        return (
          <Image
            style={styles.imageLogoBank}
            source={require('../../../assets/ic_visa.png')}
          />
        );
    }
  };
  const renderItemTopUp = ({item}) => {
    return (
      <View style={styles.viewContentItemMain}>
        <Image
          style={styles.imageLogoCash}
          source={
            item.transantionType.name === 'cashOut'
              ? require('../../../assets/cash-withdrawal.png')
              : require('../../../assets/cash-withdrawal2.png')
          }
        />
        <View style={styles.viewTopContentItem}>
          <View style={styles.viewFilter}>
            <Text style={styles.textSizeAll}>
              {item.transantionType.name == 'cashOut' ? 'Rút tiền' : 'Nạp tiền'}
            </Text>
            <Text style={styles.textStatus}>{nameStatus(item.status)}</Text>
          </View>
          <Text style={styles.textTimeHistoryItem}>
            {formatDate(item.time)}
          </Text>
          <View style={styles.viewFilter}>
            {item.nameBank !== undefined ? (
              <View style={[styles.viewFilter, {marginEnd: 27}]}>
                <Image
                  style={styles.imageLogoBank}
                  source={{
                    uri: item.nameBank.split(' ').slice(1).join(' '),
                  }}
                />
                <Text style={styles.textTimeHistoryItem}>
                  {item.numberBank ? `**** ` + item.numberBank.slice(-4) : null}
                </Text>
              </View>
            ) : (
              <View style={styles.viewFilter}>
                <Text style={styles.txtPTTT}>PT Thanh Toán</Text>
                {getIconPTTT(item.description)}
              </View>
            )}
            <Marquee
              spacing={20} 
              >
              <Text style={styles.textMoney}>{item.transantionType.name === 'cashOut'
                ? `-` + `${formatCurrency2(item.amountTransantion)}`
                : `+` + `${formatCurrency2(item.amountTransantion)}`}
                </Text>
            </Marquee >
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View style={styles.viewMain}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.viewButtonBack}>
            <Entypo name={'chevron-left'} size={30} color={'#005987'} />
          </TouchableOpacity>
          <Text style={styles.textHistoryToUp}>Lịch sử nạp</Text>
        </View>
        <TouchableOpacity
          onPress={() => setisShowPickerTime(true)}
          style={styles.viewFilter}>
          <Text style={styles.textFilter}>Lọc</Text>
          <Image
            style={styles.imageLogoMenu}
            source={require('../../../assets/Menu.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewItemMain}>
        <Text style={[styles.textSizeAll, styles.textTimeDate]}>
          Tháng {monthFilter}/{yearFilter}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listTopUp.length > 0 ? (
            <FlatList
              data={filterList(monthFilter, yearFilter, listTopUp.reverse())}
              renderItem={renderItemTopUp}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <LoadingComponent />
          )}
          {listTopUp.length > 0 ? (
            <Text style={styles.txtOver}>
              {filterList(monthFilter, yearFilter, listTopUp.reverse()).length >
              0
                ? 'bạn đã xem hết các lịch sử giao dịch'
                : 'bạn không có giao dịch nào trong thời gian này'}
            </Text>
          ) : null}
          {listTopUp.length > 0 ? (
            <View style={styles.viewBtnBack}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.btn}>
                <Text style={styles.txtBtn}>Về Trang Chủ</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </View>
      <Modal
        transparent={true}
        visible={isShowPickerTime}
        animationType="fade"
        onRequestClose={setisShowPickerTime}>
        <PickerMonthYear
          monthFilter={monthFilter}
          yearFilter={yearFilter}
          setisShowPickerTime={setisShowPickerTime}
          setMonthFilter={setMonthFilter}
          setYearFilter={setYearFilter}
        />
      </Modal>
    </View>
  );
};

export default HistoryTransaction;
