import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';

const SixDaysAgo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const getOneRevenue = await revenueShipperTimeTwoTime(ID, startDate);
        setRevenur(getOneRevenue);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const weekDays = getWeekDays(currentDate);
    const startOfWeek = weekDays[0];
    const endOfWeek = weekDays[6];
  
    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setCurrentDate(currentDate);
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const renderDay = (date) => {
    const isToday = isSameDay(date, new Date());
    const dayStyle = isToday ? [styles.dayText, styles.today] : styles.dayText;
    console.log(startDate, endDate);

    return (
      <TouchableOpacity>
        <View style={styles.dayContainer}>
          <Text style={dayStyle}>{date.getDate()}</Text>
          <Text>{date.toLocaleString('vi-VN', { weekday: 'short' })}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handlePreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const weekDays = getWeekDays(currentDate);

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.viewHeaderToday}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
              {selectedDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}
            </Text>
          </TouchableOpacity>
          <View style={styles.navigation}>
            <Button title="Previous" onPress={handlePreviousWeek} />
            <Text style={styles.weekText}>
              {currentDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            </Text>
            <Button title="Next" onPress={handleNextWeek} />
          </View>
          <FlatList
            data={weekDays}
            renderItem={({ item }) => renderDay(item)}
            keyExtractor={(item) => item.toISOString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewHeaderToday: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  textToday: {
    fontWeight: '700',
    fontSize: 20,
    marginStart: 10,
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
  weekText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
});

export default SixDaysAgo;
