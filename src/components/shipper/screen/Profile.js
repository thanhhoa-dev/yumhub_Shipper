import { StyleSheet, Text, View, Image, TextInput, Modal, TouchableOpacity, TouchableWithoutFeedback, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { getAll } from '../ShipperHTTP';

const Profile = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [gender, setGender] = useState('Nam');
    const genders = ['Nam', 'Nữ'];

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
        setModalVisible(false);
    };
    useEffect(() => {
        // lấy danh sách từ api
        const fetchData = async () => {
            try {
                const result = await getAll();
                setDataOrder(result.AllShipper);
                // console.log(result)
            } catch (error) {
                console.log('>>>>>error data 143: ', error);
            }
        }
        fetchData();
    }, [])
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', marginBottom: 40 }}>
            <View style={styles.viewHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{}} source={require('../../../assets/IconBack.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 17, fontWeight: '400', color: '#005987', marginStart: 20, marginTop: 10 }}>Thông tin cá nhân</Text>
            </View>
            <View style={{ alignSelf: 'center', marginTop: 31 }}>
                <Image style={styles.viewImage} source={require('../../../assets/Donut.png')} />
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#005987', alignSelf: 'center', marginTop: 17 }}>Quản lý</Text>
            </View>
            <View style={styles.viewBody}>
                <View>
                    <Text style={styles.textContent}>Họ tên</Text>
                    <TextInput style={styles.viewInput}
                        placeholder='Nguyễn Văn A'
                        paddingStart={20}
                    />
                </View>

                <View>
                    <Text style={styles.textContent}>Email</Text>
                    <TextInput style={styles.viewInput}
                        placeholder='Nguyễn Văn A'
                        paddingStart={20}
                    />
                </View>

                <View>
                    <Text style={styles.textContent}>Số điện thoại</Text>
                    <TextInput style={styles.viewInput}
                        placeholder='Nguyễn Văn A'
                        keyboardType='numeric'
                        paddingStart={20}
                    />
                </View>

                <View>
                    <Text style={styles.textContent}>Giới tính</Text>
                    <View style={styles.viewInput}>
                        <Text style={{ fontSize: 16, fontWeight: '400', alignSelf: 'center', marginStart: 20 }}>{gender}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Image style={{ height: 20, width: 20, marginEnd: 20, marginTop: 15 }} source={require('../../../assets/arrow.png')} />
                        </TouchableOpacity>
                    </View>
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}>
                        <TouchableWithoutFeedback
                            activeOpacity={1}
                            onPress={() => setModalVisible(false)}>
                            <View style={styles.modalOverlay} />
                        </TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={genders}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.modalItem}
                                        onPress={() => handleGenderSelect(item)}
                                    >
                                        <Text style={styles.modalItemText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item}
                            />
                        </View>
                    </Modal>
                </View>

                <View>
                    <Text style={styles.textContent}>Ngày sinh</Text>
                    <TextInput style={styles.viewInput}
                        placeholder='Nguyễn Văn A'
                        keyboardType='numeric'
                        paddingStart={20}
                    />
                </View>

                <View>
                    <Text style={styles.textContent}>Hãng xe</Text>
                    <TextInput style={styles.viewInput}
                        placeholder='Nguyễn Văn A'
                        keyboardType='numeric'
                        paddingStart={20}
                    />
                </View>
                
                <View>
                    <Text style={styles.textContent}>Biển số xe</Text>
                    <TextInput style={styles.viewInput}
                        placeholder='Nguyễn Văn A'
                        keyboardType='numeric'
                        paddingStart={20}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.viewLogin}>
                <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>Cập nhật</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    viewLogin: {
        marginStart: 20,
        marginTop: 31,
        width: "80%",
        height: 62,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#19D6E5',
        justifyContent: 'center',
        marginStart: 40,
    },
    textButton: {
        color: 'white',
        fontSize: 14,
        fontWeight: '400',
    },
    viewButton: {
        width: 110,
        height: 37,
        backgroundColor: "#FC6E2A",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    viewButton2: {
        width: 100,
        height: 37,
        backgroundColor: "#E04444",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    viewInput: {
        width: 328,
        height: 56,
        borderRadius: 10,
        backgroundColor: '#F0F5FA',
        alignSelf: 'center',
        marginTop: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    textContent: {
        fontSize: 14,
        fontWeight: '400',
        color: '#32343E',
        marginStart: 44,
        marginTop: 22
    },
    viewImage: {
        width: 128,
        height: 128,
    },
    viewHeader: {
        marginTop: 52,
        marginStart: 24,
        flexDirection: 'row',
    },
    modalOverlay: {
        width: '100%',
        height: 700,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'flex-end',
        alignSelf: 'center'
    },
    modalContent: {
        backgroundColor: 'white',
        paddingStart: 50,
        borderRadius: 10,
        marginTop: 20,
        width: '90%'
    },
    modalItem: {
        padding: 1,
    },
    modalItemText: {
        fontSize: 18,
    },
})