import {StyleSheet, Text, View} from 'react-native';
import { Color, Size, FontWeight, FontFamily } from '../../../constants/theme';

export const styles = StyleSheet.create({
  textNameFeedback: {
    fontWeight: '700',
    color: Color.textBold,
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
    justifyContent: 'center',
    flex: 1,
    borderRadius: 20,
  },
  viewContainerItemContentFeedback: {
    marginTop: 25,
  },
  viewContainerItemFeedback: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  viewChart: {
    backgroundColor: 'red',
    height: 8,
    borderRadius: 20,
  },
  viewTotalChart: {
    flex: 1,
    backgroundColor: Color.background1,
    height: 10,
    paddingHorizontal: 5,
  },
  textNumberStartRating: {
    paddingEnd: 8,
  },
  viewContainerChartStartRating: {
    paddingStart: 30,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textAverageTotal: {
    fontWeight: 'bold',
    fontSize: 30,
    color: Color.textBold,
    paddingEnd: 10,
  },
  viewContainerAverageTotalStartRating: {
    justifyContent: 'center',
    width: '29%',
    alignItems: 'center',
  },
  viewAverageTotalStartRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTotalStartRating: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: Color.background1,
    borderRadius: 20,
    paddingStart: 20,
    paddingEnd: 10,
    borderWidth: 1,
    elevation: 15,
  },
  titleHeader: {
    marginStart: 20,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  viewContainer: {
    flex: 1,
    marginHorizontal: 24,
  },
  viewContainerBackgroundColor: {
    backgroundColor: Color.white,
    flex: 1,
    fontFamily: FontFamily.poppins
  },
});
