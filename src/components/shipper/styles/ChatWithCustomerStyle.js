import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontWeight, Size } from '../../../constants/theme'

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: FontFamily.poppins,
    position: 'relative'
},
viewBack: {
    flexDirection: 'row',
    height: 96,
    alignItems: 'center',
    borderBottomColor: '#005987',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F6F8FA'
},
leftBar: {
    flexDirection: 'row'
},
viewICBack: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
},
avatarHeader: {
    width: 50,
    height: 50,
    borderRadius: 25
},
nameHeader: {
    color: '#005987',
    fontSize: 20,
    fontWeight: '700',
    marginStart: 13
},
type: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    marginStart: 13
},
viewICMore: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
},
viewInput: {
    width: '100%',
    height: 74,
    borderTopWidth: 1,
    borderColor: '#DFDFDF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '3%',
    position: 'absolute',
    bottom: 0
},
viewIcImg: {
    width: '10%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 2
},
input: {
    fontSize: 14,
    fontWeight: '400',
    color: '#646982',
    width: '60%',
    paddingHorizontal: 15,
    backgroundColor: '#F0F5FA',
    borderRadius: 8
},
btnSend: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
},
txtSend: {
    color: 'black',
    fontWeight: 'bold'
},
icAvatarCustomer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginEnd: 10,
    alignSelf: 'flex-end'
},
txtMessage: {
    fontSize: 20,
    fontFamily: FontFamily.poppins,
    fontWeight: '700'
},
txtTimeMessage: {
    fontSize: 10,
    fontWeight: FontWeight.FW400
},
viewContent: {
    width: '100%',
    flexDirection: 'row',
},
imgMessage: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#005987'
},
viewMessage: {
    paddingHorizontal: 13,
    borderRadius: 10
},
content: {
    marginVertical: 8
},
containerMessage: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    marginBottom: 74,
    width: '100%'
},
txtTimeStart: {
    fontSize: 14,
    fontWeight: '400',
    color: '#646982',
    marginStart : -40
},
})