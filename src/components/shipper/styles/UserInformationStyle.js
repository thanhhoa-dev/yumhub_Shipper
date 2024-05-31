import {StyleSheet, Text, View} from 'react-native';
import {
  Color,
  FontFamily,
  FontStyle,
  Size,
  FontWeight,
} from '../../../constants/theme.jsx';

export const styles = StyleSheet.create({
  ContainerBackground: {
    backgroundColor: Color.white,
    flex: 1,
    fontFamily: FontFamily.poppins
  },
  ContainerHeader: {
    marginHorizontal: 8,
  },
  ViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  TextInformation: {
    marginLeft: 15,
    color: 'black',
    fontSize: Size.contentSize,
    fontWeight: FontWeight.contentFontWeight,
  },
  ContainerInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: 20,
  },
  ViewInformation: {
    flexDirection: 'row',
  },
  ViewIconPerson: {
    width: 35,
    height: 35,
    backgroundColor: 'green',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewInformationPerson: {
    marginLeft: 15,
  },
  TextName: {
    fontSize: Size.titleSize,
    fontWeight: FontWeight.titleFontWeight,
    color: Color.titleColor,
  },
  TextEmail: {
    color: Color.warningColor,
    marginVertical: 5,
  },
  ViewAccuracy: {
    backgroundColor: Color.warningColor,
    borderRadius: 15,
    flexDirection: 'row',
    marginTop: 15,
    padding: 9,
    alignItems: 'center',
  },
  TextContentAccuracy: {
    width: '80%',
    color: 'white',
    fontSize: Size.contentSize,
  },
  ButtonAccuracy: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 7,
    borderRadius: 15,
  },
  TextAccuracy: {
    color: 'white',
    fontWeight: FontWeight.contentFontWeight,
  },
  ContainerFunction: {
    marginTop: 20,
  },
  TextAccount: {
    fontWeight: 'bold',
    color: Color.titleColor,
    fontSize: 18,
  },
  ItemFunction: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    // borderBottomColor:'red',
    marginBottom: 20,
  },
  ButtonNameFunction: {
    width: '100%',
  },
  ViewNameFunction: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginStart: 15,
    paddingBottom: 7,
  },
  TextNameFunction: {
    fontWeight: FontWeight.titleFontWeight,
    color: Color.titleColor,
  },
  IconsFunction: {
    marginEnd: 15,
  },

  BackgroundContainerModal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  ContainerModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignSelf: 'center',
    height: '90%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  TextPaymentMethods: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  ViewContentPaymentMethods: {
    marginTop: 15,
  },
  TextNoCash: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  TextInstruct: {
    fontSize: 13,
    marginTop: 3,
  },
  ViewContainerVisa: {
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  ViewVisa: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextNumberVisa: {
    marginStart: 15,
  },
  ViewContainerCreditModal: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ViewContainerCredit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '89%',
    borderBottomWidth: 1,
    paddingBottom: 13,
  },
  TextCredit: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
  },
  ButtonAddCard: {
    backgroundColor: '#6bffa6',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  TextAddCard: {
    fontWeight: '700',
  },
  ImageLogoMoMo: {
    width: 25,
    height: 25,
    borderRadius: 5,
  },
  ImageLogoZaloPay: {
    width: 25,
    height: 25,
    borderRadius: 5,
  },
  ViewContainerCreditZaloPayModal: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  ViewContainerCreditZaloPay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '89%',
    paddingBottom: 13,
  },
  ViewContainerCash: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  ViewCash: {
    marginStart: 10,
  },
  IconCash: {
    transform: [{rotate: '-90deg'}],
  },
});
