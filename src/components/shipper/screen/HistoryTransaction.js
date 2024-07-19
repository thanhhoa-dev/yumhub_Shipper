import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {styles} from '../styles/HistoryTransactionStyle';
import {getHistoryTransaction} from '../ShipperHTTP';
import Entypo from 'react-native-vector-icons/Entypo';
import {UserContext} from '../../user/UserContext';
import { useNavigation } from '@react-navigation/native';

const HistoryTransaction = () => {
    const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [listTopUp, setListTopUp] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getListHistoryTransaction = await getHistoryTransaction(user.checkAccount._id);
        setListTopUp(getListHistoryTransaction.walletShipper);
        console.log(getListHistoryTransaction.walletShipper);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const NamStatus = number => {
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
            <Text style={styles.textStatus}>{NamStatus(item.status)}</Text>
          </View>
          <Text style={styles.textTimeHistoryItem}>{item.time}</Text>
          <View style={styles.viewFilter}>
            <View style={styles.viewFilter}>
              <Image
                style={styles.imageLogoBank}
                source={require('../../../assets/ImageMbBank.png')}
              />
              <Text style={styles.textTimeHistoryItem}>
                {item.numberBank ? item.numberBank : null}
              </Text>
            </View>
            <Text style={styles.textMoney}>
              {item.transantionType.name === 'cashOut'
                ? `${-item.amountTransantion}`
                : `${+item.amountTransantion}`}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <View style={styles.viewMain}>
          <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.viewButtonBack}>
            <Entypo name={'chevron-left'} size={30} color={'#005987'} />
          </TouchableOpacity>
          <Text style={styles.textHistoryToUp}>Lịch sử nạp</Text>
        </View>
        <View style={styles.viewFilter}>
          <Text style={styles.textFilter}>Lọc</Text>
          <Image
            style={styles.imageLogoMenu}
            source={require('../../../assets/Menu.png')}
          />
        </View>
      </View>
      <View style={styles.viewItemMain}>
        <Text style={[styles.textSizeAll, styles.textTimeDate]}>
          Tháng 2/2023
        </Text>

        <FlatList
          data={listTopUp}
          renderItem={renderItemTopUp}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HistoryTransaction;
