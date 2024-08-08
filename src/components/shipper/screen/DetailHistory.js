import {
  View, Text, ScrollView,
  TouchableOpacity, FlatList, Image,

} from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/DetailHistoryStyle'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Color, Size, FontWeight, FontFamily } from '../../../constants/theme';
import { ShowDetail, getReviewOfOrder } from '../ShipperHTTP';
import { useRoute } from '@react-navigation/native'
import star from '../../../assets/star.png'
import starvote from '../../../assets/starvote.png'
import { useNavigation } from '@react-navigation/native';

const DetailHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;
  const avatar = order.customerID.avatar != undefined ? order.customerID.avatar : "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
  const handleRenderListFoods = ({ item }) => {
    return (
      <View style={styles.viewContainerItemFood}>
        <View style={styles.headerItemFood}>
          <View style={styles.headername}>
            <Text style={[styles.nameFood, { width: 21 }]}>{item.food.quantity}x</Text>
            <Text style={styles.nameFood}>{item.name}</Text>
          </View>
          <Text style={styles.price}>{formatCurrency(item.food.price)}</Text>
        </View>
        <Text style={styles.description}>{item.food.description}</Text>
      </View>
    );
  };

  const [listFoods, setListFoods] = useState([])
  const [listReview, setListReview] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShowDetail(order._id);
        const responseReview = await getReviewOfOrder(order._id);
        setListFoods(response);
        setListReview(responseReview.listReview);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    if (typeof amount !== "number") return 0 + ' ₫';
    const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    return formattedAmount.replace('₫', '') + ' ₫';
  };
  function formatDate(inputStr) {
    if (typeof inputStr !== 'string') {
      return "";
    }

    let inputDate = new Date(inputStr);

    if (isNaN(inputDate.getTime())) {
      return "";
    }

    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let inputDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

    if (inputDay.getTime() === today.getTime()) {
      return "hôm nay";
    }

    let day = inputDate.getDate();
    let month = inputDate.getMonth() + 1; // Tháng trong Date là 0-based
    let year = inputDate.getFullYear();
    let hours = inputDate.getHours();
    let minutes = inputDate.getMinutes();

    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  const renderStars = (rating) => {
    const safeRating = Math.min(Math.max(rating, 0), 5);
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Image
          key={i}
          source={i <= safeRating ? starvote : star}
          style={styles.star}
        />
      );
    }
    return stars;
  };

  const renderReview = (item, order) => {
    const renderStatus = (idstatus) => {
      switch (idstatus) {
        case "6656a8738913d56206f64e01":
          return { customer: "không nhận" }
        case "661760e3fc13ae3574ab8de1":
          return { customer: "đã nhận" }
        case "661760e3fc13ae3574ab8de2":
          return { customer: "chưa nhận" }
        default:
          return { customer: "" }
      }
    }
    const createItemToReviewDetail = () => {
      return {
        user: order.customerID,
        review: item,
        image: []
      }
    }
    if (item.typeOfReview.name !== "customerToShipper") return (<View></View>)
    return (
      <View style={styles.reviewSection}>
        <Text style={styles.titleReview}>
          Đánh giá của khách hàng
        </Text>
        <View style={styles.containerReview}>
          <View style={styles.rowInforReview}>
            <Image style={styles.avatarInfoReivew} source={{ uri: avatar }} />
            <View style={styles.nameAndRating}>
              <Text style={styles.name}>
                {order.customerID.fullName}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {renderStars(Math.floor(item.rating))}
              </View>
            </View>
            <View style={styles.statusAndMore}>
              <Text style={styles.status}>
                {renderStatus(order.status).customer}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ReviewDetail", { item: createItemToReviewDetail(item.typeOfReview.name) })
                }}
              >
                <View style={styles.viewMore}>
                  <Text style={styles.moreDetailReview}>
                    Xem Thêm
                  </Text>
                  <Icon name="angle-right" size={10} color={'#E46929'} style={{ marginStart: 5 }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.descriptionReview} numberOfLines={1} ellipsizeMode="tail">{item.description.length > 0 ? item.description : "không để lại đánh giá"}</Text>
        </View>
      </View>)
  }
  const renderReviewFull = ({ item }) => renderReview(item, order);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewBack}>
        <TouchableOpacity style={styles.viewICBack}
          onPress={() => { navigation.goBack() }}
        >
          <Icon
            name="chevron-left"
            size={12}
            color="#F2F2F2"
            FontWeight={FontWeight.FW700}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Mô tả đơn hàng</Text>
        <View style={styles.viewICBack}></View>
      </View>
      <View style={styles.titleListFood}>
        <Text style={styles.textTitleListFood}>
          danh sách món
        </Text>
        <View style={styles.timeOrder}>
          <Text style={styles.txtID}>#{order._id}</Text>
          <Text style={styles.txtTime}>{formatDate(order.timeGetFood)}</Text>
        </View>
      </View>
      <FlatList
        data={listFoods}
        renderItem={handleRenderListFoods}
        keyExtractor={(item, index) => `food-${item._id}` + index}
        scrollEnabled={false}
      />
      <View style={styles.rowTotal}>
        <Text style={styles.total}>Tổng tiền món(giá gốc):</Text>
        <Text style={styles.money}>{formatCurrency(order.priceFood)}</Text>
      </View>
      <View style={styles.rowTotal}>
        <Text style={styles.total}>Quán nhận từ shipper:</Text>
        {order.voucherID && (
          <Text style={styles.money}>{formatCurrency(order.priceFood - order.voucherID.discountAmount)}</Text>
        )}
      </View>
      <View style={styles.rowTotal}>
        <Text style={styles.total}>Thu nhập:</Text>
        <Text style={styles.moneyEarn}>{formatCurrency(order.revenueDelivery)}</Text>
      </View>
      <FlatList
        data={listReview}
        keyExtractor={item => `review-${item._id}`}
        scrollEnabled={false}
        renderItem={renderReviewFull}
      />
      <Text style={styles.txtNote}>
        Nếu có sai xót xin hãy báo cáo với chúng tôi để khắc phục
      </Text>
      <TouchableOpacity
        onPress={() => { navigation.goBack() }}
      >
        <View style={styles.btnBackHome}>
          <Text style={styles.txtBackHome}>Về Trang Chủ</Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default DetailHistory