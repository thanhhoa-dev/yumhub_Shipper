import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../styles/HistoryStyle';
import { getHistoryShipper } from '../ShipperHTTP';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Color } from '../../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../user/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import LoadingComponent from './LoadingComponent';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const filterByDateRange = (list, startDate1, endDate1) => {
    if (!startDate1 && !endDate1) return list;
    const startDate = new Date(startDate1)
    const endDate = new Date(endDate1)
    let start
    let end
    if (startDate == endDate) {
        start = startDate ? formatDate((new Date(startDate)).toString()) : null;
        end = endDate ? formatDate((new Date(endDate)).toString()) : null;
    } else {
        start = startDate ? new Date(startDate) : null
        end = endDate ? new Date(endDate) : null
        if (end) {
            end.setDate(endDate.getDate() + 1);
        }
    }
    return list.filter(item => {
        let timeBookDate;
        if (startDate == endDate) {
            timeBookDate = formatDate((new Date(item.timeBook)).toString());
        } else {
            timeBookDate = new Date(item.timeBook)
        }
        if (start && end) {
            return timeBookDate >= start && timeBookDate <= end;
        } else if (start) {
            return timeBookDate >= start;
        } else if (end) {
            return timeBookDate <= end;
        }
    });
};

const History = ({ startDate, endDate }) => {
    const navigation = useNavigation();
    const { user } = useContext(UserContext)
    const [listHistory, setlistHistory] = useState([]);
    const [isLoading, setisLoading] = useState(true)

    const fetchData = useCallback(async () => {
        setisLoading(true)
        try {
            const response = await getHistoryShipper(user.checkAccount._id);
            setlistHistory(response.historyShipper);
        } catch (error) {
            console.log(error);
        }
        setisLoading(false)
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const formatCurrency = (amount) => {
        if (amount === undefined) return '0 ₫';
        const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        return formattedAmount.replace('₫', '') + ' ₫';
    };

    const capitalizeWords = (str) => {
        if (!str) return '';
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const filteredList = useMemo(() => {
        const list = filterByDateRange(listHistory, startDate, endDate);
        return list.sort((a, b) => new Date(b.timeBook) - new Date(a.timeBook));
    }, [listHistory, startDate, endDate]);

    const status = (idStatus) => {
        switch (idStatus) {
            case "661760e3fc13ae3574ab8ddf":
                return { text: "Đang đợi lấy hàng", color: "#29D8E4" };
            case "661760e3fc13ae3574ab8de0":
                return { text: "Đang giao", color: "#29D8E4" };
            case "661760e3fc13ae3574ab8dde":
                return { text: "Đang tìm shipper", color: "#29D8E4" };
            case "661761a5fc13ae3517ab89f5":
                return { text: "Đã đến nơi giao", color: "#29D8E4" };
            case "661760e3fc13ae3574ab8de3":
                return { text: "Đang đi lấy hàng", color: "#29D8E4" };
            case "661760e3fc13ae3574ab8de1":
                return { text: "Thành công", color: "#005987" };
            case "661760e3fc13ae3574ab8de2":
                return { text: "Hủy đơn", color: "#E46929" };
            case "6656a8738913d56206f64e01":
                return { text: "Khách không nhận", color: "#E46929" };
            default:
                return { text: "unknown", color: "#000" };
        }
    };

    const paymentMethod = (number) => {
        switch (number) {
            case 1:
                return "Chuyển khoản";
            case 2:
                return "ZaloPay";
            case 3:
            default:
                return "Tiền mặt";
        }
    };

    const handleRenderHistory = useCallback(({ item }) => (
        <TouchableOpacity
            style={styles.viewContainerItemHistory}
            onPress={() => navigation.navigate('DetailHistory', { order: item })}
        >
            <View style={styles.itemHeader}>
                <Text style={styles.itemTime}>{formatDate(item.timeBook)}</Text>
                <Text style={[styles.itemStatus, { color: status(item.status._id).color }]}>{status(item.status._id).text}</Text>
                <Text style={styles.itemID}>{item._id.slice(-9)}</Text>
            </View>
            <View style={styles.itemName}>
                <Text style={[styles.itemTxTName, { width: '60%' }]} numberOfLines={1} ellipsizeMode="tail">{capitalizeWords(item.shipperID.fullName)}</Text>
                <Text style={styles.itemTxTName}>{capitalizeWords(item.customerID.fullName)}</Text>
            </View>
            <View style={styles.itemRowDetail}>
                <Text style={styles.itemTxTLeft}>Loại thanh toán:</Text>
                <Text style={styles.itemTxTRight}>{paymentMethod(item.paymentMethod)}</Text>
            </View>
            <View style={styles.itemRowDetail}>
                <Text style={styles.itemTxTLeft}>Khoảng cách:</Text>
                <Text style={styles.itemTxTRight}>{item.totalDistance} km</Text>
            </View>
            <View style={styles.itemRowDetail}>
                <Text style={styles.itemTxTLeft}>Tổng thu nhập:</Text>
                <Text style={styles.itemTxTRight}>{formatCurrency(item.revenueDelivery)}</Text>
            </View>
        </TouchableOpacity>
    ), [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.viewHeader}>
                <View style={styles.viewIcon}>
                    <Icon name="clock" size={24} color={Color.white} />
                </View>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Lịch sử đơn hàng</Text>
                </View>
            </View>
            {
                (isLoading &&
                    <LoadingComponent 
                    backgroundColorStyle={'#F5FEFF'}/>)
            }
            {filteredList.length > 0 ? (
                <FlatList
                    scrollEnabled={false}
                    data={filteredList}
                    keyExtractor={item => item._id}
                    renderItem={handleRenderHistory}
                />
            ) : (
                <View style={styles.viewEmpty}>
                    <Text style={styles.txtEmpty}>Bạn không có đơn hàng nào trong thời gian này</Text>
                </View>
            )}
        </View>
    );
}

export default History;
