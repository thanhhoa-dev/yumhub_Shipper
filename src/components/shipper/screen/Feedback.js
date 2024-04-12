import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Foundation from 'react-native-vector-icons/Foundation';
import {getReviews} from '../ShipperHTTP';
import StarRating from 'react-native-star-rating';

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const [ratingNe, setRatingNe] = useState();
  const [reviewFilter, setReviewFilter] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReviews();
        setReviews(response.reviews);
        setReviewFilter(response.reviews);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let totalRating = 0;
    for (let i = 0; i < reviews.length; i++) {
      totalRating += reviews[i].rating;
    }
    if (reviews.length > 0) {
      let total = totalRating / reviews.length;
      setRatingNe(total);
    } else {
      setRatingNe(0);
    }
  }, [reviews]);

  const renderItem = ({item}) => {
    const size =
      item.rating === 0
        ? reviews.length
        : reviews.filter(review => review.rating === item.rating).length;

    return (
      <View>
        <TouchableOpacity
          key={item.rating}
          style={[
            styles.viewItemFeedback,
            rating === item.rating && {backgroundColor: '#286b35'},
          ]}
          onPress={() => setRatingFilter(item.rating)}>
          <Text
            style={[
              styles.textItem,
              rating === item.rating && {color: '#fff'},
            ]}>
            {item.rating === 0 ? 'Tất cả' : `${item.rating} sao`} | {size}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const setRatingFilter = rating => {
    if (rating !== 0) {
      setReviewFilter(reviews.filter(e => e.rating === rating));
    } else {
      setReviewFilter(reviews);
    }
    setRating(rating);
  };

  const renderItemContent = ({item}) => {
    return (
      <View style={styles.viewItemContentFeedback}>
        <View style={styles.viewStar}>
          <StarRating fullStarColor={'yellow'} starSize={15} rating={item.rating} disabled={false} emptyStarColor={'yellow'} />
          <Text style={styles.textDate}>21 04 2021</Text>
        </View>
        <Text numberOfLines={2} style={styles.textContenItem}>
          {item.description}
        </Text>
      </View>
    );
  };

  const calculateWidth = rating => {
    const totalReviews = reviews.length;

    const ratingCount = reviews.filter(
      review => review.rating === rating,
    ).length;

    const percentage = (ratingCount / totalReviews) * 100;
    return percentage + '%';
  };

  const renderNumberRating = ({item}) => {
    const width = calculateWidth(item.number);
    return (
      <View style={styles.viewColumn}>
        <Text>{item.number}</Text>
        <View style={styles.viewPercent}>
          <View
            style={[styles.percent, {width: width}]}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <FontAwesome6 name={'arrow-left'} size={25} />
        <Text style={styles.textFeedback}>Phản hồi</Text>
      </View>
      <View style={styles.viewChartFeedback}>
        <Text style={styles.textFeedbackCustomer}>Đánh giá khách hàng</Text>
        <View style={styles.viewMainFeedback}>
          <View style={styles.viewChartMainFeedback}>
            <FlatList
              data={numberRating}
              renderItem={renderNumberRating}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.viewMainRating}>
            <Text style={styles.textMedium}>{ratingNe}</Text>
            <StarRating
              starSize={15}
              rating={ratingNe}
              disabled={false}
              maxStars={5}
              fullStarColor={'yellow'}
              emptyStarColor={'yellow'}
              // onChange={setRatingNe}
            />
            <Text>({reviews.length})</Text>
          </View>
        </View>
        <View style={styles.viewService}>
          <Foundation name={'clipboard-notes'} size={30} />
          <Text style={styles.textService}>
            Tìm hiểu cách cải thiện dịch vụ để làm hài lòng khách hàng hơn
          </Text>
          <FontAwesome6 name={'angle-right'} size={30} />
        </View>
      </View>
      <View style={styles.viewContentFeedback}>
        <Text style={styles.textContentFeedback}>Phản hồi từ khách</Text>
        <FlatList
          data={title}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.rating}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.viewFlatListFeedback}>
        <FlatList
          data={reviewFilter}
          renderItem={renderItemContent}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  textMedium: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#000',
  },
  viewMainRating: {
    alignItems: 'center',
    flex: 1,
  },
  viewChartMainFeedback: {
    width: '70%',
    justifyContent: 'center',
  },
  viewMainFeedback: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  textContenItem: {},
  textDate: {
    fontWeight: '600',
    marginStart: 15,
    color: '#000',
  },
  viewStar: {
    flexDirection: 'row',
  },
  viewItemContentFeedback: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  viewFlatListFeedback: {
    marginHorizontal: 24,
    marginTop: 25,
  },
  textItem: {
    color: '#000',
  },
  viewItemFeedback: {
    // backgroundColor: '#286b35',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginEnd: 10,
    borderWidth: 1,
  },
  textContentFeedback: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
    marginBottom: 15,
  },
  viewContentFeedback: {
    marginStart: 24,
    marginTop: 20,
  },
  textService: {
    width: 250,
    fontSize: 15,
    fontWeight: '600',
  },
  viewService: {
    flexDirection: 'row',
    borderTopWidth: 1,
    justifyContent: 'space-between',
    paddingTop: 15,
    alignItems: 'center',
  },
  textFeedbackCustomer: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  percent: {
    backgroundColor: '#fcb103',
    height: 6,
    // width: '0%',
    borderRadius: 10,
  },
  viewPercent: {
    marginStart: 10,
    backgroundColor: '#b7b9bd',
    height: 6,
    flex:1,
    borderRadius: 10,
  },
  viewColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewChartFeedback: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  textFeedback: {
    fontSize: 25,
    fontWeight: '700',
    marginStart: 20,
  },
  viewHeader: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
  },
});

var title = [
  {rating: 0, number: 34},
  {rating: 5, number: 21},
  {rating: 4, number: 14},
  {rating: 3, number: 12},
  {rating: 2, number: 5},
  {rating: 1, number: 1},
];

var numberRating = [
  {number: 1},
  {number: 2},
  {number: 3},
  {number: 4},
  {number: 5},
];
