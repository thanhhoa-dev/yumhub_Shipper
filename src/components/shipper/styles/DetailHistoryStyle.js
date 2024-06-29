import {StyleSheet, Text, View} from 'react-native';
import {Color, Size, FontWeight, FontFamily} from '../../../constants/theme';

export const styles = StyleSheet.create({
  container : {
    flex: 1,
    fontFamily : FontFamily.poppins,
    backgroundColor : Color.white,
    marginTop : 0
  },
  viewBack : {
    width : "100%",
    height : 50,
    flexDirection : 'row',
    backgroundColor : '#005987',
    justifyContent : 'space-between'
  },
  viewICBack : {
    width : 45,
    height : 45,
    borderRadius : 22.5,
    justifyContent : 'center',
    alignItems : 'center',
  },
  textHeader : {
    fontSize : Size.S14,
    fontWeight : FontWeight.FW400,
    color : Color.white,
    lineHeight : 50,
  },
  titleListFood : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingEnd : 13,
    paddingStart : 2,
    marginBottom : 15,
    marginTop : 19
  }, 
  textTitleListFood : {
    fontSize : Size.S20,
    fontWeight : FontWeight.FW700,
    color : '#005987'
  },
  timeOrder : {
    alignItems : 'flex-end'
  },
  txtID : {
    fontSize : Size.S12,
    fontWeight : FontWeight.FW400,
    color : '#005987'
  },
  txtTime : {
    fontSize : Size.S12,
    fontWeight : FontWeight.FW400,
    color : 'black'
  },
  viewContainerItemFood : {
    paddingStart : 13,
    paddingEnd : 8,
    marginBottom : 15
  },
  headerItemFood : {
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  headername : {
    flexDirection : 'row'
  },
  nameFood : {
    fontSize : Size.S16,
    fontWeight : FontWeight.FW600,
    color : Color.textBold,
    marginRight : 8
  },
  price : {
    fontSize : Size.S14,
    fontWeight : FontWeight.FW600,
    color : Color.text,
    marginTop : 3
  },
  description : {
    paddingLeft : 23,
    fontSize : Size.S14,
    fontWeight : FontWeight.FW600,
    color : "#646982",
    marginTop : 9
  },
  more : {
    paddingLeft : 23,
    fontSize : Size.S14,
    fontWeight : FontWeight.FW600,
    color : Color.primary2
  },
  rowTotal : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingStart : 36,
    paddingEnd : 8,
    marginTop : 15
  },
  total : {
    color : 'black',
    fontSize : Size.S16,
    fontWeight : FontWeight.FW700
  },
  money : {
    fontSize : Size.S14,
    fontWeight : FontWeight.FW600,
    color : Color.text
  },
  moneyEarn : {
    fontSize : Size.S16,
    fontWeight : FontWeight.FW600,
    color : Color.point1
  },
  avatarInfoReivew : {
    width : 45,
    height : 45,
    borderRadius : 22.5
  },
  reviewSection : {
    paddingStart : 9,
    paddingEnd : 19,
    marginTop : 33
  },
  titleReview : {
    fontSize : Size.S16,
    fontWeight : FontWeight.FW700,
    color : 'black',
    marginBottom : 12
  },
  containerReview : {
    paddingStart : 27,
  },
  rowInforReview : {
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  name : {
    fontSize : Size.S16,
    fontWeight : FontWeight.FW700,
    color : 'black',
    marginBottom : 14,
    height : 16,
    lineHeight : 16
  },
  star : {
    width : 27,
    height : 24,
    marginStart : -1
  },
  status : {
    fontSize : Size.S12,
    fontWeight : FontWeight.FW400,
    color : Color.text,
    marginEnd : 2,
    width : 76,
    textAlign : 'right'
  },
  viewMore :  {
    flexDirection : 'row',
    marginTop : 26,
    width : 76,
    justifyContent : 'flex-end'
  },
  moreDetailReview : {
    fontSize : 8,
    fontWeight : FontWeight.FW400,
    color : '#E46929'
  },
  descriptionReview : {
    fontSize : 14,
    fontWeight : FontWeight.FW400,
    color : Color.text,
    marginTop : 15,
    width : '80%'
  },
  txtNote : {
    fontSize : 12,
    fontWeight : FontWeight.FW400,
    color : 'black',
    width : '90%',
    marginTop : 81,
    alignSelf : 'center',
    textAlign : 'center',
  },
  btnBackHome : {
    width : '90%',
    alignSelf : 'center',
    backgroundColor : Color.primary2,
    height : 45,
    borderRadius : 10,
    marginTop : 9,
    justifyContent : 'center',
    marginBottom : 54
  },
  txtBackHome : {
    fontSize : Size.S20,
    fontWeight : FontWeight.FW700,
    color : 'black',
    textAlign : 'center',
    width : '100%'
  }
});
