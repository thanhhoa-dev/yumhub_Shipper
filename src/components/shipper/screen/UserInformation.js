import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react'
import {styles} from '../styles/UserInformationStyle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'



const UserInformation = () => {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.ContainerBackground}>
        <ScrollView>
      <View style={styles.ContainerHeader}>
        <View style={styles.ViewHeader}>
             <AntDesign name="arrowleft" size={23}/>
            <Text style={styles.TextInformation}>Thông tin người dùng</Text>
        </View>
        <View style={styles.ContainerInformation}>
            <View style={styles.ViewInformation}>
                <View style={styles.ViewIconPerson}>
                    <Ionicons name="person" size={15} color={"white"} />
                </View>
                <View style={styles.ViewInformationPerson}>
                    <Text style={styles.TextName}>Đoàn thanh hòa</Text>
                    <Text style={styles.TextEmail}>bason1607@gmail.com</Text>
                    <Text style={styles.TextPhone}>+84983826756</Text>
                </View>
            </View>
            <FontAwesome5 name="pen" size={20}/>
        </View>
        <View style={styles.ViewAccuracy}>
            <Text style={styles.TextContentAccuracy}>Xác thực email và giúp tài khoản bảo mật hơn</Text>
            <TouchableOpacity style={styles.ButtonAccuracy}>
                <Text style={styles.TextAccuracy}>Xác thực</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.ContainerFunction}>
            <Text style={styles.TextAccount}>Tài khoản</Text>
            <View style={styles.ContainerFunction}>
                <View  style={styles.ItemFunction}>
                    <MaterialIcons name={"history-edu"} size={25}/>
                    <View style={styles.ViewNameFunction}>
                        <Text style={styles.TextNameFunction}>Đơn hàng</Text>
                        <MaterialIcons size={25} style={styles.IconsFunction} name={"chevron-right"}/>
                    </View>
                </View>
                <View style={styles.ItemFunction}>
                    <MaterialIcons size={25} name={"discount"}/>
                    <View style={styles.ViewNameFunction}>
                        <Text style={styles.TextNameFunction}>Ưu đãi</Text>
                        <MaterialIcons size={25} style={styles.IconsFunction} name={"chevron-right"}/>
                    </View>
                </View>
                <View style={styles.ItemFunction}>
                    <MaterialIcons size={25} name={"payment"}/>
                    <TouchableOpacity style={styles.ButtonNameFunction} onPress={() => setModalVisible(true)}>
                        <View style={styles.ViewNameFunction}>
                            <Text style={styles.TextNameFunction}>Phương thức thanh toán</Text>
                            <MaterialIcons size={25} style={styles.IconsFunction} name={"chevron-right"}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.ItemFunction}>
                    <Entypo size={25} name={"help-with-circle"}/>
                    <View style={styles.ViewNameFunction}>
                        <Text style={styles.TextNameFunction}>Trợ giúp & yêu cầu hỗ trợ</Text>
                        <MaterialIcons size={25} style={styles.IconsFunction} name={"chevron-right"}/>
                    </View>
                </View>
                <View style={styles.ItemFunction}>
                    <MaterialIcons size={25} name={"language"}/>
                    <View style={styles.ViewNameFunction}>
                        <Text style={styles.TextNameFunction}>Thay đổi ngôn ngữ</Text>
                        <MaterialIcons size={25} style={styles.IconsFunction} name={"chevron-right"}/>
                    </View>
                </View>
                <View style={styles.ItemFunction}>
                    <MaterialIcons size={25} name={"location-on"}/>
                    <View style={styles.ViewNameFunction}>
                        <Text style={styles.TextNameFunction}>Địa điểm quên thuộc</Text>
                        <MaterialIcons size={25} style={styles.IconsFunction} name={"chevron-right"}/>
                    </View>
                </View>
                <View style={styles.ItemFunction}>
                    <MaterialIcons  size={25} name={"emoji-people"}/>
                    <View style={styles.ViewNameFunction}>
                        <Text style={styles.TextNameFunction}>Trợ năng</Text>
                        <MaterialIcons size={25} style={styles.IconsFunction} name={"chevron-right"}/>
                    </View>
                </View>
                <View style={styles.ItemFunction}>
                    <FontAwesome5  size={25} name={"user-friends"}/>
                    <View style={styles.ViewNameFunction}>
                        <Text style={styles.TextNameFunction}>Giới thiệu bạn bè</Text>
                        <MaterialIcons size={25} style={styles.IconsFunction} name={"chevron-right"}/>
                    </View>
                </View>
                <View style={styles.ItemFunction}>
                    <MaterialIcons size={25} name={"notifications"}/>
                    <View style={styles.ViewNameFunction}>
                        <Text style={styles.TextNameFunction}>Thông báo</Text>
                        <MaterialIcons size={25} style={styles.IconsFunction} name={"chevron-right"}/>
                    </View>
                </View>
                <View style={styles.ItemFunction}>
                    <MaterialIcons size={25} name={"security"}/>
                    <View style={styles.ViewNameFunction}>
                        <Text style={styles.TextNameFunction}>Bảo mật tài khoản</Text>
                        <MaterialIcons size={25} style={styles.IconsFunction} name={"chevron-right"}/>
                    </View>
                </View>
                <View></View>
            </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(modalVisible);
        }}
      >
        <TouchableOpacity style={{flex:1}} onPress={() => setModalVisible(false)}>
        <View style={styles.BackgroundContainerModal}>
        <View style={styles.ContainerModal}>
            <Text style={styles.TextPaymentMethods}>Phương thức thanh toán</Text>
            <View style={styles.ViewContentPaymentMethods}>
                <Text style={styles.TextNoCash}>Thanh toán không dùng tiền mặt</Text>
                <Text style={styles.TextInstruct}>Đặt mặc định bằng cách trượt sang trái</Text>
            </View>
            <View style={styles.ViewContainerVisa}>
                <View style={styles.ViewVisa}>
                    <Image source={require('../../../assets/visa.png')}/>
                    <Text style={styles.TextNumberVisa}>**3450</Text>
                </View>
                <MaterialIcons name={"chevron-right"}/>
            </View>
            <View style={styles.ViewContainerPaymentMethods}>
                <Text style={styles.TextNoCash}>Thêm phương thức thanh toán</Text>
                <View style={styles.ViewContainerCreditModal}> 
                    <Image source={require('../../../assets/atm-card.png')}/>
                    <View style={styles.ViewContainerCredit}>
                        <View style={styles.ViewContentCredit}>
                            <Text style={styles.TextCredit}>Thẻ tín dụng hoặc ghi nợ</Text>
                            <Text style={styles.TextTypesCredit}>Visa, Mastercard và JCB</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.ButtonAddCard}>
                                <Text style={styles.TextAddCard}>Thêm thẻ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.ViewContainerCreditModal}>
                    <Image style={styles.ImageLogoMoMo} source={require('../../../assets/momo.jpg')}/>
                    <View style={styles.ViewContainerCredit}>
                        <Text style={styles.TextCredit}>Ví MoMo</Text>
                        <View>
                            <TouchableOpacity style={styles.ButtonAddCard}>
                                <Text style={styles.TextAddCard}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.ViewContainerCreditZaloPayModal}>
                    <Image style={styles.ImageLogoZaloPay} source={require('../../../assets/ZaloPlay.png')}/>
                    <View style={styles.ViewContainerCreditZaloPay}>
                        <Text style={styles.TextCredit}>ZaloPlay</Text>
                        <View>
                            <TouchableOpacity style={styles.ButtonAddCard}>
                                <Text style={styles.TextAddCard}>Thêm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.ViewOtherMethod}>
                    <Text style={styles.TextCredit}>Phương thức khác</Text>
                    <Text>Đặt mặc định bằng cách trượt sang trái</Text>
                </View>
                <View style={styles.ViewContainerCash}>
                    <Ionicons name={"cash-outline"} style={styles.IconCash} size={30} color={"#1b9e44"}/>
                    <View style={styles.ViewCash}>
                        <Text style={styles.TextCredit}>Tiền mặt</Text>
                        <Text>Thanh toán dễ dàng hơn khi chuẩn bị đúng số tiền.</Text>
                    </View>
                </View>
            </View>
          {/* <Text style={{ fontSize: 20 }}>This is the modal content</Text>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{ fontSize: 20 }}>Close Modal</Text>
          </TouchableOpacity> */}
        </View>
        </View>
        </TouchableOpacity>
      </Modal>
      </ScrollView>
    </View>
  )
}

export default UserInformation

// export const styles = StyleSheet.create({
//     ContainerBackground:{
//         backgroundColor:Color.backgroundColor,
//         flex:1,
//         marginHorizontal
//     }
// })