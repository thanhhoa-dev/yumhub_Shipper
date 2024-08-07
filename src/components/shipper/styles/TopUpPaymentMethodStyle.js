import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {Color, Size, FontWeight, FontFamily} from '../../../constants/theme';

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container : {
    flex: 1,
    fontFamily : FontFamily.poppins,
    backgroundColor : Color.white,
    marginTop : 0,
    paddingStart : 25,
    paddingTop : 25,
    paddingEnd : 25,
    height : height
  },
  viewBack : {
    flexDirection : 'row',
    height : 45,
    alignItems : 'center'
  },
  viewICBack : {
    width : 45,
    height : 45,
    backgroundColor : '#F6F8FA',
    borderRadius : 22.5,
    justifyContent : 'center',
    alignItems : 'center'
  },
  textHeader : {
    color : '#005987',
    fontSize : 17,
    fontWeight : '400',
    marginStart : 16
  },
  rowQuickAmount : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingHorizontal : 9,
    marginTop : 7
  },
  itemQuickAmount : {
    width : 75,
    height : 35,
    borderRadius : 5,
    borderColor : '#005987',
    borderWidth : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  quickAmount : {
    fontSize : 13,
    fontWeight : '700',
    paddingStart : 3
  },
  icCheck : {
    width : 10, 
    height : 10, 
    borderRadius : 5,
    alignItems : 'center', 
    justifyContent : 'center', 
    marginTop : -5
  },
  viewInput : {
    width : '100%',
    height : 62,
    backgroundColor : '#F0F5FA',
    borderRadius : 10,
    paddingStart : 10,
    marginTop : 16,
    borderWidth : 1,
    borderColor : '#005987',
    justifyContent : 'center'
  },
  input : {
    fontSize : 14,
    fontWeight : '700',
    color : '#646982',
    width : '80%'
  },
  rowPaymentMethod : {
    flexDirection : 'row',
    marginTop : 17
  },
  icMoney : {
    width : 30,
    height : 30,
    marginEnd : 12
  },
  txtMoney : {
    height : 30,
    fontSize : 15,
    fontWeight : '700',
    color : 'black',
    lineHeight : 30
  },
  containerPaymentMethod : {
    minHeight : 216,
    width : '100%',
    backgroundColor : '#F0F5FA',
    borderWidth : 1,
    borderColor : '#005987',
    borderRadius : 10,
    marginTop : 9,
    paddingTop : 13,
    paddingStart : 16,
    paddingEnd : 10
  },
  txtTitleMethod : {
    fontSize : 13,
    fontWeight : '700',
    color : Color.textBold,
    paddingStart : 2
  },
  itemPaymentMethod : {
    flexDirection : 'row',
    paddingStart : 5,
    marginTop : 12,
    justifyContent : 'space-between',
    borderBottomWidth : 0.5,
    borderTopWidth : 0.5,
    padding : 10,
    borderRadius : 5,
    borderColor : Color.primary1
  },
  icItemPayment : {
    width : 30,
    height : 30,
    objectFit : 'scale-down'
  },
  infoPaymentMethod : {
    width : '68%'
  },
  nameZalo : {
    fontSize : 10,
    fontWeight : '400',
    color : 'black'
  },
  desZalo : {
    fontSize : 9,
    fontWeight : '400',
    color : '#646982'
  },
  btnContinue : {
    width : '100%',
    height : 62,
    backgroundColor : Color.primary2,
    borderRadius : 10,
    alignSelf : 'center',
    justifyContent : 'center',
    marginTop : 26
  },
  bntConfirm : {
    width : '100%',
    height : 62,
    backgroundColor : Color.primary2,
    borderRadius : 10,
    justifyContent : 'center',
    alignSelf : 'flex-end',
    marginTop : 30
  },
  txtConfirm : {
    textAlign : 'center',
    fontSize : 16,
    fontWeight : '700',
    color : 'black'
  },
  rowConfirmAmount : {
    flexDirection : 'row',
    marginTop : 30,
    paddingStart : 24
  },
  icCash : {
    width : 50,
    height : 50,
    marginEnd : 36
  },
  titleConfirmAmount : {
    fontSize : 13,
    fontWeight : '700',
    color : Color.text
  },
  txtAmount : {
    fontSize : 20,
    fontWeight : '700',
    color : 'black'
  },
  containerDetail : {
    width : '90%',
    borderRadius : 10,
    borderColor : '#005987',
    borderWidth : 1,
    marginTop : 28,
    paddingStart : 25,
    paddingEnd : 22,
    paddingTop : 35,
    paddingBottom : 13,
    alignSelf : 'center'
  },
  rowDetail : {
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  txtDetail : {
    fontSize : 16,
    fontWeight : '400',
    color : 'black',
    marginBottom : 22
  },
  viewQR : {
    marginTop : 29,
    alignSelf : 'center'
  },
  label : {
    fontSize : 14,
    fontWeight : '400',
    color : 'black',
    marginTop : 16
  },
  iconStyle : {
    fontSize : 24,
    color : 'black'
  },
  selectedTextStyle : {
    fontSize : 12,
    fontWeight : '400',
    color : 'black'
  },
  viewBody : {
    marginTop : 35.5
  },
  viewHeader : {
    flexDirection : 'row',
    width : '100%',
    justifyContent : 'space-between'
  },
  viewTextHeader : {
    fontSize : 13,
    fontWeight : '400',
    color : 'black'
  },
  viewSendAgain : {
    flexDirection : 'row',
    marginEnd : 3
  },
  txtSendAgain : {
    fontSize : 14,
    fontWeight : '700',
    color : '#005987',
    textDecorationLine: 'underline',
    marginEnd : 3
  },
  txtCountDown : {
    fontSize : 14,
    fontWeight : '400',
    color : '#005987'
  },
  viewTextInputOTP : {
    width : '100%',
    height : 62,
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop : 8.5
  },
  txtOTP : {
    backgroundColor : '#F2F2F2',
    width : 62,
    height : 62,
    borderRadius : 10,
    borderWidth : 1,
    borderColor : '#005987',
    textAlign : 'center',
    color : '#005987',
    fontSize : 16,
    fontWeight : '700'
  }
})