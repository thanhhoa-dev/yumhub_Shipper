import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../styles/AddCardStyle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const AddCard = () => {
  return (
    <View style={styles.ContainerAddCard}>
      <View style={styles.ViewContainerAddCard}>
        {/* <View style={styles.ViewContainerHeader}> */}
          <View style={styles.ViewHeaderContainer}>
            <Ionicons name={"close"} size={25}/>
            <Text style={styles.TextAddCard}>Thêm thẻ</Text>
          </View>
          <View style={styles.ViewContainerSecurity}>
            <View style={styles.ViewSecurity}><MaterialIcons name={"security"} size={16} color={"white"}/></View>
            <Text style={styles.TextSecurityPayment} numberOfLines={3}> Secure Payment</Text>
            <MaterialIcons style={styles.IconRightHeader} name={"chevron-right"} size={18}/>
          </View>
        {/* </View> */}
      </View>
      <View style={styles.ViewContainerMain}>
        <View style={styles.ViewContainerNumberCard}>
          <Text style={styles.TextNumberCard}>SỐ THẺ</Text>
          <TextInput style={styles.TextInputInformation} placeholder='XXX XXX XXX'/>
        </View>
        <View style={styles.ViewInformationCard}>
          <View style={styles.ViewInformation}>
            <Text style={styles.TextNumberCard}>Ngày hết hạn</Text>
            <TextInput style={styles.TextInputInformation} placeholder='MM/YY'/>
          </View>
          <View style={styles.ViewInformation}>
            <Text style={styles.TextNumberCard}>Mã CVV</Text>
            <TextInput style={styles.TextInputInformation} placeholder='XXX'/>
          </View>
        </View>
        <View style={styles.ViewContentDeduction}>
          <Image style={styles.ImageCard} source={require('../../../assets/atm-card.png')}/>
          <Text style={styles.TextContent}>1.000đ sẽ được trừ để xác minh thông tin thẻ.{"\n"}Đừng lo lắng, chúng tôi sẽ hoàn trả lại bạn ngay sau khi hoàn tất</Text>
        </View>
      </View>
      <View style={styles.ViewContainerButtonSave}>
        <View style={styles.ViewContentSave}>
        <MaterialIcons name={"security"} size={16} />
          <Text style={styles.TextSave}>Khi tiếp tục, bạn đồng ý với <Text style={styles.TextCondition}>Điều khoản & Điều kiện</Text></Text>
        </View>
        <TouchableOpacity style={styles.ButtonSave}>
          <Text style={styles.TextSaveCard}>LƯU THẺ</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddCard