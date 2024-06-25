import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating-widget';
import Entypo from 'react-native-vector-icons/Entypo';
import {getShipperBeReview} from '../ShipperHTTP';
import Loading from './Loading';
import {styles} from '../styles/FeedbackStyle';
import { UserContext } from '../../user/UserContext';
import { useNavigation } from '@react-navigation/native';

const Feedback = () => {
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [ratingAverageTotal, setRatingAverageTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(UserContext);
  const idUser = user.checkAccount._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getShipperBeReview(idUser);
        const sortedReviews = response.history.sort((a, b) => {
          return new Date(b.review.createAt) - new Date(a.review.createAt);
        });
        setReviews(sortedReviews);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (reviews) {
      let totalRating = 0;
      if (reviews.length > 0) {
        for (let i = 0; i < reviews.length; i++) {
          totalRating += reviews[i].review.rating;
        }
        let total = totalRating / reviews.length;
        setRatingAverageTotal(total);
      } else {
        setRatingAverageTotal(0);
      }
    }
  }, [reviews]);

  if (loading) {
    return <Loading />;
  }

  const calculateWidth = rating => {
    if (reviews != null) {
      const totalReviews = reviews.length;

      const ratingCount = reviews.filter(
        reviews => reviews.review.rating === rating,
      ).length;

      const percentage = (ratingCount / totalReviews) * 100;
      return percentage + '%';
    }
  };

  const renderNumberRating = ({item}) => {
    const width = calculateWidth(item.number);
    return (
      <View style={styles.viewContainerChartStartRating}>
        <Text style={styles.textNumberStartRating}>{item.number}</Text>
        <StarRating
          starSize={20}
          rating={1}
          disabled={true}
          maxStars={1}
          color={'#FC6E2A'}
          onChange={() => {}}
          starStyle={{marginHorizontal: -1}}
        />
        <View style={styles.viewTotalChart}>
          <LinearGradient
            colors={['#5D5DFF', '#6D21B1']}
            style={[styles.viewChart, {width: width}]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}></LinearGradient>
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const originalDateTime = item.review.createAt;
    const date = new Date(originalDateTime);
    const formattedDateTime = date.toISOString().split('T')[0];
    return (
      <View style={styles.viewContainerItemFeedback}>
        {item.user.avatar ? (
          <Image
            source={{uri: `${item.user.avatar}`}}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'red',
              borderRadius: 50,
            }}
          />
        ) : (
          <Image
            source={require('../../../assets/ZaloPlay.png')}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'black',
              borderRadius: 50,
            }}
          />
        )}

        <View style={styles.viewContainerItemContent}>
          <View style={styles.viewItemHeader}>
            <Text style={styles.textDate}>{formattedDateTime}</Text>
            <TouchableOpacity>
              <Entypo name={'dots-three-horizontal'} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textNameFeedback}>
            {item.review.typeOfReview}
          </Text>
          <View style={{width: 100, paddingVertical: 10}}>
            <StarRating
              starSize={22}
              rating={item.review.rating}
              disabled={true}
              maxStars={5}
              color={'#FC6E2A'}
              starStyle={{marginStart: -1}}
              onChange={() => {}}
            />
          </View>
          <Text numberOfLines={2} style={styles.textContentFeedback}>
            {item.review.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.viewContainerBackgroundColor}>
      <View style={styles.viewContainer}>
        <View style={styles.viewHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name={'left'} size={20} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Phản hồi từ khách hàng</Text>
        </View>
        <View style={styles.viewTotalStartRating}>
          <View style={styles.viewContainerAverageTotalStartRating}>
            <View style={styles.viewAverageTotalStartRating}>
              <Text style={styles.textAverageTotal}>{ratingAverageTotal}</Text>
              <StarRating
                rating={1}
                disabled={true}
                maxStars={1}
                color={'#19D6E5'}
                starSize={45}
                starStyle={{marginHorizontal: -2}}
                onChange={() => {}}
              />
            </View>
            {reviews == null ? (
              <Text>0 reviews</Text>
            ) : (
              <Text>{reviews.length} reviews</Text>
            )}
          </View>
          <FlatList
            data={numberRating}
            renderItem={renderNumberRating}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.viewContainerItemContentFeedback}>
          <FlatList
            data={reviews}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default Feedback;

var numberRating = [
  {number: 5},
  {number: 4},
  {number: 3},
  {number: 2},
  {number: 1},
];
