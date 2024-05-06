import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {revenueShipperTimeTwoTime} from '../ShipperHTTP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../user/UserContext';
import {useNavigation} from '@react-navigation/native';

const FirstRoute = () => {
  const navigation = useNavigation();
  const [revenue, setRevenur] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const {user} = useContext(UserContext);
  const [ID, setID] = useState(user.data.checkAccount._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getOneRevenue = await revenueShipperTimeTwoTime(ID, startDate);
        setRevenur(getOneRevenue);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchData();
  }, []);
  return (
    <View style={{flex: 1, padding: 10}}>
      <Text style={styles.textToday}>Hôm nay</Text>
      <Text style={styles.textMoneyToday}>
        {revenue.revenue ? revenue.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."): '0'}{' '}đ
      </Text>
      <View style={styles.viewDetaiOrder}>
        <Text>{revenue.success} đơn hàng hoàn tất</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SixDaysAgo');
          }}
          style={styles.buttonDetailOrder}>
          <Text style={styles.textSeeDetail}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const Revenue = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Hàng ngày'},
    {key: 'second', title: 'Hàng tuần'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#2ca11d'}}
      pressColor="pink"
      labelStyle={{color: '#9fa6a1', fontWeight: '700'}}
      style={{backgroundColor: 'white'}}
      activeColor="#000"
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.viewContainerTitle}>
          <Text style={styles.textRevenue}>Doanh thu</Text>
          <Text style={styles.textTotalRevenue}>Tổng kết doanh thu</Text>
        </View>
        <View style={styles.viewContainerTabView}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
            renderTabBar={renderTabBar}
          />
        </View>
        <View style={styles.viewContainerBalance}>
          <View style={styles.viewHeaderBalance}>
            <Text style={styles.textBalance}>Số dư</Text>
            <Text style={styles.textNumberBalance}>163.621 đ</Text>
          </View>
          <View style={styles.viewContainerChooseBalance}>
            <View style={styles.viewContainerIconBank}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name={'arrow-down-bold-box'}
                  size={25}
                  color={'#2ca11d'}
                />
              </TouchableOpacity>
              <Text style={styles.textIconBank} numberOfLines={2}>
                Rút về ngân hàng
              </Text>
            </View>
            <View style={styles.viewContainerIconBank}>
              <TouchableOpacity>
                <MaterialIcons
                  name={'work-history'}
                  size={25}
                  color={'#2ca11d'}
                />
              </TouchableOpacity>
              <Text style={styles.textIconBank}>Lịch sử giao dịch</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewContainerRevenueAdd}>
          <Text style={styles.textRevenueAdd}>Doanh thu bổ sung</Text>
          <TouchableOpacity style={styles.viewItemEndowment}>
            <Image
              style={styles.imageEndowment}
              source={require('../../../assets/endowment.png')}
            />
            <Text style={styles.textEndowment}>Ưu đãi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewfooter}>
        <TouchableOpacity style={styles.buttonHistory}>
          <Text style={styles.textHistoryOrder}>Lịch sử đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Revenue;

const styles = StyleSheet.create({
  textHistoryOrder: {
    color: '#2ca11d',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonHistory: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 25,
    borderColor: '#2ca11d',
  },
  viewfooter: {
    borderTopWidth: 8,
    borderTopColor: '#e6ebe6',
  },
  textEndowment: {
    fontWeight: 'bold',
    color: '#000',
  },
  imageEndowment: {
    width: 40,
    height: 40,
    marginBottom: 15,
  },
  viewItemEndowment: {
    borderRadius: 10,
    elevation: 4,
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 15,
  },
  textRevenueAdd: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  viewContainerRevenueAdd: {
    marginTop: 30,
    marginBottom: 20,
  },
  textIconBank: {
    marginTop: 10,
  },
  viewContainerIconBank: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  viewContainerChooseBalance: {
    flexDirection: 'row',
    marginVertical: 24,
    justifyContent: 'center',
  },
  viewHeaderBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  viewContainerBalance: {
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 20,
    padding: 15,
  },
  textSeeDetail: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonDetailOrder: {
    backgroundColor: '#2ca11d',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  viewDetaiOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textMoneyToday: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  textToday: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
  },
  viewContainerTabView: {
    borderWidth: 1,
    height: 190,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 15,
    backgroundColor: '#f2f7f4',
  },
  textTotalRevenue: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '700',
  },
  textRevenue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewContainerTitle: {
    marginTop: 15,
  },
  backgroundContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
