import {StyleSheet, Text, View} from 'react-native';
import {FontFamily} from '../../../constants/theme';

export const styles = StyleSheet.create({
  viewLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textNumberStatistical: {
    color: '#232323',
    fontSize: 12,
    fontFamily: FontFamily.FF5,
  },
  textNameStatistical: {
    color: '#6C6C6C',
    fontSize: 12,
    fontFamily: FontFamily.FF4,
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
  viewContainer: {
    flex: 1,
    backgroundColor: '#F5FEFF',
    paddingHorizontal: 20,
    paddingTop: 19,
  },
});
