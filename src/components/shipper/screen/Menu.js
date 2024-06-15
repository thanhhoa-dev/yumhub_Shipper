import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'


const Menu = ({navigation}) => {
    return (
        <View>
            <View style={styles.viewHeader}>
                <View style={{ marginTop: 20, alignSelf: 'center', marginTop: 119 }}>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: '400' }}>Số dư của cửa hàng</Text>
                </View>
                <View style={{ marginTop: 20, alignSelf: 'center', marginTop: 1 }}>
                    <Text style={{ color: "white", fontSize: 40, fontWeight: '700' }}>500.000.000 đ</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 20, marginEnd: 20, marginTop: 15 }}>
                    <TouchableOpacity style={styles.viewButton}>
                        <Text style={styles.textButton}>Nạp tiền</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewButton}>
                        <Text style={styles.textButton}>Rút tiền</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
                <View style={styles.viewBoder}>
                    <View style={styles.viewItem}>
                        <View>
                            <Image source={require('../../../assets/back.png')} />
                        </View>
                        <View>
                            <Text style={styles.textContent}>Thông tin cá nhân của bạn</Text>
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                            <Image source={require('../../../assets/eye.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewItem}>
                        <View>
                            <Image source={require('../../../assets/back.png')} />
                        </View>
                        <View>
                            <Text style={styles.textContent}>Thông tin của cửa hàng</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={require('../../../assets/eye.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewBoder}>
                    <View style={styles.viewItem}>
                        <View>
                            <Image source={require('../../../assets/back.png')} />
                        </View>
                        <View>
                            <Text style={styles.textContent}>Lịch sử nạp rút tiền</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={require('../../../assets/eye.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewItem}>
                        <View>
                            <Image source={require('../../../assets/back.png')} />
                        </View>
                        <View>
                            <Text style={styles.textContent}>Quản lý tài khoản nhân viên</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={require('../../../assets/eye.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewBoder}>
                    <View style={styles.viewItem}>
                        <View>
                            <Image source={require('../../../assets/back.png')} />
                        </View>
                        <View>
                            <Text style={styles.textContent}>Đánh giá của shipper</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={require('../../../assets/eye.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewItem}>
                        <View>
                            <Image source={require('../../../assets/back.png')} />
                        </View>
                        <View>
                            <Text style={styles.textContent}>Đánh giá của khách hàng</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={require('../../../assets/eye.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginEnd:15,
        marginStart:15,
        marginTop: 28,
    },
    textContent: {
        color: '#32343E',
        fontSize: 15,
        fontWeight: '400',
    },
    viewBoder: {
        backgroundColor: '#F6F8FA',
        width: 327,
        height: 141,
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 20,
    },
    textButton: {
        color: '#005987',
        fontSize: 14,
        fontWeight: '400',
    },
    viewButton: {
        width: 100,
        height: 37,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    viewHeader: {
        width: "100%",
        height: 291,
        backgroundColor: "#005987",
        borderRadius: 25,
    }
})