import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {revenueShipperTimeTwoTime} from '../ShipperHTTP';
import { styles } from '../styles/DetailRevenueStyles';

const DetailRevenue = ({
  ID,
  startDateWeek,
  endDateWeek,
  startOfMonth,
  endOfMonth,
  startDate,
  endDate,
  index,
  date,
}) => {
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchDataRevenueDate = async (IDUser, start, end) => {
    try {
      const result = await revenueShipperTimeTwoTime(IDUser, start, end);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let result;
        if (index === 2 && startDateWeek && endDateWeek) {
          result = await fetchDataRevenueDate(ID, startDateWeek, endDateWeek);
        } else if (index === 3 && startOfMonth && endOfMonth) {
          result = await fetchDataRevenueDate(ID, startOfMonth, endOfMonth);
        } else if (index === 4 && startDate && endDate) {
          result = await fetchDataRevenueDate(ID, startDate, endDate);
        }
        if (result) {
          setRevenue(result);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    ID,
    startDateWeek,
    endDateWeek,
    startOfMonth,
    endOfMonth,
    startDate,
    endDate,
    index,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let result;
        if (index === 1) {
          result = await fetchDataRevenueDate(ID, date, date);
        }
        if (result) {
          setRevenue(result);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  if (loading || revenue === null) {
    return (
      <View style={styles.viewLoading}>
        <Text style={styles.textNameStatistical}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const formatCurrency = amount => {
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
    return formattedAmount.replace('₫', '') + ' ₫';
  };

  return (
    <View>
      {revenue ? (
        <View style={styles.viewContainerStatisticalRevenue}>
          <View style={styles.viewItemStatistical}>
            <Text style={styles.textNameStatistical}>Số đơn:</Text>
            <Text style={styles.textNumberStatistical}>{revenue.success}</Text>
          </View>
          <View style={styles.viewItemStatistical}>
            <Text style={styles.textNameStatistical}>Tổng thu nhập:</Text>
            <Text style={styles.textNumberStatistical}>
              {formatCurrency(revenue.revenue)}
            </Text>
          </View>
          <View style={styles.viewItemStatistical}>
            <Text style={styles.textNameStatistical}>Nhận tiền mặt:</Text>
            {revenue.payByCash !== undefined ? (
              <Text style={styles.textNumberStatistical}>
                {formatCurrency(revenue.payByCash)}
              </Text>
            ) : (
              <Text style={styles.textNumberStatistical}>0 đ</Text>
            )}
          </View>
          <View style={styles.viewItemStatistical}>
            <Text style={styles.textNameStatistical}>Nhận vào app:</Text>
            {revenue.payByBanking !== undefined &&
            revenue.payByZalo !== undefined ? (
              <Text style={styles.textNumberStatistical}>
                {formatCurrency(
                  parseFloat(revenue.payByBanking) +
                    parseFloat(revenue.payByZalo),
                )}
              </Text>
            ) : (
              <Text style={styles.textNumberStatistical}>0 đ</Text>
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default DetailRevenue;


