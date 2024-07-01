import {StyleSheet} from 'react-native';
import {Size, Color, FontWeight, FontFamily} from '../../../constants/theme';
import { rgbaArrayToRGBAColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export const styles = StyleSheet.create({
  buttonPowerOffStatusShipper: {
    marginStart: 30,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 50,
  },
  textStatusShipper: {
    backgroundColor: 'white',
    paddingVertical: Size.S12,
    paddingHorizontal: Size.S20,
    borderRadius: 50,
    color: Color.textBold,
    fontSize: Size.S16,
    fontWeight: FontWeight.FW700,
  },
  viewStatusShipper: {
    position: 'absolute',
    top: 40,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  viewContainerBottomSheet: {
    flex: 1,
    marginHorizontal:20,
  },
  textCustomerPhoneNumber: {
    color: Color.primary1,
    fontSize: Size.S20,
    fontWeight: FontWeight.FW600,
  },
  viewContainerInformationCustomer: {
    marginStart: 10,
  },
  textReceiveCancelOrder: {
    color: Color.textBold,
    fontSize: Size.S16,
    fontWeight: FontWeight.FW700,
  },
  buttonReceiveCancelOrder: {
    borderRadius: Size.S12,
    backgroundColor: Color.primary2,
    height: 50,
    marginHorizontal: 40,
    marginVertical: 35,
    borderWidth:1,
    borderColor:Color.text,
    justifyContent:'center',
    alignItems:'center'
  },
  textInputCancelOrder: {
    color: Color.textBold,
    fontSize: Size.S14,
    fontWeight: FontWeight.FW400,
  },
  viewContainerTextInputCancelOrder: {
    borderRadius: 15,
    marginHorizontal: Size.S20,
    marginTop: 35,
    paddingHorizontal: 10,
  },
  textReasonForCancellation: {
    color: Color.textBold,
    fontSize: Size.S20,
    fontWeight: FontWeight.FW700,
    marginStart: Size.S20,
    textAlign:'center'
  },
  textTakePhotoBottomSheet: {
    color: Color.white,
    fontSize: Size.S20,
    fontWeight: FontWeight.FW700,
    paddingVertical: 10,
  },
  buttonTakePhotoBottomSheet: {
    backgroundColor: Color.primary2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Size.S20,
  },
  textListFoodBottomSheet: {
    color: Color.textBold,
    fontSize: Size.S20,
    fontWeight: FontWeight.FW700,
  },
  textInformationFoodBottomSheet: {
    color: Color.textBold,
    fontSize: Size.S16,
    fontWeight: FontWeight.FW600,
  },
  viewItemImageFoodBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContainerItemInformationFoodBottomSheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderRadius: Size.S24,
    paddingHorizontal: Size.S20,
    paddingVertical: 10,
    marginTop: 10,
  },
  textCodeOrdersBottomSheet: {
    color: '#646982',
    fontWeight: '400',
    flexShrink: 1,
    marginStart:10
  },
  viewListItemInformationFoodBottomSheet: {
    marginTop: 30,
  },
  textUserBottomSheet: {
    color: Color.primary1,
    fontSize: Size.S20,
    fontWeight: '700',
  },
  iconMessageBottomSheet: {
    padding: 15,
    backgroundColor: Color.white,
    borderRadius: 50,
    borderColor: Color.primary1,
    borderWidth: 1,
  },
  iconCallBottomSheet: {
    padding: 15,
    backgroundColor: Color.primary1,
    borderRadius: 50,
    elevation: 15,
    shadowColor: Color.primary2,
    marginEnd: 15,
  },
  viewContainerIconBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  viewInformationUserBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContainerCallUserBottomSheet: {
    marginTop: 27,
    paddingVertical: Size.S18,
    paddingHorizontal: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    marginHorizontal: 1,
    height: 116,
    justifyContent:'center'
  },
  textArriveRestaurantBottomSheet: {
    color: Color.white,
    fontSize: Size.S23,
    fontWeight: FontWeight.FW500,
    textAlign: 'center',
    flex: 1,
    zIndex: 1,
  },
  iconRightBottomSheet: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Color.white,
    borderRadius: Size.S20,
    zIndex: 2,
  },
  iconContainer: {zIndex: 2},
  buttonArriveRestaurantBottomSheet: {
    backgroundColor: Color.primary1,
    borderRadius: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Size.S20,
    paddingVertical: 10,
    height: 60,
  },
  viewArriveRestaurantBottomSheet: {
    marginTop: Size.S20,
  },
  textIncomeBottomSheet: {
    fontWeight: FontWeight.FW600,
    fontSize: Size.S20,
  },
  textItemSummaryBottmSheet: {
    color: Color.primary1,
    fontSize: Size.S16,
    fontWeight: FontWeight.FW400,
  },
  viewContainerSummaryBottomSheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  textSummaryBottomSheet: {
    color: Color.primary1,
    fontSize: Size.S20,
    fontWeight: FontWeight.FW600,
    paddingBottom: Size.S20,
  },
  viewLine:{
    borderBottomWidth:3,
    borderBottomColor:'#DFDFDF',
    marginVertical:20
  },
  viewSummaryBottomSheet: {
    // marginTop: Size.S20,
  },
  viewConnectingWireBottomSheet: {
    height: 25,
    borderStartWidth: 1.5,
    width: 0,
    marginStart: 10,
    borderStartColor: Color.text,
  },
  IconStepsLoadDeliveryBottomSheet: {
    backgroundColor: '#BFBCBA',
    borderRadius: 15,
    padding: 4,
  },
  textStepsDelivery: {
    paddingStart: 15,
    color: Color.text,
    fontSize: 13,
    fontWeight: FontWeight.FW400,
  },
  viewStepsDeliveryBottomSheet: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContainerStepsDeliveryBottomSheet: {
    marginTop: 30,
  },
  textWishBottomSheet: {
    color: Color.text,
    fontSize: Size.S14,
    fontWeight: FontWeight.FW400,
    lineHeight: Size.S24,
  },
  textNumberDistanceBottomSheet: {
    color: Color.primary1,
    fontSize: 30,
    fontWeight: '800',
  },
  viewTotalDistance: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Size.S20,
  },
  imageMerchantBottomSheet: {
    height: 90,
    width: 90,
    borderRadius: 10,
  },
  textRatingBottomSheet: {
    color: Color.primary1,
    fontSize: Size.S16,
    fontWeight: FontWeight.FW700,
    paddingStart: 10,
  },
  viewContainerRating: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  textAddressMerchantBottomSheet: {
    color: Color.text,
    fontSize: Size.S14,
    fontWeight: FontWeight.FW400,
  },
  textNameMerchantBottomSheet: {
    color: Color.primary1,
    fontSize: Size.S18,
    fontWeight: FontWeight.FW400,
  },
  viewContainerInformationMerchatBottomSheet: {
    marginStart: 15,
    flex: 1,
  },
  viewInformationMerchantBottomSheet: {
    paddingTop: Size.S20,
    flexDirection: 'row',
  },
  contentContainerBottmSheet: {
    flex: 1,
    alignItems: 'center',
  },
  contentTitleBottmSheet: {
    fontSize: Size.S24,
  },
  ViewContainerBottmSheet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textConfirmNo: {
    color: Color.actionText,
    fontSize: Size.S20,
    fontWeight: FontWeight.FW700,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  textConfirmYes: {
    color: Color.actionText,
    fontSize: Size.S20,
    fontWeight: FontWeight.FW700,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  buttonConfirmNo: {
    backgroundColor: '#E46929',
    borderWidth:1,
    borderColor:Color.text
    
  },
  buttonConfirmYes: {
    backgroundColor: Color.text,
  },
  buttonConfirm: {
    borderRadius: 15,
    width: '40%',
  },
  viewButtonConfirm: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  TextConfirmOrder: {
    color: '#333',
    textAlign: 'center',
    fontSize: Size.S16,
    fontWeight: FontWeight.FW700,
    lineHeight: Size.S24 /* 150% */,
  },
  viewContainerConfirm: {
    width: '80%',
    backgroundColor: Color.bgInput,
    borderRadius: 10,
    padding: 15,
    elevation:10,
  },
  textXClose: {
    fontSize: Size.S16,
    color: '#FFF',
  },
  buttonCloseOrder: {
    position: 'absolute',
    right: -10,
    top: -10,
    width: 40,
    height: 40,
    backgroundColor: Color.point1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Size.S20,
  },
  textReceiveOrder: {
    color: '#333333',
    fontSize: Size.S16,
    fontWeight: FontWeight.FW700,
    paddingVertical: Size.S20,
  },
  buttonReceiveOrder: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color.primary1,
    backgroundColor: Color.primary2,
    alignItems: 'center',
    marginHorizontal: Size.S20,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textItemIncom: {
    color: Color.textBold,
    fontSize: 13,
    fontWeight: FontWeight.FW400,
  },
  viewItemIncom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingBottom: 16,
  },
  viewContainerInformationIncom: {
    marginTop: 13,
  },
  textInformation: {
    color: Color.textBold,
    fontSize: Size.S16,
    fontStyle: 'normal',
    fontWeight: FontWeight.FW400,
  },
  viewContainerNameUser: {
    flexDirection: 'row',
  },
  viewContainerInformation: {
    paddingVertical: Size.S14,
  },
  textOrderNew: {
    color: Color.primary1,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '800',
    paddingBottom: 25,
  },
  viewContainerModalOrder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  viewButtonOrder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Size.S20,
  },
  centeredView: {
    width: '90%',
    backgroundColor: '#F6F8FA',
    borderRadius: 35,
    paddingVertical: Size.S20,
    paddingHorizontal: 15,
    borderWidth:1,
    borderColor:'#29D8E4'
  },
  viewContainerGoong: {
    flex: 1,
    fontFamily: FontFamily.poppins,
  },
});
