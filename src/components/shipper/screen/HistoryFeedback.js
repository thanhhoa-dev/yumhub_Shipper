import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputComponent,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating-widget';
import {getShipperReview} from '../ShipperHTTP';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SetDeleteReview, UpdateShipperReview} from '../ShipperHTTP';
import Loading from './Loading';
import { styles } from '../styles/HistoryFeedbackStyle';

const HistoryFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ratingModal, setRatingModal] = useState(null);
  const [descriptionModal, setDescriptionModal] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getShipperReview();
      const sortedReviews = response.history.sort((a, b) => {
        return new Date(b.review.createAt) + new Date(a.review.createAt);
      });
      setReviews(sortedReviews);
      setLoading(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handlDeleteReview = async id => {
    try {
      const result = await SetDeleteReview(id);
      if (result === 'đã xoá thành công') {
        setModalVisible(false);
        fetchData();
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const renderItemReview = ({item}) => {
    const originalDateTime = item.review.createAt;
    const date = new Date(originalDateTime);
    const formattedDateTime = date.toISOString().split('T')[0];
    return (
      <View style={styles.viewContainerItemContent}>
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(item);
            setRatingModal(item.review.rating);
            setDescriptionModal(item.review.description);
            setModalVisible(true);
          }}>
          <View style={styles.viewItemHeader}>
            <Text style={styles.textDate}>{formattedDateTime}</Text>
            <TouchableOpacity>
              <Entypo name={'dots-three-horizontal'} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textNameFeedback}>{item.user.fullName}</Text>
          <View style={{width: 100, paddingVertical: 10}}>
            <StarRating
              style={{marginLeft: -5}}
              starSize={20}
              rating={item.review.rating}
              disabled={true}
              maxStars={5}
              color={'#FC6E2A'}
              onChange={() => {}}
              starStyle={{marginRight: -1}}
            />
          </View>
          <Text numberOfLines={2} style={styles.textContentFeedback}>
            {item.review.description}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onStarRatingPress = rating => {
    setRatingModal(rating);
  };

  const handleUpdateReview = async id => {
    const data = {
      description: descriptionModal,
      rating: ratingModal,
    };
    try {
      const updatedReview = await UpdateShipperReview(id, data);
      if (updatedReview.result) {
        setModalVisible(false);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.viewContainerBackgroundColor}>
      <View style={styles.viewContainer}>
        <View style={styles.viewHeader}>
          <TouchableOpacity>
            <AntDesign name={'left'} size={20} />
          </TouchableOpacity>
          <Text style={styles.textHistoryFeedback}>Lịch sử đánh giá</Text>
        </View>
        <FlatList
          data={reviews}
          renderItem={renderItemReview}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredViewModal}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.centeredView}>
            <View style={styles.modalViewHeader}>
              <EvilIcons name={'tag'} size={25} color={'#19D6E5'} />
              <TouchableOpacity>
                <Text>Chi tiết đơn hàng</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalViewInformation}>
              {selectedItem ? (
                <Text style={styles.textNameCustomer}>
                  {selectedItem.user.fullName}
                </Text>
              ) : null}
              {selectedItem ? (
                <Text>
                  {
                    new Date(selectedItem.review.createAt)
                      .toISOString()
                      .split('T')[0]
                  }
                </Text>
              ) : (
                <Text>Thời gian</Text>
              )}
            </View>
            <View
              style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <StarRating
                rating={ratingModal}
                disabled={false}
                maxStars={5}
                onChange={rating => onStarRatingPress(rating)}
                color={'#FC6E2A'}
                starSize={50}
                starStyle={{marginHorizontal: 15}}
              />
            </View>
            <View style={styles.viewContainerImage}>
              <View style={styles.viewIcon}>
                <TouchableOpacity style={styles.buttonIcon}>
                  <FontAwesome6 name={'images'} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonIcon}>
                  <MaterialIcons name={'delete'} size={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.viewImage}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                  source={require('../../../assets/ZaloPlay.png')}
                />
              </View>
            </View>
            <View style={styles.viewContenDetailHistory}>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                onChangeText={text => setDescriptionModal(text)}
                value={descriptionModal}
              />
            </View>
            <View style={styles.viewContainerAction}>
              <TouchableOpacity
                style={styles.buttonAction}
                onPress={() => {
                  handlDeleteReview(selectedItem.review._id);
                }}>
                <Text style={styles.textAction}>Xóa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleUpdateReview(selectedItem.review._id);
                }}
                style={[styles.buttonAction, {backgroundColor: '#FC6E2A'}]}>
                <Text style={styles.textAction}>Sửa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HistoryFeedback;
