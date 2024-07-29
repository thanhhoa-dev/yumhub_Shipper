import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../user/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import Dialog from 'react-native-dialog';
const Menu = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    const idUser = user.checkAccount._id;
    const [visible, setVisible] = useState(false);
    // console.log(user);
    const handleLogout = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const handleConfirm = () => {
        setVisible(false);
        setUser(null);
    };
    const formatCurrency = amount => {
        const formattedAmount = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(amount);
        return formattedAmount.replace('₫', '') + ' ₫';
      };
    return (

        <ScrollView>
            <View style={styles.viewHeader}>
                <View style={{ marginTop: 20, alignSelf: 'center', marginTop: 119 }}>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: '400' }}>Số dư của bạn</Text>
                </View>
                <View style={{ marginTop: 20, alignSelf: 'center', marginTop: 1 }}>
                    <Text style={{ color: "white", fontSize: 40, fontWeight: '700' }}>{formatCurrency(user.checkAccount.balance)} đ</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 20, marginEnd: 20, marginTop: 15 }}>
                    <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => navigation.navigate('TopUpPaymentMethod')}
                    >
                        <Text style={styles.textButton}>Nạp tiền</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('WithdrawPaymentMethod')
                        }}
                        style={styles.viewButton}
                    >
                        <Text style={styles.textButton}>Rút tiền</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
                <View style={styles.viewBoder}>
                    <TouchableOpacity style={styles.viewItem} onPress={() => navigation.navigate('Profile')}>
                        <View>
                            <Feather name={'user'} size={30} color="#FC6E2A" />
                        </View>
                        <View>
                            <Text style={styles.textContent}>Thông tin cá nhân của bạn</Text>
                        </View>
                        <Icon name="chevron-right" size={20} color="#005987" />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('HistoryTransaction')}
                    style={styles.viewItem}>
                        <View>
                            <Feather name={'settings'} size={30} color="#005987" />
                        </View>
                        <View>
                            <Text style={styles.textContent}>Lịch sử nạp rút tiền</Text>
                        </View>
                        <Icon name="chevron-right" size={20} color="#005987" />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewBoder}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Feedback') }} style={styles.viewItem}>
                        <View>
                            <View>
                                <Feather name={'file-text'} size={30} color="#19D6E5" />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textContent}>Đánh giá của khách hàng</Text>
                        </View>
                        <Icon name="chevron-right" size={20} color="#005987" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('HistoryFeedback') }} style={styles.viewItem}>
                        <View>
                            <Feather name={'file-text'} size={30} color="#19D6E5" />
                        </View>
                        <View>
                            <Text style={styles.textContent}>Lịch sử đánh giá</Text>
                        </View>
                        <Icon name="chevron-right" size={20} color="#005987" />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewBoder}>
                    <TouchableOpacity style={styles.viewItem}>
                        <View>
                            <Feather name={'file-text'} size={30} color="#19D6E5" />
                        </View>
                        <View>
                            <Text style={styles.textContent} onPress={() => navigation.navigate('ChangePass')}>Đổi mật khẩu</Text>
                        </View>
                        <Icon name="chevron-right" size={20} color="#005987" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewItem} onPress={handleLogout}>
                        <View>
                            <Feather name={'file-text'} size={30} color="#19D6E5" />
                        </View>
                        <View>
                            <Text style={styles.textContent}>Đăng xuất</Text>
                        </View>
                        <Icon name="chevron-right" size={20} color="#005987" />

                    </TouchableOpacity>
                    <Dialog.Container visible={visible}>
                        <Dialog.Title>Xác nhận đăng xuất</Dialog.Title>
                        <Dialog.Description>
                            Bạn có chắc chắn muốn đăng xuất?
                        </Dialog.Description>
                        <Dialog.Button label="Hủy" onPress={handleCancel} />
                        <Dialog.Button label="Đồng ý" onPress={handleConfirm} />
                    </Dialog.Container>
                </View>
            </ScrollView>
        </ScrollView>
    )
}

export default Menu

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginEnd: 15,
        marginStart: 15,
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