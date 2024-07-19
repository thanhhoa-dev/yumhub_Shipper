import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Color, Size, FontFamily} from '../../../constants/theme';
const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  imageReviewDetail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  satisfactionRating: {
    color: '#E46929',
    fontSize: 14,
    fontWeight: '400',
  },
  satisfactionLevel: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
    marginStart: 22,
    marginTop: 30,
  },
  titleHeader: {
    color: '#fff',
    fontSize: 17,
    fontFamily: FontFamily.FF4,
    marginStart: 16,
    textAlign: 'center',
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 50,
    backgroundColor: '#005987',
  },
  centeredViewModal: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontFamily: FontFamily.FF7,
    fontSize: Size.S16,
    color: Color.white,
  },
  buttonAction: {
    backgroundColor: Color.point2,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: Size.S10,
  },
  viewContainerAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Size.S10,
    marginHorizontal: Size.S10,
  },
  textInputDescription: {
    color: '#646982',
    fontSize: 14,
    fontFamily: FontFamily.FF4,
  },
  viewContenDetailHistory: {
    marginTop: 30,
  },
  buttonIcon: {
    width: 45,
    height: 45,
    backgroundColor: Color.bgItem,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDate: {
    color: '#646982',
    fontSize: 12,
    fontFamily: FontFamily.FF4,
  },
  textNameCustomer: {
    fontFamily: FontFamily.FF7,
    color: Color.textBold,
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
    borderColor: Color.primary1,
    overflow: 'hidden',
    height: '35%',
    backgroundColor: Color.white,
    marginTop: 30,
    marginHorizontal: 25,
  },
  modalViewInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Size.S10,
  },
  modalViewHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  centeredView: {
    backgroundColor: '#F5FEFF',
    height: height * 0.95,
    padding: Size.S10,
  },
});
