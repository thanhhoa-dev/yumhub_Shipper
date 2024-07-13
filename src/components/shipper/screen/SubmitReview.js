import {
  Alert,
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../../user/UserContext';
import Feather from 'react-native-vector-icons/Feather';

const SubmitReview = () => {
  const navigation = useNavigation();
  const [ratingCustomer, setRatingCustomer] = useState(0);
  const [ratingMerchant, setRatingMerchant] = useState(0);
  const [descriptionCustomer, setDescriptionCustomer] = useState('');
  const [descriptionMerchant, setDescriptionMerchant] = useState('');
  const [index, setIndex] = useState(null);
  const [image, setImage] = useState([]);
  const [imageCustomer, setImageCustomer] = useState([]);
  const {user} = useContext(UserContext);

  const route = useRoute();
  const {order} = route.params;
  const idUser = user.checkAccount._id;

  const handleCreateReview = async () => {
    const customerReviewData = {
      orderID: order.order._id,
      reviewID: idUser,
      description: descriptionCustomer,
      rating: ratingCustomer,
      typeOfReview: 3,
      images: image,
    };

    const merchantReviewData = {
      orderID: order.order._id,
      reviewID: idUser,
      description: descriptionMerchant,
      rating: ratingMerchant,
      typeOfReview: 4,
      images: imageCustomer,
    };

    if (ratingCustomer !== 0 || ratingMerchant !== 0) {
      try {
        if (ratingCustomer !== 0) {
          await CreateReivew(customerReviewData);
        }
        if (ratingMerchant !== 0) {
          await CreateReivew(merchantReviewData);
        }
        navigation.goBack();
        ToastAndroid.show('Gửi đánh giá thành công', ToastAndroid.SHORT);
      } catch (error) {
        console.log('Error creating review:', error);
      }
    } else {
      Alert.alert('Bạn chưa đánh giá nào!!');
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
        if (index === 1) {
          setImage([result.url]);
        } else {
          setImageCustomer([result.url]);
        }
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
      <View style={styles.viewContainerHeader}>
        <View style={{width: 50, height: 50}} />
        <Text style={styles.textTitleHeader}>Đánh giá của bạn</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.buttonHeaderHome}>
          <Feather name={'home'} size={30} color={'#19D6E5'} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{flex: 1}}>
            <View style={styles.viewContainerReviewCustomer}>
              <Text style={styles.textReviewCustomer}>
                Mời tài xế đánh giá cửa hàng
              </Text>
              <StarRating
                rating={ratingMerchant}
                color="#FC6E2A"
                starSize={40}
                onChange={rating => setRatingMerchant(rating)}
                style={{marginTop: 20, marginBottom: 12}}
                enableHalfStar={false}
              />
              <View style={styles.viewContainerInput}>
                <TextInput
                  placeholder="Nhận xét và đánh giá..."
                  placeholderTextColor={'#74788C'}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  style={styles.textInputSubmitReview}
                  onChangeText={text => setDescriptionMerchant(text)}
                />
                <TouchableOpacity
                  style={{position: 'absolute', bottom: 5, right: 5}}
                  onPress={() => {
                    [openCamera(), setIndex(1)];
                  }}>
                  <MaterialCommunityIcons
                    name={'camera-plus-outline'}
                    size={35}
                    color={'#333'}
                  />
                </TouchableOpacity>
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
            </View>
            <View style={styles.viewContainerReviewCustomer}>
              <Text style={styles.textReviewCustomer}>
                Mời tài xế đánh giá khách hàng
              </Text>
              <StarRating
                rating={ratingCustomer}
                color="#FC6E2A"
                starSize={40}
                onChange={rating => setRatingCustomer(rating)}
                style={{marginTop: 15, marginBottom: 12}}
                enableHalfStar={false}
              />
              <View style={styles.viewContainerInput}>
                <TextInput
                  placeholder="Nhận xét và đánh giá..."
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  style={styles.textInputSubmitReview}
                  onChangeText={text => setDescriptionCustomer(text)}
                />
                <TouchableOpacity
                  style={{position: 'absolute', bottom: 5, right: 5}}
                  onPress={() => {
                    [openCamera(), setIndex(2)];
                  }}>
                  <MaterialCommunityIcons
                    name={'camera-plus-outline'}
                    size={35}
                    color={'#333'}
                  />
                </TouchableOpacity>
              </View>
              {imageCustomer.length > 0 && (
                <View style={styles.viewContainerImage}>
                  <View style={styles.viewIcon}>
                    <TouchableOpacity
                      onPress={openLibrary}
                      style={styles.buttonIcon}>
                      <FontAwesome6 name={'images'} size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setImageCustomer([])}
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
                      source={{uri: `${imageCustomer[0]}`}}
                    />
                  </View>
                </View>
              )}
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
