import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';
import {getShipperReview} from '../ShipperHTTP';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const {height} = Dimensions.get('window');
import { SetDeleteReview } from '../ShipperHTTP';

const HistoryFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  
  const fetchData = async () => {
    try {
      const response = await getShipperReview();
      const sortedReviews = response.history.sort((a, b) => {
        return new Date(b.review.createAt) + new Date(a.review.createAt);
      });
      setReviews(sortedReviews);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlDeleteReview = async (id) =>{
    
    try {
      const result = await SetDeleteReview(id);
      if(result === "đã xoá thành công"){
        setModalVisible(false);
        fetchData();
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  const renderItemReview = ({item}) => {
    const originalDateTime = item.review.createAt;
    const date = new Date(originalDateTime);
    const formattedDateTime = date.toISOString().split('T')[0];
    return (
      <View style={styles.viewContainerItemContent}>
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(item);
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
        </TouchableOpacity>
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
              ) : (
                <Text style={styles.textNameCustomer}>Tên khách hàng</Text>
              )}
              {selectedItem ? (
                <Text>{(new Date(selectedItem.review.createAt)).toISOString().split('T')[0]}</Text>
              ) : (
                <Text>Thời gian</Text>
              )}
            </View>
            <View>
              {selectedItem ? (
                <StarRating
                  rating={selectedItem.review.rating}
                  disabled={false}
                  maxStars={5}
                  fullStarColor={'#FC6E2A'}
                />
              ) : (
                <StarRating
                  rating={1}
                  disabled={false}
                  maxStars={5}
                  fullStarColor={'#FC6E2A'}
                />
              )}
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
              {selectedItem ? (
                <Text numberOfLines={5}>
                  {selectedItem.review.description}{' '}
                </Text>
              ) : (
                <Text numberOfLines={5}>
                  This Food so tasty & delicious. Breakfast so fast Delivered in
                  my place. Chef is very friendly. I’m really like chef for Home
                  Food Order. Thanks.{' '}
                </Text>
              )}
            </View>
            <View style={styles.viewContainerAction}>
              <TouchableOpacity style={styles.buttonAction} onPress={() => handlDeleteReview(selectedItem.review._id)}>
                <Text style={styles.textAction}>Xóa</Text>
              </TouchableOpacity>
              <TouchableOpacity
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

const styles = StyleSheet.create({
  centeredViewModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  textAction: {
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  buttonAction: {
    backgroundColor: '#E04444',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  viewContainerAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
  },
  viewContenDetailHistory: {
    marginTop: 20,
    backgroundColor: '#F0F5FA',
    borderRadius: 15,
    height: '15%',
    padding: 8,
  },
  buttonIcon: {
    width: 45,
    height: 45,
    backgroundColor: '#F6F8FA',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewImage: {},
  textNameCustomer: {
    fontWeight: '700',
    color: '#000',
    fontSize: 14,
  },
  viewIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    padding: 15,
  },
  viewContainerImage: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#005987',
    overflow: 'hidden',
    height: '50%',
    backgroundColor: '#fff',
    marginTop: 30,
  },
  modalViewInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  modalViewHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  centeredView: {
    backgroundColor: '#F5FEFF',
    width: '100%',
    height: height * 0.95,
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    padding: 10,
  },
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
    borderRadius: 20,
    marginTop: 30,
  },
  textHistoryFeedback: {
    marginStart: 10,
  },
  viewHeader: {
    flexDirection: 'row',
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
