import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontWeight, Size } from '../../../constants/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: FontFamily.poppins
  },
  viewBack: {
    flexDirection: 'row',
    height: 96,
    alignItems: 'center',
    borderBottomColor : '#005987',
    borderBottomWidth : 1,
    justifyContent : 'space-between',
    paddingHorizontal : 16,
    backgroundColor : '#F6F8FA'
  },
  barLeft : {
    flexDirection : 'row'
  },
  viewICBack: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeader: {
    color: '#005987',
    fontSize: 17,
    fontWeight: '400',
    marginStart: 16
  },
  viewInput: {
    width: '100%',
    height: 62,
    backgroundColor: '#F0F5FA',
    borderRadius: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#005987',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingStart: 10,
    paddingEnd: 10
  },
  viewIcImg: {
    width: '10%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    fontSize: 14,
    fontWeight: '700',
    color: '#646982',
    width: '70%',
    paddingHorizontal: 15
  },
  btnSend: {
    width: '10%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtSend: {
    color: 'black',
    fontWeight: 'bold'
  },
  containerMessage: {
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    paddingBottom : 15
  },
  icAvatarCustomer: {
    width: 20,
    marginEnd: 5
  },
  txtMessage: {
    color: 'black',
    fontSize: 18,
    fontFamily: FontFamily.poppins,
  },
  txtTimeMessage: {
    color: Color.text,
    fontSize: 14,
    fontWeight: FontWeight.FW400
  },
  viewContent: {
    width: '100%',
    flexDirection: 'row'
  },
  imgMessage: {
    width: 200,
    aspectRatio: 1,
    resizeMode: "contain"
  }
})