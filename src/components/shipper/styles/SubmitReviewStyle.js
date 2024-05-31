import {StyleSheet, Text, View} from 'react-native';
import {Color, Size, FontWeight, FontFamily} from '../../../constants/theme';
export const styles = StyleSheet.create({
  buttonIcon: {
    width: 45,
    height: 45,
    backgroundColor: Color.bgItem,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 220,
    backgroundColor: Color.white,
    width:'100%',
  },
  imageAvatar: {
    width: 68,
    height: 68,
    borderRadius: 68,
    position: 'absolute',
    top: -30,
  },
  textSumbmitReview: {
    color: Color.white,
    fontSize: Size.S14,
    fontWeight: FontWeight.FW700,
  },
  buttonSubmitReview: {
    alignItems: 'center',
    backgroundColor: Color.primary1,
    borderRadius: 12,
    paddingVertical: 22,
    marginHorizontal: 8,
    marginBottom: 70,
    marginTop:46
  },
  textInputSubmitReview:{
    color: '#646982',
    fontSize: 12,
    fontWeight: '400',
    padding: 10,
  },
  viewContainerInput:{
    height: 74,
    borderRadius: 15,
    backgroundColor: Color.bgInput,
    marginTop: 23,
    width: '100%',
    marginBottom:17,
  },
  textNumberStarRating: {
    marginTop: 5,
    color: Color.text,
    fontSize: 12,
    fontWeight: FontWeight.FW400,
  },
  textReviewCustomer: {
    marginTop: 60,
    color: Color.textBold,
    fontSize: Size.S14,
    fontWeight: FontWeight.FW700,
  },
  viewContainerReviewCustomer: {
    alignItems: 'center',
    backgroundColor: Color.bgItem,
    borderRadius: 15,
    marginTop: 59,
    paddingHorizontal:23,
    position:'relative'
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Color.white,
    fontFamily: FontFamily.poppins,
  },
});
