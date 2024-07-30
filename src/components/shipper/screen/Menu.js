import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../user/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import Dialog from 'react-native-dialog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
const Menu = ({navigation}) => {
  const {user} = useContext(UserContext);
  const {setUser} = useContext(UserContext);
  const idUser = user.checkAccount._id;
  const [visible, setVisible] = useState(false);
  // console.log(user);
  const handleLogout = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleConfirm = () => {
    setVisible(false);
    setUser(null);
  };

  const formatCurrency = amount => {
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
    return formattedAmount.replace('₫', '') + ' ₫';
  };

  return (
    <View style={{flex: 1, backgroundColor:'#fff'}}>
      <View style={styles.viewHeader}>
        <View style={{marginTop: 20, alignSelf: 'center', marginTop: 51}}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '400'}}>
            Số dư của bạn
          </Text>
        </View>
        <View style={{alignSelf: 'center', marginTop: 60}}>
          <Text style={{color: 'white', fontSize: 40, fontWeight: '700'}}>
            {formatCurrency(user.checkAccount.balance)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginStart: 20,
            marginEnd: 20,
            marginTop: 17,
          }}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => navigation.navigate('TopUpPaymentMethod')}>
            <Text style={styles.textButton}>Nạp tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WithdrawPaymentMethod');
            }}
            style={styles.viewButton}>
            <Text style={styles.textButton}>Rút tiền</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{flex:1}}>
          <View style={styles.viewBoder}>
            <TouchableOpacity
              style={styles.viewItem}
              onPress={() => navigation.navigate('Profile')}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather name={'user'} size={30} color="#FC6E2A" />
              </View>
              <View>
                <Text style={styles.textContent}>
                  Thông tin cá nhân của bạn
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color="#005987" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('HistoryTransaction')}
              style={[styles.viewItem, {marginBottom:20}]}>
              <View style={{
                  backgroundColor: '#fff',
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather name={'settings'} size={30} color="#005987" />
              </View>
              <View>
                <Text style={styles.textContent}>Lịch sử nạp rút tiền</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#005987" />
            </TouchableOpacity>
          </View>
          <View style={styles.viewBoder}>
            <TouchableOpacity style={styles.viewItem}>
              <View style={{
                  backgroundColor: '#fff',
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons name={'keyboard-settings-outline'} size={38} color="#19D6E5" />
              </View>
              <View>
                <Text
                  style={styles.textContent}
                  onPress={() => navigation.navigate('ChangePass')}>
                  Đổi mật khẩu
                </Text>
              </View>
              <Icon name="chevron-right"  size={20} color="#005987" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.viewItem, {marginBottom:20}]} onPress={handleLogout}>
              <View style={{
                  backgroundColor: '#fff',
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name={'poweroff'} size={30} color="#19D6E5" />
              </View>
              <View>
                <Text style={styles.textContent}>Đăng xuất</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#005987" />
            </TouchableOpacity>
            <Dialog.Container visible={visible}>
              <Dialog.Title>Xác nhận đăng xuất</Dialog.Title>
              <Dialog.Description>
                Bạn có chắc chắn muốn đăng xuất?
              </Dialog.Description>
              <Dialog.Button label="Hủy" onPress={handleCancel} />
              <Dialog.Button label="Đồng ý" onPress={handleConfirm} />
            </Dialog.Container>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginHorizontal:15,
    marginTop: 14,
  },
  textContent: {
    color: '#32343E',
    fontSize: 15,
    fontWeight: '400',
  },
  viewBoder: {
    backgroundColor: '#F6F8FA',
    marginHorizontal: 24,
    borderRadius: 15,
    marginTop: 20,
    justifyContent: 'center',
  },
  textButton: {
    color: '#005987',
    fontSize: 14,
    fontWeight: '400',
  },
  viewButton: {
    width: 100,
    height: 37,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHeader: {
    height: 271,
    backgroundColor: '#005987',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
});
