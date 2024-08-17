import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Color, FontFamily, Size, FontWeight} from '../../../constants/theme';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating-widget';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../styles/ReviewDetailStyle';
import LoadImage from './LoadImage';

const ReviewDetail = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const {item} = router.params;

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const numberStarRating = number => {
    switch (number) {
      case 1:
      case 2:
        return 'Tệ';
      case 3:
      case 4:
        return 'Tốt';
      case 5:
        return 'Tuyệt vời';
      default:
        break;
    }
  };

  return (
    <View style={styles.centeredViewModal}>
      <View style={styles.viewHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name={'left'} size={20} color={'#fff'} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={styles.titleHeader}>Chi tiết đánh giá</Text>
        </View>
        <View style={{width: 20}} />
      </View>
      <View style={styles.centeredView}>
        <View style={styles.modalViewInformation}>
          {item ? (
            <Text style={styles.textNameCustomer}>{item.user.fullName}</Text>
          ) : null}
          {item ? (
            <Text style={styles.textDate}>
              {formatDate(item.review.createAt)}
            </Text>
          ) : null}
        </View>
        <Text style={styles.satisfactionLevel}>Mức dộ hài lòng</Text>
        <View
          style={{
            alignItems: 'center',
          }}>
          <StarRating
            rating={item.review.rating}
            disabled={true}
            maxStars={5}
            color={'#FC6E2A'}
            starSize={50}
            starStyle={{justifyContent: 'center', flex: 1, marginBottom: 15}}
            onChange={() => {}}
          />
          <Text style={styles.satisfactionRating}>
            {numberStarRating(item.review.rating)}
          </Text>
        </View>
        {item.review.orderID && (
          <View style={styles.viewContainerImage}>
            <LoadImage
              style={styles.imageReviewDetail}
              uri= {item.review.orderID.imageGiveFood}
            />
          </View>
        )}

        <View style={styles.viewContenDetailHistory}>
          <TextInput
            editable
            multiline
            value={item.review.description}
            style={styles.textInputDescription}
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewDetail;
