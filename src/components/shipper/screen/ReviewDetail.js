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
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 40,
          }}>
          <StarRating
            rating={item.review.rating}
            disabled={true}
            maxStars={5}
            color={'#FC6E2A'}
            starSize={50}
            starStyle={{marginHorizontal: 10}}
            onChange={() => {}}
          />
        </View>

        <View style={styles.viewContenDetailHistory}>
          <TextInput
            editable
            multiline
            value={item.review.description}
            style={styles.textInputDescription}
          />
        </View>
        {item.user.avatar && (
          <View style={styles.viewContainerImage}>
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              source={{uri: `${item.user.avatar}`}}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewDetail;
