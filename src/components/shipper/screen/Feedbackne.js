import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import Entypo from 'react-native-vector-icons/Entypo';
import {getReviews} from '../ShipperHTTP';

const Feedbackne = () => {
  const [reviews, setReviews] = useState([]);
  const [ratingAverageTotal, setRatingAverageTotal] = useState(0);
  // const id = '6604e1ec5a6c5ad8711aebf9'

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReviews();
        setReviews(response.history);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let totalRating = 0;
    if (reviews != null) {
      for (let i = 0; i < reviews.length; i++) {
        totalRating += reviews[i].review.rating;
      }
      if (reviews.length > 0) {
        let total = totalRating / reviews.length;
        setRatingAverageTotal(total);
      } else {
        setRatingAverageTotal(0);
      }
    }
  }, [reviews]);

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
          starSize={15}
          rating={1}
          disabled={false}
          maxStars={1}
          fullStarColor={'#FC6E2A'}
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
    // console.log(item.image[0])
    return (
      <View style={styles.viewContainerItemFeedback}>
        {item.image[0] ? 
        <Image
        source={{uri: `${item.image[0]}`}}
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'red',
          borderRadius: 50,
        }}
      />: 
      <Image
          source={require('../../../assets/ZaloPlay.png')}
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'black',
            borderRadius: 50,
          }}
        />}
        
        <View style={styles.viewContainerItemContent}>
          <View style={styles.viewItemHeader}>
            <Text style={styles.textDate}>{formattedDateTime}</Text>
            <TouchableOpacity>
              <Entypo name={'dots-three-horizontal'} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textNameFeedback}>{item.review.typeOfReview}</Text>
          <View style={{width: 100, paddingVertical: 10}}>
            <StarRating
              starSize={15}
              rating={item.review.rating}
              disabled={false}
              maxStars={5}
              fullStarColor={'#FC6E2A'}
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
          <TouchableOpacity>
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
                disabled={false}
                maxStars={1}
                fullStarColor={'#19D6E5'}
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

export default Feedbackne;

const styles = StyleSheet.create({
  textNameFeedback: {
    fontWeight: '700',
    color: '#000',
  },
  viewItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  viewContainerItemContent: {
    marginStart: 10,
    backgroundColor: '#F6F8FA',
    padding: 10,
    justifyContent: 'center',
    flex: 1,
    borderRadius: 20,
  },
  viewContainerItemContentFeedback: {
    marginTop: 25,
  },
  viewContainerItemFeedback: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  viewChart: {
    backgroundColor: 'red',
    height: 8,
    borderRadius: 20,
  },
  viewTotalChart: {
    flex: 1,
    backgroundColor: '#F5FEFF',
    height: 10,
    paddingHorizontal: 5,
  },
  textNumberStartRating: {
    paddingEnd: 8,
  },
  viewContainerChartStartRating: {
    paddingStart: 30,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textAverageTotal: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000',
    paddingEnd: 10,
  },
  viewContainerAverageTotalStartRating: {
    justifyContent: 'center',
    width: '29%',
    alignItems: 'center',
  },
  viewAverageTotalStartRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTotalStartRating: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#F5FEFF',
    borderRadius: 20,
    paddingStart: 20,
    paddingEnd: 10,
    borderWidth: 1,
    elevation: 15,
  },
  titleHeader: {
    marginStart: 20,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  viewContainer: {
    flex: 1,
    marginHorizontal: 24,
  },
  viewContainerBackgroundColor: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
var numberRating = [
  {number: 5},
  {number: 4},
  {number: 3},
  {number: 2},
  {number: 1},
];
