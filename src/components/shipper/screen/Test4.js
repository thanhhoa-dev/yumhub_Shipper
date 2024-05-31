import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

const SixDaysAgo = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [markedDates, setMarkedDates] = useState({
    [new Date().toISOString().split('T')[0]]: { disabled: true, startingDay: true, color: 'green', endingDay: true }
  });
  const [rangeSelected, setRangeSelected] = useState(false);

  useEffect(() => {
    const today = new Date();
    const weekDays = getWeekDays(today);
    const startOfWeek = weekDays[0];
    const endOfWeek = weekDays[6];

    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
  }, []);

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

  const onDayPress = (day) => {
    if (!rangeSelected) {
      setStartDate(day.dateString);
      setMarkedDates({
        [day.dateString]: { startingDay: true, color: 'lightblue', textColor: 'white' },
      });
      setRangeSelected(true);
    } else {
      const start = new Date(startDate);
      const end = new Date(day.dateString);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 30) {
        Alert.alert('Error', 'Date range should not exceed 30 days');
        return;
      }

      const range = {};
      let current = new Date(startDate);
      while (current <= end) {
        const dateString = current.toISOString().split('T')[0];
        range[dateString] = {
          color: 'lightblue',
          textColor: 'white',
        };
        current.setDate(current.getDate() + 1);
      }
      range[startDate] = { startingDay: true, color: 'lightblue', textColor: 'white' };
      range[day.dateString] = { endingDay: true, color: 'lightblue', textColor: 'white' };
      setMarkedDates(range);
      setEndDate(day.dateString);
      setRangeSelected(false);
    }
  };

  const renderDay = (date) => {
    const isToday = isSameDay(date, new Date());
    const dayStyle = isToday ? [styles.dayText, styles.today] : styles.dayText;

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
          <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
            <Text style={styles.monthText}>
              {selectedDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowCalendar(true)}>
            <Text style={styles.monthText}>
              àdasdflasdflasdf
            </Text>
          </TouchableOpacity>
          {showCalendar && (
            <Calendar
              markingType={'period'}
              markedDates={markedDates}
              onDayPress={onDayPress}
            />
          )}
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
