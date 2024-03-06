import React from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
const Register=()=>{
    return (
    <>
    <ScrollView>
        <View style={styles.container}>
    <View style={styles.c1}>
            <View><Image source={require('../../Assets/right-arrow.png')} style={[styles.icon]} /></View>
            <Text style={{color:"black", fontSize:18, fontWeight:"700"}}> Đăng ký trở thành đối tác tài xế</Text>
    </View>
    <View style={styles.c2}>
        <Text style={{color:"black", fontSize:18}}>Hotline hỗ trợ đăng ký và tư vấn hồ sơ: </Text>
        <Text style={{color:"black"}}>- Hồ Chí Minh: <Text style={{color:"blue"}}>0987654321</Text></Text>
        <Text style={{color:"black"}}>- Hà Nội: <Text style={{color:"blue"}}>0987654321</Text></Text>
    </View>
    <View style={styles.c3}>
        <View>
            <Text style={{color:"black"}}>Họ và Tên (bắt buộc)</Text>
        </View>
        <TextInput style={{color:"#696969"}}>Nhập họ và tên</TextInput>
    </View>
    <View style={styles.c4}>
        <View>
            <Text style={{color:"black"}}>Chọn tỉnh/ thành phố (bắt buộc)</Text>
            <Text style={{color:"#696969"}}>Thành phố Hồ Chí Minh</Text>
        </View>
    </View>
    <View style={styles.c5}>
        <View>
            <Text style={{color:"black"}}>Email (bắt buộc)</Text>
        </View>
        <TextInput style={{color:"#696969"}}>Nhập email của bạn</TextInput>
    </View>
    <View style={styles.c6}>
        <View>
            <Text style={{color:"black"}}>Mã giới thiệu (Không bắt buộc)</Text>
        </View>
        <TextInput style={{color:"#696969"}}>Nhập mã giới thiệu</TextInput>
    </View>
    <View style={styles.c7}>
        <Text>Bằng việc nhấn vào nút <Text style={{color:"black"}}>Tiếp tục</Text>. Bạn đông ý với <Text style={{color:"blue"}}>Quy chế sàn TMDT</Text> của be và be được xử lý dữ liệu cá nhân của mình.</Text>
        <View style={styles.confirm}>
            <Text style={{color: "#000",fontWeight:"700", fontSize:18}}>Tiếp tục</Text>
        </View>
    </View>
    </View>
    </ScrollView>
    </>
    )
};
const styles= StyleSheet.create({
    container:{
        backgroundColor:"lightGray"
    },
    c1:{ 
        
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:'center'
    },
    c2:{
        padding:10,
        backgroundColor:"#66CCFF",
        borderWidth:1,
        borderColor:"gray",
        borderRadius:2
    },
    c3:{
        marginTop:20,
        margin:10,
        padding:10,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"gray",
        borderRadius:6
    },
    c4:{
        padding:10,
        margin:10,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"gray",
        borderRadius:6
    },
    c5:{
        padding:10,
        margin:10,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"gray",
        borderRadius:6
    },
    c6:{
        padding:10,
        margin:10,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"gray",
        borderRadius:6
    },
    c7:{
        margin:20
    },
    confirm:{
        marginTop:20,
        height:50,
        width:350,
        backgroundColor:"#FFC125",
        borderWidth:1,
        borderColor:"yellow",
        borderRadius:10,
        justifyContent:"center",
        alignItems:'center'
    },
    icon:{
        margin:15,
        width:30,
        height:20,
        transform: [{ rotate: '180deg' }]
    }
})
export default Register;