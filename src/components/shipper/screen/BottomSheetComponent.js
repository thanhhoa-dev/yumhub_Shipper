import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from '../styles/GoogStyle';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import StarRating from 'react-native-star-rating-widget';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slider from 'react-native-slide-to-unlock';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LoadingComponent from './LoadingComponent';
import Loading from './Loading';


const BottomSheetComponent = ({
  order,
  destination,
  snapPoints,
  isBottomSheetVisible,
  setIsBottomSheetVisible,
  index,
  detailFoodOrder,
  distance,
  distanceCustomer,
  handleFlatlistFood,
  formatCurrency,
  image,
  handleUpdateIndex,
  items,
  setModalVisibleCancelOrder,
  countdownTimePaymentMethod,
  formatTime,
  openCamera,
  showNumberPhone,
  setShowNumberPhone,
  handleCall,
  checkImage
}) => {
  const navigation = useNavigation();
  return (
    order &&
    destination &&
    isBottomSheetVisible && (
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        onClose={() => setIsBottomSheetVisible(false)}>
          
      {!checkImage ? (
        <BottomSheetScrollView>
            <View style={styles.viewContainerBottomSheet}>
              {index < 2 ? (
                <View style={styles.viewInformationMerchantBottomSheet}>
                  {order.order.merchantID.imageBackground ? (
                    <Image
                      style={styles.imageMerchantBottomSheet}
                      source={{uri: order.order.merchantID.imageBackground}}
                    />
                  ) : (
                    <Image
                      style={styles.imageMerchantBottomSheet}
                      source={require('../../../assets/NoAvatarSquare.png')}
                    />
                  )}
                  <View
                    style={styles.viewContainerInformationMerchatBottomSheet}>
                    <Text
                      style={styles.textNameMerchantBottomSheet}
                      numberOfLines={1}>
                      {order.order.merchantID.name}
                    </Text>
                    <Text
                      style={styles.textAddressMerchantBottomSheet}
                      numberOfLines={1}>
                      {order.order.merchantID.address}
                    </Text>
                    <View style={styles.viewContainerRating}>
                      <StarRating
                        disabled={true}
                        maxStars={1}
                        rating={0}
                        color={'#FC6E2A'}
                        starSize={22}
                        starStyle={{marginHorizontal: 0}}
                        onChange={() => {}}
                      />
                      <Text style={styles.textRatingBottomSheet}>
                        {(order.order.merchantID.rating).toFixed(1)}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.viewInformationMerchantBottomSheet}>
                  {order.order.customerID.avatar ? (
                    <Image
                      style={styles.imageMerchantBottomSheet}
                      source={{uri: `${order.order.customerID.avatar}`}}
                    />
                  ) : (
                    <Image
                      style={styles.imageMerchantBottomSheet}
                      source={require('../../../assets/NoAvatarSquare.png')}
                    />
                  )}
                  <View
                    style={styles.viewContainerInformationMerchatBottomSheet}>
                    <Text
                      style={styles.textNameMerchantBottomSheet}
                      numberOfLines={1}>
                      {order.order.customerID.fullName}
                    </Text>
                    <Text
                      style={styles.textAddressMerchantBottomSheet}
                      numberOfLines={1}>
                      {order.order.deliveryAddress}
                    </Text>
                    <View style={styles.viewContainerRating}>
                      <StarRating
                        disabled={true}
                        maxStars={1}
                        rating={0}
                        color={'#FC6E2A'}
                        starSize={22}
                        starStyle={{marginHorizontal: 0}}
                        onChange={() => {}}
                      />
                      <Text style={styles.textRatingBottomSheet}>
                        {(order.order.merchantID.rating).toFixed(1)}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              {!detailFoodOrder && (
                <View style={styles.viewTotalDistance}>
                  <Text style={styles.textNumberDistanceBottomSheet}>
                    {distance}
                  </Text>
                  <Text style={styles.textWishBottomSheet}>
                    Chúc tài xế thượng lộ bình an
                  </Text>
                </View>
              )}
              {index == 2 && (
                <View style={styles.viewTotalDistance}>
                  <Text style={styles.textNumberDistanceBottomSheet}>
                    {distanceCustomer}
                  </Text>
                  <Text style={styles.textWishBottomSheet}>
                    Chúc tài xế thượng lộ bình an
                  </Text>
                </View>
              )}
              {detailFoodOrder && index == 1 && (
                <View style={styles.viewListItemInformationFoodBottomSheet}>
                  <View
                    style={[
                      styles.viewContainerIconBottomSheet,
                      {marginBottom: 15},
                    ]}>
                    <Text style={styles.textListFoodBottomSheet}>
                      Danh Sách Món
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={styles.textCodeOrdersBottomSheet}>
                      #{order.order._id}
                    </Text>
                  </View>
                  <FlatList
                    data={detailFoodOrder}
                    renderItem={handleFlatlistFood}
                    key={(index, item) => item.id}
                    scrollEnabled={false}
                  />
                </View>
              )}
              <View style={styles.viewContainerStepsDeliveryBottomSheet}>
                {detailFoodOrder ? (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <MaterialIcons
                      style={[
                        styles.IconStepsLoadDeliveryBottomSheet,
                        {backgroundColor: '#005987'},
                      ]}
                      color={'white'}
                      name={'done'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      shipper đã đến nhà hàng
                    </Text>
                  </View>
                ) : (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <Feather
                      style={[
                        styles.IconStepsLoadDeliveryBottomSheet,
                        {backgroundColor: '#005987'},
                      ]}
                      color={'white'}
                      name={'loader'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      shipper đã đến nhà hàng
                    </Text>
                  </View>
                )}
                {index >= 1 ? (
                  <View
                    style={[
                      styles.viewConnectingWireBottomSheet,
                      {borderStartColor: '#19D6E5'},
                    ]}
                  />
                ) : (
                  <View style={styles.viewConnectingWireBottomSheet} />
                )}

                {index == 1 ? (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <Feather
                      style={[
                        styles.IconStepsLoadDeliveryBottomSheet,
                        {backgroundColor: '#005987'},
                      ]}
                      color={'white'}
                      name={'loader'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      Shipper đã lấy món ăn
                    </Text>
                  </View>
                ) : index >= 2 ? (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <MaterialIcons
                      style={[
                        styles.IconStepsLoadDeliveryBottomSheet,
                        {backgroundColor: '#005987'},
                      ]}
                      color={'white'}
                      name={'done'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      Shipper đã lấy món ăn
                    </Text>
                  </View>
                ) : (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <MaterialIcons
                      style={[styles.IconStepsLoadDeliveryBottomSheet]}
                      color={'white'}
                      name={'done'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      Shipper đã lấy món ăn
                    </Text>
                  </View>
                )}
                {index >= 2 ? (
                  <View
                    style={[
                      styles.viewConnectingWireBottomSheet,
                      {borderStartColor: '#19D6E5'},
                    ]}
                  />
                ) : (
                  <View style={styles.viewConnectingWireBottomSheet} />
                )}
                {index == 2 ? (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <Feather
                      style={[
                        styles.IconStepsLoadDeliveryBottomSheet,
                        {backgroundColor: '#005987'},
                      ]}
                      color={'white'}
                      name={'loader'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      Shipper đã đến nơi giao
                    </Text>
                  </View>
                ) : index >= 3 ? (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <MaterialIcons
                      style={[
                        styles.IconStepsLoadDeliveryBottomSheet,
                        {backgroundColor: '#005987'},
                      ]}
                      color={'white'}
                      name={'done'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      Shipper đã đến nơi giao
                    </Text>
                  </View>
                ) : (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <MaterialIcons
                      style={[styles.IconStepsLoadDeliveryBottomSheet]}
                      color={'white'}
                      name={'done'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      Shipper đã đến nơi giao
                    </Text>
                  </View>
                )}

                {index >= 3 ? (
                  <View
                    style={[
                      styles.viewConnectingWireBottomSheet,
                      {borderStartColor: '#19D6E5'},
                    ]}
                  />
                ) : (
                  <View style={styles.viewConnectingWireBottomSheet} />
                )}
                {index == 3 ? (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <Feather
                      style={[
                        styles.IconStepsLoadDeliveryBottomSheet,
                        {backgroundColor: '#005987'},
                      ]}
                      color={'white'}
                      name={'loader'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      Đơn hàng hoàn tất
                    </Text>
                  </View>
                ) : index >= 4 ? (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <MaterialIcons
                      style={[
                        styles.IconStepsLoadDeliveryBottomSheet,
                        {backgroundColor: '#005987'},
                      ]}
                      color={'white'}
                      name={'done'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      Shipper đã đến nơi giao
                    </Text>
                  </View>
                ) : (
                  <View style={styles.viewStepsDeliveryBottomSheet}>
                    <MaterialIcons
                      style={[styles.IconStepsLoadDeliveryBottomSheet]}
                      color={'white'}
                      name={'done'}
                    />
                    <Text style={styles.textStepsDelivery}>
                      Đơn hàng hoàn tất
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.viewLine} />
              <View style={styles.viewSummaryBottomSheet}>
                <Text style={styles.textSummaryBottomSheet}>Tóm tắt</Text>
                <View style={styles.viewContainerSummaryBottomSheet}>
                  <Text style={styles.textItemSummaryBottmSheet}>Giá tiền lấy đồ</Text>
                  <Text style={styles.textItemSummaryBottmSheet}>
                    {order.order.paymentMethod === 3 ?
                    (order.order.voucherID != null && order.order.voucherID.typeOfVoucherID !== "6656cfad8913d56206f64e05" ?
                    formatCurrency(order.order.totalPaid - order.order.voucherID.discountAmount) : 
                    formatCurrency(order.order.totalPaid))
                    :
                    (formatCurrency(0))
                    }
                  </Text>
                </View>
                <View style={styles.viewContainerSummaryBottomSheet}>
                  <Text style={styles.textItemSummaryBottmSheet}>
                    Phí giao hàng
                  </Text>
                  <Text style={styles.textItemSummaryBottmSheet}>
                    {formatCurrency(order.order.deliveryCost)}
                  </Text>
                </View>
                <View style={styles.viewContainerSummaryBottomSheet}>
                  <Text style={[styles.textItemSummaryBottmSheet, styles.textIncomeBottomSheet]}>Thu tiền khách hàng</Text>
                  <Text style={[styles.textItemSummaryBottmSheet,
                      styles.textIncomeBottomSheet,]}>
                    {/* {order.order.paymentMethod === 3 ? formatCurrency(order.order.priceFood) : formatCurrency(0)} */}
                    {order.order.paymentMethod === 3 ? formatCurrency(order.order.totalPaid) : formatCurrency(0)}
                  </Text>
                </View>
                <View style={styles.viewContainerSummaryBottomSheet}>
                  <Text
                    style={
                      styles.textItemSummaryBottmSheet
                    }>
                    Thu nhập
                  </Text>
                  <Text
                    style={
                      styles.textItemSummaryBottmSheet
                    }>
                    {formatCurrency(order.order.revenueDelivery)}
                  </Text>
                </View>
              </View>
              {image && (
                <View
                  style={{
                    height: 190,
                    marginTop: 10,
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: image}}
                  />
                </View>
              )}
              <View style={styles.viewArriveRestaurantBottomSheet}>
                <View style={styles.buttonArriveRestaurantBottomSheet}>
                  <Slider
                    onEndReached={() => {
                      handleUpdateIndex();
                    }}
                    containerStyle={styles.containerStyleSlider}
                    sliderElement={
                      <FontAwesome6
                        style={styles.iconRightBottomSheet}
                        name={'angles-right'}
                        size={30}
                      />
                    }>
                    <Text
                      style={[
                        styles.textArriveRestaurantBottomSheet,
                        {marginStart: 50},
                      ]}>
                      {items[index]}
                    </Text>
                  </Slider>
                </View>
              </View>
              {index >= 3 && (
                <View style={[styles.viewContainerIconBottomSheet]}>
                  {order.order.paymentMethod === 3 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisibleCancelOrder(true);
                      }}
                      style={[
                        styles.buttonTakePhotoBottomSheet,
                        {backgroundColor: '#E04444', flex: 1},
                      ]}>
                      <Text style={styles.textTakePhotoBottomSheet}>
                        Hủy đơn
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        countdownTimePaymentMethod <= 0
                          ? setModalVisibleCancelOrder(true)
                          : null;
                      }}
                      style={[
                        styles.buttonTakePhotoBottomSheet,
                        {backgroundColor: '#E04444', flex: 1},
                      ]}>
                      {countdownTimePaymentMethod <= 0 ? (
                        <Text style={styles.textTakePhotoBottomSheet}>
                          Hủy đơn
                        </Text>
                      ) : (
                        <Text style={styles.textTakePhotoBottomSheet}>
                          Chờ{' '}
                          <Text style={{fontWeight: '400', fontSize: 16}}>
                            {formatTime(countdownTimePaymentMethod)}
                          </Text>
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={openCamera}
                    style={[
                      styles.buttonTakePhotoBottomSheet,
                      {marginStart: 20, flex: 1},
                    ]}>
                    <Text style={styles.textTakePhotoBottomSheet}>
                      Chụp ảnh
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {index == 1 && (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisibleCancelOrder(true);
                  }}
                  style={[
                    styles.buttonTakePhotoBottomSheet,
                    {backgroundColor: '#E04444'},
                  ]}>
                  <Text style={styles.textTakePhotoBottomSheet}>
                    Nhà hàng đóng cửa/hết món
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.viewContainerCallUserBottomSheet}>
              {!showNumberPhone && (
                <View style={styles.viewContainerIconBottomSheet}>
                  <View style={styles.viewInformationUserBottomSheet}>
                    {order.order.customerID.avatar ? (
                      <Image
                        style={styles.avatarCustomerBottomSheet}
                        source={{uri: `${order.order.customerID.avatar}`}}
                      />
                    ) : (
                      <Image
                        style={styles.avatarCustomerBottomSheet}
                        source={require('../../../assets/NoAvatar.jpg')}
                      />
                    )}
                    <View style={styles.viewContainerInformationCustomer}>
                      <Text numberOfLines={1} style={styles.textUserBottomSheet}>
                        {order.order.deliveryFullName || order.order.customerID.fullName}
                      </Text>
                      <View style={[styles.viewContainerRating, {marginTop:6}]}>
                        <StarRating
                          disabled={true}
                          maxStars={1}
                          rating={0}
                          color={'#FC6E2A'}
                          starSize={22}
                          starStyle={{marginHorizontal: 0}}
                          onChange={() => {}}
                        />
                        <Text style={styles.textRatingBottomSheet}>
                          {order.order.customerID.rating ? (order.order.customerID.rating).toFixed(1) : 0}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.viewInformationUserBottomSheet, ]}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowNumberPhone(true);
                      }}>
                      <Ionicons
                        style={styles.iconCallBottomSheet}
                        color={'white'}
                        name={'call-outline'}
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ChatWithCustomer', {
                          order: order.order,
                        });
                      }}>
                      <FontAwesome6
                        style={styles.iconMessageBottomSheet}
                        color={'#005987'}
                        name={'message'}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {showNumberPhone && (
                <View style={styles.viewContainerIconBottomSheet}>
                  <Text style={styles.textCustomerPhoneNumber}>
                    {order.order.deliveryPhonenumber || order.order.customerID.phoneNumber}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleCall(order.order.deliveryPhonenumber || order.order.customerID.phoneNumber);
                    }}>
                    <Ionicons
                      style={styles.iconCallBottomSheet}
                      color={'white'}
                      name={'call-outline'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
        </BottomSheetScrollView>
      ) : (
        <Loading/>
      )}
      </BottomSheet>
    )
  );
};

export default BottomSheetComponent;
