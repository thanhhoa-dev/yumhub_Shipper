import {StyleSheet, Text, View} from 'react-native';
import {Color, Size, FontWeight, FontFamily} from '../../../constants/theme';

export const styles = StyleSheet.create({
  container : {
    flex: 1,
    fontFamily : FontFamily.poppins,
    paddingVertical : 20,
  },
  viewIcon : {
    width : 40,
    height : 40,
    backgroundColor : Color.primary1,
    borderRadius : 20,
    justifyContent : "center",
    alignItems : "center"
  },
  viewHeader : {
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "center",
    marginBottom : 20
  },
  textTitle : {
    fontSize : Size.S16,
    color : Color.textBold,
    fontWeight : FontWeight.FW600,
    marginStart: 12
  },
  viewContainerItemHistory : {
    marginBottom : 20,
    width : '100%',
    backgroundColor : '#F6F8FA',
    borderRadius  : 10,
    borderWidth : 1,
    borderColor : '#646982',
    paddingLeft : 10,
    paddingRight : 23,
    paddingTop : 12,
    paddingBottom : 15
  },
  textIDOrder : {
    color : Color.point2,
    fontSize : Size.S20,
    fontWeight : FontWeight.FW400
  },
  viewItemHistory : {
    flexDirection : "row",
  },
  imageAvataCustomer : {
    width : 84,
    height : 100,
    marginRight : 12.39,
  },
  textNameCustomer : {
    fontSize : Size.S20,
    fontWeight : FontWeight.FW400,
    color : Color.textBold
  },
  textAddressCustomer : {
    fontSize : Size.S14,
    color : Color.text,
    fontWeight : FontWeight.FW400,
    width : 212,
    marginTop : 6
  },
  viewRatingCustomer : {
    marginTop : 7,
    flexDirection : "row"
  },
  textRatingCustomer : {
    fontSize : Size.S16,
    fontWeight : FontWeight.FW700,
    color : Color.primary1,
    marginStart : 6,
    lineHeight : 19
  },
  textDistance : {
    fontSize : Size.S14,
    fontWeight : FontWeight.FW400,
    color : Color.primary1,
    marginStart : 10
  },
  viewTotalPaid : {
    flexDirection : "row",
    justifyContent : "flex-end"
  },
  textTotalPaid : {
    fontSize : Size.S16,
    fontWeight : FontWeight.FW700,
    color : Color.textBold,
  },
  textRevenue : {
    fontSize : Size.S16,
    fontWeight : FontWeight.FW400,
    color : Color.primary1,
    marginStart : 6
  },
  itemHeader : {
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  itemTime : {
    fontSize : 12,
    fontWeight : '400',
    color : '#646982'
  },
  itemStatus : {
    fontSize : 12,
    fontWeight : '700'
  },
  itemID : {
    fontSize : 12,
    fontWeight : '700',
    color : '#646982'
  },
  itemName : {
    marginTop : 12,
    marginBottom : 9
  },
  itemTxTName : {
    fontSize : 20,
    fontWeight : '400',
    color : '#32343E',
  },
  itemRowDetail : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop : 3
  },
  itemTxTLeft : {
    fontSize : 12,
    fontWeight : '400',
    color : '#646982'
  },
  itemTxTRight : {
    fontSize : 12,
    fontWeight : '400',
    color : '#333333'
  },
  viewEmpty : {
    paddingTop : 30,
    paddingHorizontal : 10
  }, 
  txtEmpty : {
    fontSize : 20,
    fontWeight : '700',
    color : '#646982',
    textAlign : 'center'
  }
});
