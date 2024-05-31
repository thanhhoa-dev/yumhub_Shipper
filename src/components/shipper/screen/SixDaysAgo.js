import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../user/UserContext';
import { revenueShipperTimeTwoTime } from '../ShipperHTTP';

const SixDaysAgo = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [revenue, setRevenur] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const {user} = useContext(UserContext);
  // const [ID, setID] = useState(user.data.checkAccount._id);
  const ID = '6604e1ec5a6c5ad8711aebfa';
  const layout = useWindowDimensions();


  useEffect(()=>{
    const fetchData = async () =>{
      console.log(selectedDay);
      try {
        const getOneRevenue = await revenueShipperTimeTwoTime(ID, selectedDay);
        setRevenur(getOneRevenue);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    fetchData();
  },[selectedDay])

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setSelectedDay(currentDate);
  };

  const renderDay = date => {
    const isToday = isSameDay(date, new Date());
    const isSelected = isSameDay(date, selectedDay);
    const dayStyle = isSelected ? [styles.dayText, styles.today] : styles.dayText;

    return (
      <TouchableOpacity onPress={()=>{setSelectedDay(date)}}>
        <View style={styles.dayContainer}>
          <Text style={dayStyle}>{date.getDate()}</Text>
          <Text>{isToday ? 'Hôm nay' : getDayOfWeek(date)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getPastSixDays = date => {
    const days = [];
    for (let i = 5; i >= 0; i--) {
      const pastDate = new Date(date);
      pastDate.setDate(date.getDate() - i);
      days.push(pastDate);
    }
    return days;
  };

  const getDayOfWeek = date => {
    const daysOfWeek = [
      'Chủ nhật',
      'Th 2',
      'Th 3',
      'Th 4',
      'Th 5',
      'Th 6',
      'Th 7',
    ];
    return daysOfWeek[date.getDay()];
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  //////////////////
  const FirstRoute = () => {
    return (
      <View style={{flex: 1}}>
        <View style={styles.viewHeaderOrderTabView}>
          <Text>Xem tất cả các doanh thu từ đơn hàng tại đây</Text>
        </View>
        <View style={styles.viewInformationOrder}>
          <AntDesign name={'CodeSandbox'} size={30} />
          <View style={styles.viewContainerMainOrder}>
            <View style={styles.viewContainerOrder}>
              <Text>10.220 đ</Text>
              <View style={styles.viewIconCash}>
                <FontAwesome5 name={'money-bill-alt'} size={20} />
                <Text style={styles.textCash}>Tiền mặt</Text>
              </View>
            </View>
            <View style={styles.viewContainerOrder}>
              <View style={styles.viewIconCash}>
                <Text>19:20 - 19:30</Text>
                <Text>1.76km</Text>
              </View>
              <Text>Đã hoàn tất</Text>
            </View>
            <View>
              <Text>ID đặt chuyến: ik - 512 - 541</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewLocation}>
          <View style={styles.viewIconLocation}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: 'blue',
              }}
            />
            <View style={{width: 1, height: 20, borderWidth: 1}} />
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: 'orange',
              }}
            />
          </View>
          <View style={styles.viewContainerNameLocation}>
            <View style={styles.viewNameLocation}>
              <Text numberOfLines={1} style={{paddingBottom:8}}>quốc lộ 1 a</Text>
              <Text numberOfLines={1} >Quận gò vấp</Text>
            </View>
            <AntDesign name={'right'} size={30} />
          </View>
        </View>
      </View>
    );
  };

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#673ab7'}} />
  );

  const ThirdRoute = () => (
    <View style={{flex: 1, backgroundColor: '#673ab7'}} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Đơn hàng'},
    {key: 'second', title: 'Ưu đãi'},
    {key: 'third', title: 'Đơn hàng khác'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#2ca11d'}}
      pressColor="pink"
      labelStyle={{color: '#9fa6a1', fontWeight: '700'}}
      style={{backgroundColor: '#f0efeb'}}
      activeColor="#000"
    />
  );
  //////////////////

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.viewHeaderToday}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Feather name={'arrow-left'} size={25} />
        </TouchableOpacity>
        <Text style={styles.textToday}>Hôm nay</Text>
      </View>
      <View style={styles.viewFlatlistDate}>
        <View style={styles.container}>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.monthText}>
              {selectedDate.toLocaleString('vi-VN', {month: 'long'})}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={getPastSixDays(selectedDate)}
            renderItem={({item}) => renderDay(item)}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.viewContainerStatistical}>
        <View style={styles.viewItemStatistical}>
          <View style={styles.viewNameStatistical}>
            <MaterialCommunityIcons name={'camcorder'} size={20} />
            <Text style={styles.textName}>Đơn hàng</Text>
          </View>
          <Text>{revenue.revenue ? revenue.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."): '0'}{' '}đ</Text>
        </View>
        <View style={styles.viewItemStatistical}>
          <View style={styles.viewNameStatistical}>
            <AntDesign name={'totop'} size={20} />
            <Text style={styles.textName}>Ưu đãi</Text>
          </View>
          <Text>0 đ</Text>
        </View>
        <View style={styles.viewItemStatistical}>
          <View style={styles.viewNameStatistical}>
            <FontAwesome5 name={'money-bill-alt'} size={20} />
            <Text style={styles.textName}>Doanh thu khác</Text>
          </View>
          <Text>0 đ</Text>
        </View>
        <View style={styles.viewContainerTotalRevenue}>
          <Text>Tổng doanh thu</Text>
          <Text>{revenue.revenue ? revenue.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."): '0'}{' '}đ</Text>
        </View>
        <View style={styles.viewContainerInformationOrder}>
          <View style={styles.viewItemOrder}>
            <Text>Đơn hàng hoàn tất</Text>
            <Text>{revenue.success}</Text>
          </View>
          <View style={styles.viewItemOrder}>
            <Text>Đơn hàng đã hủy</Text>
            <Text>{revenue.cancel}</Text>
          </View>
        </View>
      </View>
      <View style={styles.viewTabViewToday}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainerNameLocation:{
    marginStart:35,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    flex:1,
    borderTopWidth:1,
    paddingTop:15
  },
  viewIconLocation:{
    alignItems:'center',
    paddingTop:18
  },
  viewLocation:{
    flexDirection:'row',
    marginTop: 20,
    marginHorizontal: 15,
  },
  textCash: {
    marginStart: 10,
  },
  viewIconCash: {
    flexDirection: 'row',
  },
  viewContainerOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  viewContainerMainOrder: {
    marginStart: 15,
    flex: 1,
  },
  viewInformationOrder: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 15,
  },
  viewHeaderOrderTabView: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#f0efeb',
  },
  viewTabViewToday: {
    flex: 1,
    marginTop: 20,
  },
  viewItemOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  viewContainerInformationOrder: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  viewContainerTotalRevenue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderStyle: 'dashed',
    paddingTop: 15,
  },
  textName: {
    marginStart: 10,
  },
  viewNameStatistical: {
    flexDirection: 'row',
  },
  viewItemStatistical: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  viewContainerStatistical: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  textToday: {
    fontWeight: '700',
    fontSize: 20,
    marginStart: 10,
  },
  viewHeaderToday: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewFlatlistDate: {
    backgroundColor: '#c1c3c7',
  },
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dayContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  today: {
    backgroundColor: 'lightblue',
    borderRadius: 20,
    paddingHorizontal: 8,
  },
});

export default SixDaysAgo;
