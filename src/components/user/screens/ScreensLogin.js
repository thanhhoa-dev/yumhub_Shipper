import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const ScreensLogin = ()=> {
    return (
        <>
        <View>
            <View><Image source={require('../../Assets/right-arrow.png')} style={[styles.icon]} /></View>
        <View style={{margin:20}}>
            <View ><Text style={{color:"black", fontSize:28, fontWeight:'800'}}>Nhập mã xác thực</Text></View>
            <View style={{marginTop:20}}><Text style={{color:"black", fontSize:20}}>Mã xác thực được gửi tới số</Text></View>
            <View><Text style={{color:"black",fontSize:20}}>+843948594. <Text style={{color:"black"}}>Vui lòng kiểm tra tin nhắn và nhập mã xác thực ở đây.</Text></Text></View>
        </View>
        <View style={styles.nhapma}>
            <View style={styles.o}></View>
            <View style={styles.o}></View>
            <View style={styles.o}></View>
            <View style={styles.o}></View>
        </View>
        <View style={{margin:20}}>
            <Text style={{color:"blue",fontSize:20, fontWeight:"600"}}>Gửi lại mã xác thực</Text>
        </View>
        <View style={styles.button}><Text style={{marginTop:10, color:"black",fontWeight:"700", fontSize:20 }}>Xác nhận</Text></View>
        </View>
        </>
    )
};
const styles = StyleSheet.create({
    o:{
        width:50,
        height:50,
        borderWidth:1,
        borderColor:"gray",
        borderRadius:4,
        marginLeft:15
    },
    nhapma:{
        marginTop:20,
        marginLeft:10,
        flexDirection:'row'
    },
    icon:{
        margin:15,
        width:30,
        height:20,
        transform: [{ rotate: '180deg' }]
    },
    button:{
        height :50,
        width: 350,
        backgroundColor:"yellow",
        alignItems:"center",
        marginLeft:20,
        marginTop:300
    }
})
export default ScreensLogin;