import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import StarRating from 'react-native-star-rating-widget';
import {CreateReivew, GetOrderByID, uploadImage} from '../ShipperHTTP';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../styles/SubmitReviewStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../../user/UserContext';

const SubmitReview = () => {
  const navigation = useNavigation();
  const [ratingCustomer, setRatingCustomer] = useState(0);
  const [ratingMerchant, setRatingMerchant] = useState(0);
  const [descriptionCustomer, setDescriptionCustomer] = useState('');
  const [descriptionMerchant, setDescriptionMerchant] = useState('');
  const [order, setOrder] = useState(null);
  const [image, setImage] = useState([]);
  const {user} = useContext(UserContext);

  const route = useRoute();
  const {id} = route.params;
  const idUser = user.checkAccount._id;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await GetOrderByID(id);
        setOrder(result);
      } catch (error) {
        console.log('Error fetching order:', error);
        throw error;
      }
    };
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleCreateReview = async () => {
    const customerReviewData = {
      orderID: id,
      reviewID: idUser,
      description: descriptionCustomer,
      rating: ratingCustomer,
      typeOfReview: 3,
      images: image,
    };

    const merchantReviewData = {
      orderID: id,
      reviewID: idUser,
      description: descriptionMerchant,
      rating: ratingMerchant,
      typeOfReview: 4,
    };

    try {
      await CreateReivew(customerReviewData);
      const result = await CreateReivew(merchantReviewData);
      if (result.result) {
        navigation.navigate('Trang chủ');
        ToastAndroid.show('Gửi đánh giá thành công', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error creating review:', error);
    }
  };

  /// xử lý hình ảnh
  const takePhoto = useCallback(async response => {
    if (response.didCancel) return;
    if (response.errorCode) {
      console.error('ImagePicker Error: ', response.errorCode);
      return;
    }
    if (response.errorMessage) {
      console.error('ImagePicker Error: ', response.errorMessage);
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      const formData = new FormData();
      formData.append('file', {
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      });
      try {
        const result = await uploadImage(formData);
        setImage([result.url]);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }, []);

  const openCamera = useCallback(() => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    launchCamera(options, takePhoto);
  }, [takePhoto]);

  //hiển thị thư viện
  const openLibrary = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchImageLibrary(options, takePhoto);
  }, []);

  return (
    <View style={styles.viewContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{flex: 1}}>
            <View style={styles.viewContainerReviewCustomer}>
              {order && (
                <Image
                  style={styles.imageAvatar}
                  source={{uri: `${order.order.customerID.avatar}`}}
                />
              )}
              <Text style={styles.textReviewCustomer}>Đánh giá khách hàng</Text>
              <Text style={styles.textNumberStarRating}>
                Bạn đánh giá khách hàng này như thế nào?
              </Text>
              <View style={styles.viewContainerInput}>
                <TextInput
                  placeholder="Nhập phản hồi"
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  style={styles.textInputSubmitReview}
                  onChangeText={text => setDescriptionCustomer(text)}
                />
              </View>
              {image.length > 0 && (
                <View style={styles.viewContainerImage}>
                  <View style={styles.viewIcon}>
                    <TouchableOpacity
                      onPress={openLibrary}
                      style={styles.buttonIcon}>
                      <FontAwesome6 name={'images'} size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setImage([])}
                      style={styles.buttonIcon}>
                      <MaterialIcons name={'delete'} size={30} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewImage}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                      source={{uri: `${image[0]}`}}
                    />
                  </View>
                </View>
              )}
              {image.length <= 0 && (
                <TouchableOpacity onPress={openCamera}>
                  <MaterialCommunityIcons
                    name={'camera-plus-outline'}
                    size={50}
                    color={'#000'}
                  />
                </TouchableOpacity>
              )}
              <StarRating
                rating={ratingCustomer}
                color="#FC6E2A"
                starSize={40}
                onChange={rating => setRatingCustomer(rating)}
                style={{marginTop: 20, marginBottom: 12}}
              />
            </View>
            <View style={styles.viewContainerReviewCustomer}>
              {order && (
                <Image
                  style={styles.imageAvatar}
                  source={{uri: `${order.order.merchantID.imageBackground}`}}
                />
              )}
              <Text style={styles.textReviewCustomer}>Đánh giá nhà hàng</Text>
              <Text style={styles.textNumberStarRating}>
                Bạn đánh giá nhà hàng này như thế nào?
              </Text>
              <View style={styles.viewContainerInput}>
                <TextInput
                  placeholder="Nhập phản hồi"
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  style={styles.textInputSubmitReview}
                  onChangeText={text => setDescriptionMerchant(text)}
                />
              </View>
              <StarRating
                rating={ratingMerchant}
                color="#FC6E2A"
                starSize={40}
                onChange={rating => setRatingMerchant(rating)}
                style={{marginTop: 15, marginBottom: 12}}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleCreateReview}
            style={styles.buttonSubmitReview}>
            <Text style={styles.textSumbmitReview}>Gửi Đánh Giá</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SubmitReview;
