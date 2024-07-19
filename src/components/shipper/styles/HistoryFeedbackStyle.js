import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Color, Size, FontWeight, FontFamily} from '../../../constants/theme';
const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
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
    fontWeight: FontWeight.FW700,
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
  viewContenDetailHistory: {
    marginTop: Size.S20,
    backgroundColor: Color.bgInput,
    borderRadius: 15,
    height: '15%',
    paddingHorizontal: 8,
  },
  buttonIcon: {
    width: 45,
    height: 45,
    backgroundColor: Color.bgItem,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNameCustomer: {
    fontWeight: FontWeight.FW700,
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
    height: '50%',
    backgroundColor: Color.white,
    marginTop: 30,
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
    backgroundColor: Color.background1,
    width: '100%',
    height: height * 0.92,
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: Size.S24,
    borderTopStartRadius: Size.S24,
    padding: Size.S10,
  },
  textDate: {
    color: '#32343E',
    fontSize: 12,
    fontWeight: '400',
  },
  textNameFeedback: {
    fontWeight: FontWeight.FW700,
    color: '#000',
  },
  viewItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Size.S10,
  },
  viewContainerItemContent: {
    marginStart: Size.S10,
    backgroundColor: Color.bgItem,
    padding: Size.S10,
    borderRadius: Size.S20,
    marginBottom: 30,
  },
  textHistoryFeedback: {
    marginStart: Size.S10,
    fontSize: 17,
    fontWeight: '400',
    color: '#32343E',
  },
  viewHeader: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  viewContainer: {
    flex: 1,
    marginHorizontal: Size.S24,
  },
  viewContainerBackgroundColor: {
    backgroundColor: Color.white,
    flex: 1,
    fontFamily: FontFamily.poppins,
  },
});
