import {
    View, Text, FlatList,
    Image,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/HistoryStyle'
import { getHistoryShipper } from '../ShipperHTTP'
import Loading from './Loading'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Color, Size, FontWeight, FontFamily } from '../../../constants/theme';
import { useNavigation } from '@react-navigation/native';


const filterByDateRange = (list, startDate, endDate) => {
    if (!startDate && !endDate) {

        return list;
    }
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return list.filter(item => {
        const timeBookDate = new Date(item.timeBook);

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
    const idShipper = "6604e1ec5a6c5ad8711aebfa";
    const [listHistory, setlistHistory] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getHistoryShipper(idShipper);
                setlistHistory(response.historyShipper);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const formatCurrency = (amount) => {
        if (amount == undefined) return ('0 ₫');
        const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        return formattedAmount.replace('₫', '') + ' ₫';
    };

    function capitalizeWords(str) {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const filteredList = filterByDateRange(listHistory, startDate, endDate);
    const status = (idStatus) => {
        switch (idStatus) {
            case "661760e3fc13ae3574ab8ddf":
            case "661760e3fc13ae3574ab8de0":
            case "661760e3fc13ae3574ab8dde":
            case "661761a5fc13ae3517ab89f5":
            case "661760e3fc13ae3574ab8de3":
                return { text: "Đang giao", color: "#29D8E4" };
            case "661760e3fc13ae3574ab8de1":
                return { text: "Thành công", color: "#005987" };
            case "661760e3fc13ae3574ab8de2":
            case "6656a8738913d56206f64e01":
                return { text: "Hủy đơn", color: "#E46929" };
            default:
                return "unknown";
        }
    }
    const paymentMethod = (number) => {
        switch (number) {
            case 1:
                return "Chuyển khoản"
            case 2:
                return "ZaloPay"
            case 3:
            default:
                return "Tiền mặt"
        }
    }
    const handleRenderHistory = ({ item }) => {
        
        return (
            <TouchableOpacity
                style={styles.viewContainerItemHistory}
                onPress={()=>{
                    navigation.navigate('DetailHistory', { order : item })
                }}
            >
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTime}>{formatDate(item.timeBook)}</Text>
                    <Text style={[styles.itemStatus, { color: status(item.status).color }]}>{status(item.status).text}</Text>
                    <Text style={styles.itemID}>{item._id.slice(-9)}</Text>
                </View>
                <View style={styles.itemName}>
                    <Text style={[styles.itemTxTName, { width: '60%' }]} numberOfLines={1} ellipsizeMode="tail">{capitalizeWords(item.merchantID.name)}</Text>
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
        );
    };

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
            {filteredList.length > 0 && (
                <FlatList
                    data={filteredList}
                    keyExtractor={item => item._id}
                    key={item => item._id}
                    scrollEnabled={false}
                    renderItem={handleRenderHistory}
                />
            )}
            {filteredList.length == 0 && (
                <View style={styles.viewEmpty}>
                    <Text style={styles.txtEmpty}>Bạn không có đơn hàng nào trong thời gian này</Text>
                </View>
            )}
        </View>
    )
}

export default History