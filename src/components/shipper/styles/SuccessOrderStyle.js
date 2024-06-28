import {StyleSheet, Text, View} from 'react-native';
import { Color, Size, FontWeight, FontFamily } from '../../../constants/theme';

export const styles = StyleSheet.create({
  textSuccessOrder: {
    color: Color.primary1,
    fontSize: Size.S22,
    fontWeight: FontWeight.FW400,
    marginHorizontal: Size.S20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height:'50%',
  },
  viewContainer: {
    flex: 1,
    backgroundColor: Color.background1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: FontFamily.poppins,
    backgroundColor:Color.white
  },
});
