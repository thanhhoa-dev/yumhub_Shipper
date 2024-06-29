import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Calendar } from 'react-native-calendars';
import { UserContext } from '../../user/UserContext';
import { styles } from '../styles/RevenueStyle';
import History from './History';
import DetailRevenue from './DetailRevenue';

const Revenue = () => {
  const [date, setDate] = useState(new Date());
  const [startDateWeek, setStartDateWeek] = useState(null);
  const [endDateWeek, setEndDateWeek] = useState(null);
  const [startOfMonth, setStartOfMonth] = useState(null);
  const [endOfMonth, setEndOfMonth] = useState(null);
  const [index, setIndex] = useState(1);
  const [markedDates, setMarkedDates] = useState({
    [new Date().toISOString().split('T')[0]]: {
      disabled: true,
      startingDay: true,
      color: 'orange',
      endingDay: true,
      textColor: 'white',
    },
  });
  const [rangeSelected, setRangeSelected] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { user } = useContext(UserContext);
  const formattedDate = date.toLocaleDateString();
  const ID = user.checkAccount._id;


  const formatedAlllDate = dateFormat => {
    const formatedAll = new Date(dateFormat).toLocaleDateString();
    return formatedAll;
  };

  const handlePreviousDay = () => {
    setIndex(1);
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setIndex(1);
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      const today = new Date();
      newDate.setDate(newDate.getDate() + 1);
      return newDate > today ? today : newDate;
    });
  };

  useEffect(() => {
    const weekDays = getWeekDays(date);
    const startOfWeek = weekDays[0];
    const endOfWeek = weekDays[6];

    setStartDateWeek(startOfWeek);
    setEndDateWeek(endOfWeek);
    setStartOfMonth(getStartOfMonth(date));
    setEndOfMonth(getEndOfMonth(date));
  }, [date]);

  const getWeekDays = date => {
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

  const handlePreviousWeek = () => {
    setIndex(2);
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setIndex(2);
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      const today = new Date();
      return newDate > today ? today : newDate;
    });
  };

  const handlePreviousMonth = () => {
    setIndex(3);
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setIndex(3);
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      const today = new Date();
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate > today ? today : newDate;
    });
  };

  const getStartOfMonth = date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const getEndOfMonth = date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  const onDayPress = day => {
    setIndex(4);
    if (!rangeSelected) {
      setStartDate(day.dateString);
      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          color: 'orange',
          textColor: 'white',
        },
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
          color: 'orange',
          textColor: 'white',
        };
        current.setDate(current.getDate() + 1);
      }
      range[startDate] = {
        startingDay: true,
        color: 'orange',
        textColor: 'white',
      };
      range[day.dateString] = {
        endingDay: true,
        color: 'orange',
        textColor: 'white',
      };

      setMarkedDates(range);
      setEndDate(day.dateString);
      setRangeSelected(false);
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewContainerHeader}>
        <View style={styles.viewContainerIconLeft}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <FontAwesome6 name={'caret-left'} size={30} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={handlePreviousWeek}>
            <FontAwesome6 name={'angles-left'} size={30} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePreviousDay}>
            <FontAwesome6 name={'chevron-left'} size={23} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewHeaderDate}>
          {index === 1 ? (
            <Text style={styles.textShowDate}>
              {formattedDate} -- {formattedDate}
            </Text>
          ) : index === 2 ? (
            <Text style={styles.textShowDate}>{`${formatedAlllDate(startDateWeek)
              ? formatedAlllDate(startDateWeek)
              : ''
              } -- ${formatedAlllDate(endDateWeek) ? formatedAlllDate(endDateWeek) : ''
              }`}</Text>
          ) : index === 3 ? (
            <Text style={styles.textShowDate}>{`${formatedAlllDate(startOfMonth)
              ? formatedAlllDate(startOfMonth)
              : ''
              } -- ${formatedAlllDate(endOfMonth) ? formatedAlllDate(endOfMonth) : ''
              }`}</Text>
          ) : index === 4 ? (
            <Text style={styles.textShowDate}>{`${startDate ? formatDate(startDate) : ''
              } -- ${endDate ? formatDate(endDate) : ''}`}</Text>
          ) : null}
        </View>
        <View style={styles.viewContainerIconRight}>
          <TouchableOpacity onPress={handleNextDay}>
            <FontAwesome6 name={'chevron-right'} size={23} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={handleNextWeek}>
            <FontAwesome6 name={'angles-right'} size={30} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextMonth}>
            <FontAwesome6 name={'caret-right'} size={30} color={'#000'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewButtonDateOptions}>
        <TouchableOpacity
          onPress={() => {
            [setShowCalendar(!showCalendar), setIndex(4)];
          }}
          style={styles.buttonDateOptions}>
          <Text style={styles.textDateOptions}>Tùy chọn ngày</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewContainerShowCalender}>
        {showCalendar && (
          <Calendar
            markingType={'period'}
            markedDates={markedDates}
            onDayPress={onDayPress}
          />
        )}
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
      >
        <View>
      <View style={styles.viewContainerTotalRevenue}>
        <View style={styles.viewTotalRevenue}>
          <FontAwesome6
            name={'coins'}
            size={30}
            color={'#FFFFFF'}
            style={styles.iconCoins}
          />
          {index === 1 ? (
            <Text style={styles.textShowDateRevenue}>{formattedDate}</Text>
          ) : index === 2 ? (
            <Text style={styles.textShowDateRevenue}>{`${formatedAlllDate(startDateWeek)
              ? formatedAlllDate(startDateWeek)
              : ''
              } -- ${formatedAlllDate(endDateWeek)
                ? formatedAlllDate(endDateWeek)
                : ''
              }`}</Text>
          ) : index === 3 ? (
            <Text style={styles.textShowDateRevenue}>{`${formatedAlllDate(startOfMonth)
              ? formatedAlllDate(startOfMonth)
              : ''
              } -- ${formatedAlllDate(endOfMonth)
                ? formatedAlllDate(endOfMonth)
                : ''
              }`}</Text>
          ) : index === 4 ? (
            <Text style={styles.textShowDateRevenue}>{`${startDate ? formatDate(startDate) : ''
              } -- ${endDate ? formatDate(endDate) : ''}`}</Text>
          ) : null}
        </View>
      
      
        <DetailRevenue
          ID={ID}
          startDateWeek={startDateWeek}
          endDateWeek={endDateWeek}
          startOfMonth={startOfMonth}
          endOfMonth={endOfMonth}
          startDate={startDate}
          endDate={endDate}
          index={index}
          date={date}
        />
        </View>
        {index === 1 ? (
          <History startDate={date} endDate={date} />
        ) : index === 2 ? (
          <History startDate={startDateWeek} endDate={endDateWeek} />
        ) : index === 3 ? (
          <History startDate={startOfMonth} endDate={endOfMonth} />
        ) : index === 4 ? (
          <History startDate={startDate} endDate={endDate} />
        ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default Revenue;
