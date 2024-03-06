import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
const Start = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.container1}>
                <View><Image source={require('../../Assets/testImage.jpg')} style={[styles.logo]} /></View>
                </View>

                <View>
                    <View style={styles.trainghiem}><Text style={{ color:"black",fontSize:20, fontWeight:"500" }}>Bắt đầu trải nghiệm cùng <Text style={{ color:"black",fontSize:20, fontWeight:"900" }}>Be</Text></Text></View>
                    <View style={styles.inputSdt}>
                        <View><Image source={require('../../Assets/phone-call.png')} style={[styles.icon]} /></View>
                        <View><Text style={styles.text}>Số điện thoại</Text></View>
                        <View><TextInput></TextInput></View>
                        <View><Image source={require('../../Assets/x-mark.png')} style={[styles.iconClose]} /></View>
                    </View>

                </View>
                <View style={styles.footer}>
                    <View><Text style={{ color: "black" }}>Bằng việc nhấn vào nút Tiếp tục, Bạn đồng ý với <Text style={{ color: "blue" }}>Quy chế sàn TMDT</Text> của be và be được xử lý dữ liệu cá nhân của mình.</Text></View>
                    <View style={styles.button}><Text style={{marginTop:10, color:"black"}}>Tiếp tục</Text></View>
                </View>
            </View>
        </>
    )
};
const styles = StyleSheet.create({
    button:{
        height :40,
        width: 350,
        backgroundColor:"yellow",
        alignItems:"center",
        marginTop:15
    },
    trainghiem:{
        marginTop:10,
        marginLeft:70
    },
    container: {
    },
    container1: {
        backgroundColor: "blue",
        height: 120
    },
    logo: {
        height: 75,
        width: 75,
        marginTop:30,
        marginLeft:160
    },
    icon: {
        height: 40,
        width: 40,
        marginTop: 15
    },
    iconClose:{
        width:20,
        height:20,
        marginLeft:100,
        marginTop:30
    },
    inputSdt: {
        padding: 8,
        marginTop: 30,
        marginLeft: 20,
        width: 350,
        height: 90,
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 10,
        flexDirection: "row",
    },
    text: {
        marginLeft:25,
        fontSize:18,
        fontWeight:"700",
        color:"black"
    },
    footer: {
        marginTop:350,
        marginLeft:25,
        borderRadius:10
    }

})
export default Start;