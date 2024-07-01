import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Color, Size, FontWeight, FontFamily} from '../../../constants/theme';

export const styles = StyleSheet.create({
  viewContainerShowCalender: {
    marginTop: Size.S10,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  viewLine: {
    borderBottomWidth: 2,
    borderBottomColor: '#DFDFDF',
    marginVertical: 20,
  },
  textDateOptions: {
    color: Color.white,
    fontSize: Size.S16,
    fontWeight: FontWeight.FW400,
  },
  buttonDateOptions: {
    backgroundColor: Color.primary2,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
  },
  viewButtonDateOptions: {
    marginTop: 15,
    flexDirection: 'row',
  },
  textNumberStatistical: {
    color: Color.neutral500,
    fontSize: 12,
    fontWeight: FontWeight.FW500,
  },
  textNameStatistical: {
    color: Color.neutral300,
    fontSize: 12,
    fontWeight: FontWeight.FW400,
  },
  viewItemStatistical: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  viewContainerStatisticalRevenue: {
    marginTop: 20,
  },
  textShowDateRevenue: {
    color: Color.neutral500,
    fontSize: 16,
    fontWeight: FontWeight.FW600,
    marginStart: 10,
  },
  iconCoins: {
    backgroundColor: Color.primary1,
    padding: 10,
    borderRadius: 50,
  },
  viewTotalRevenue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainerTotalRevenue: {
    borderWidth: 1,
    borderColor: Color.borderD9D9,
    marginTop: 15,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#FFF',
  },
  textShowDate: {
    color: Color.textBlack,
    fontSize: 12,
    fontWeight: FontWeight.FW400,
  },
  viewHeaderDate: {
    backgroundColor: '#F8F8F8',
    padding: 6,
    borderRadius: 8,
  },
  viewContainerIconRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContainerIconLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewContainer: {
    flex: 1,
    backgroundColor: Color.background1,
    paddingHorizontal: 20,
    paddingTop: 19,
  },
});
