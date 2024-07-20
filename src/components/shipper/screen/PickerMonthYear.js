import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'

const PickerMonthYear = ({monthFilter, yearFilter, setisShowPickerTime, setMonthFilter, setYearFilter}) => {

    const [monthPicker, setMonthPicker] = useState(monthFilter)
    const [yearPicker, setyearPicker] = useState(yearFilter.toString().slice(-2))

    return (
        <View style={styles.overLay}>

            <View style={styles.pickerTime}>
                <TouchableOpacity
                    onPress={() => setisShowPickerTime(false)}
                    style={styles.viewClose}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>X</Text>
                </TouchableOpacity>
                <Text style={styles.titlePickerTime}>Chọn tháng</Text>
                <View style={styles.rowTxtContent}>
                    <Text style={styles.txtContentLabel}>Tháng </Text>
                    <TextInput
                        onChangeText={(month) => {
                            if (month < 12)
                                setMonthPicker(month)
                            if (month >= 12) setMonthPicker("12")
                        }
                        }
                        value={monthPicker+""}
                        maxLength={2}
                        style={styles.inputTime}
                        keyboardType="numeric"
                    />

                    <Text style={styles.txtContentLabel}> / 20 </Text>
                    <TextInput
                        onChangeText={(year) => setyearPicker(year)}
                        value={yearPicker}
                        maxLength={2}
                        style={styles.inputTime}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.viewBtnConfirm}
                    onPress={() => {
                        if (monthPicker.length > 0 && yearPicker > 0) {
                            setMonthFilter(Number(monthPicker))
                            if (yearPicker.length == 1) setYearFilter(20 + "0" + yearPicker)
                            else if (yearPicker < 0) setYearFilter("2000")
                            else setYearFilter(20 + yearPicker)
                        }
                        setisShowPickerTime(false)
                    }}
                >
                    <Text style={styles.txtConfirm}>Tìm Kiếm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PickerMonthYear

const styles = StyleSheet.create({
  overLay : {
    width : '100%',
    height: '100%',
    backgroundColor : 'rgba(0,0,0,0.3)'
  },
  pickerTime: {
    width : 302,
    backgroundColor: '#F6F8FA',
    alignSelf : 'center',
    marginTop : 190,
    borderRadius : 10,
    borderColor : '#005987',
    borderWidth : 1
  },
  viewClose : {
    width : 45,
    height : 45,
    borderRadius : 22.5,
    backgroundColor : '#FC6E2A',
    alignItems : 'center',
    justifyContent : 'center',
    alignSelf : 'flex-end',
    marginTop : -20,
    marginEnd : -20
  },
  titlePickerTime : {
    fontSize : 12,
    fontWeight : '400',
    color : '#005987',
    marginStart : 20
  },
  rowTxtContent : {
    flexDirection : 'row',
    alignSelf : 'center',
    marginTop : 20
  },
  txtContentLabel : {
    fontSize : 14,
    fontWeight : '700',
    color : 'black'
  },
  inputTime : {
      width: 25,
      height: 25,
      backgroundColor: 'white',
      textAlign: 'center',
      borderWidth : 1,
      borderColor : '#32343E',
      lineHeight : 25,
      paddingTop : 0,
      paddingBottom : 0,
      color : '#005987',
      fontSize : 14,
      fontWeight : '700',
      marginTop : -4
  },
  txtConfirm : {
    color : 'black',
    fontSize : 16,
    fontWeight : '700',
    textAlign : 'center',
    lineHeight : 30
  },
  viewBtnConfirm : {
    width : 163,
    height : 35,
    backgroundColor : '#29D8E4',
    borderColor : '#646982',
    borderWidth : 1,
    borderRadius : 5,
    alignSelf : 'center',
    marginTop : 30,
    marginBottom : 22
  }
})