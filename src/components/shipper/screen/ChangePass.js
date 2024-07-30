import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity,ToastAndroid, ScrollView} from 'react-native';
import { changePass } from '../../user/UserHTTP';
import { UserContext } from '../../user/UserContext';


const ChangePass = ({ navigation }) => {
    const [passOld, setPassOld] = useState('');
    const [passNew, setPassNew] = useState('');
    const [passConfirm, setPassWordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { user } = useContext(UserContext)
    const {setUser} = useContext(UserContext);
    const idUser = user.checkAccount._id;
    // console.log(idUser);
    const handleChange = async () => {
        if (passNew !== passConfirm) {
            ToastAndroid.show('Mật khẩu mới không khớp', ToastAndroid.SHORT);
            return;
        }
        try {
            const result = await changePass(passOld, passNew, idUser);
            console.log(result);
            if (result.result) {
                ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
                setUser(null);
            } else {
                ToastAndroid.show(result.message || 'Thay đổi mật khẩu thất bại', ToastAndroid.SHORT);
            }
        } catch (e) {
            ToastAndroid.show('Thay đổi mật khẩu thất bại', ToastAndroid.SHORT);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (

        <View style={{ flex: 1, backgroundColor: '#005987' }}>
            <View style={styles.viewContainer}>
                <View>
                    <Image style={{ height: 117, width: 117, marginEnd: 30 }} source={require("../../../assets/iconAsset.png")}></Image>
                    <Text style={styles.viewText}>Đổi mật khẩu</Text>

                </View>
            </View>
            <ScrollView style={styles.viewBody}>
                <View style={styles.viewEmail}>
                    <Text style={styles.viewTextEmail}>Mật khẩu hiện tại</Text>
                </View>
                <View style={styles.viewTextInputPassword}>
                    <TextInput
                    secureTextEntry={!showPassword}
                        value={passOld}
                        onChangeText={setPassOld}
                        placeholder=""
                        style={styles.viewTextInputEmail}
                        paddingStart={20}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                        <Image style={styles.eyeIcon} source={require("../../../assets/eye.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewEmail}>
                    <Text style={styles.viewTextEmail}>Mật khẩu mới</Text>
                </View>
                <View style={styles.viewTextInputPassword}>
                    <TextInput
                    secureTextEntry={!showPassword}
                        value={passNew}
                        onChangeText={setPassNew}
                        placeholder=""
                        style={styles.viewTextInputEmail}
                        paddingStart={20}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                        <Image style={styles.eyeIcon} source={require("../../../assets/eye.png")} />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewEmail}>
                    <Text style={styles.viewTextEmail}> Nhập lại mật khẩu mới</Text>
                </View>
                <View style={styles.viewTextInputPassword}>
                    <TextInput
                        secureTextEntry={!showPassword}
                        value={passConfirm}
                        onChangeText={setPassWordConfirm}
                        placeholder=""
                        style={styles.viewTextInputEmail}
                        paddingStart={20}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                        <Image style={styles.eyeIcon} source={require("../../../assets/eye.png")} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleChange} style={styles.viewLogin}>
                    <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>Xác nhận</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    viewTextInputPassword:{
        width: 327,
        height: 62,
        backgroundColor: '#F0F5FA',
        alignSelf: 'center',
        marginTop: 8,
        borderRadius: 8,
    },
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
    viewForgotPass: {
        marginTop: 25,
        marginStart: 270,
    },
    viewTextInputEmail: {
        width: 327,
        height: 62,
        backgroundColor: '#F0F5FA',
        alignSelf: 'center',
        marginTop: 8,
        borderRadius: 8,

    },
    eyeButton: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: -12.5 }],
        zIndex: 1,
    },
    viewTextEmail: {
        fontSize: 13,
        fontWeight: '400',
        color: '#32343E',
        marginStart: 44,
        marginTop: 24,
    },
    viewText2: {
        fontSize: 16,
        fontWeight: '400',
        color: 'white',
        alignSelf: 'center',
        marginTop: 9,
    },
    viewText: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white',
        alignSelf: 'center',
        marginTop: 12,
    },
    viewBody: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
    viewContainer: {
        backgroundColor: '#005987',
        width: '100%',
        height: 230,
    }
});

export default ChangePass;