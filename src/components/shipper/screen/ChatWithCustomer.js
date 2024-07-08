import {
    View, Text, TouchableWithoutFeedback,
    FlatList, ScrollView, TextInput,
    TouchableOpacity,
    Image
} from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { UserContext } from '../../user/UserContext'
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../styles/ChatWithCustomerStyle';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { FontWeight } from '../../../constants/theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImage } from '../ShipperHTTP';
import { toast } from '@baronha/ting';
import { PermissionsAndroid } from 'react-native';


function convertToHHMM(isoString) {
    const date = new Date(isoString);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}
const renderContentMessage = (type_mess, message) => {
    switch (type_mess) {
        case "text":
            return <Text style={styles.txtMessage}>{message}</Text>
        case "image":
            return <Image style={styles.imgMessage} source={{ uri: message }} />
        default:
            return null
    }
}

const ChatWithCustomer = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState([]);
    const route = useRoute();

    // const { order } = route.params;
    const order = {
        _id: "660c9dc319f26b917ea15837",
        customerID: {
            _id: "6678dfdc0d224fa4bbb27fa9",
            fullName: "Test 17/6",
            phoneNumber: "0123456789",
            email: "Thanhhoa@gmail.com",
            password: "$2b$10$adM7xLbBVXsIk2yKhEySPew/3NRF17CCyiV9/0/8SX8NR0bCexlIO",
            deleted: false,
            joinDay: "2024-06-17T15:46:52.045Z",
            __v: 0
        },
        merchantID: {
            _id: "660c99c2fc13ae788b50fbdc",
            name: "Cơm chay",
            address: "Cộng Hòa",
            joinDay: "2023-11-22T17:00:00.000Z",
            type: "664ecba2c0ff64d4f3536c62",
            openTime: "9 AM",
            closeTime: "11:53 PM",
            rating: 4780644259,
            deleted: false,
            longitude: 106.691645,
            latitude: 10.847346,
            status: 3,
            balance: 50000,
            email: "hoanglv.610@gmail.com",
            __v: 0,
            imageBackground: "https://topbrands.vn/wp-content/uploads/2021/06/Food-house-1.jpg"
        },
        shipperID: {
            _id: "6659909e220eacc819e64ff2",
            joinDay: "2024-05-31T08:55:58.078Z",
            idBike: "123456789",
            status: 3,
            sex: "Male",
            birthDay: "6/9/2023",
            phoneNumber: "0983826756",
            email: "bason1607@gmail.com",
            address: "97637 Springview Center",
            brandBike: "49643-373",
            modeCode: "Violet",
            deleted: false,
            balance: 0,
            fullName: "Ozawoa Gregi",
            avatar: "https://th.bing.com/th/id/OIP.EZSE_R9Nk9jBS6EGWJss4gHaJ2?rs=1&pid=ImgDetMain",
            __v: 0,
            password: "$2b$10$BfCye2IwVD3yQ2l6awPhq.qkQG7lldsiAgUu/qVcyTI3p7eoJJCpu"
        },
        voucherID: {
            _id: "665fca7c09384790694a53fb",
            startDate: "2024-06-06T00:00:00.000Z",
            endDate: "2024-06-06T00:00:00.000Z",
            nameVoucher: "Lễ Hội Ẩm Thực",
            discountAmount: 14000,
            typeOfVoucherID: "6656cfad8913d56206f64e06",
            code: "LEHOI",
            conditionsApply: 120000,
            __v: 0
        },
        deliveryAddress: "183 Phạm Huy Thông, Phường 6, Gò Vấp, Thành phố Hồ Chí Minh, Vietnam",
        priceFood: 158784,
        deliveryCost: 41249,
        totalPaid: 1347215,
        timeBook: "2024-03-15T17:00:00.000Z",
        timeGetFood: "2023-09-02T17:00:00.000Z",
        timeGiveFood: "2024-01-09T17:00:00.000Z",
        totalDistance: "5",
        status: "661760e3fc13ae3574ab8dde",
        imageGetFood: "https://th.bing.com/th/id/OIP.eGCsbVXzHIb6Scm1EVVm3wHaHa?w=512&h=512&rs=1&pid=ImgDetMain",
        imageGiveFood: "https://thumbs.dreamstime.com/b/fat-man-eating-fast-food-hamberger-breakfast-overweight-person-diet-failure-happy-smile-who-spoiled-healthy-huge-92164278.jpg?w=400",
        __v: 0,
        paymentMethod: 1,
        revenueDelivery: 37124.1,
        revenueMerchant: 142905.6
    }
    // end orderdummy
    const [dataMessage, setdataMessage] = useState(null)
    const { user, sendMessageChat, receiveMessageChat } = useContext(UserContext);
    const [message, setmessage] = useState("")

    const takePhoto = useCallback(async response => {
        
        if (response.didCancel) return;
        if (response.errorCode) {
            console.error('ImagePicker Error: ', response.errorCode);
            return;
        }
        if (response.errorMessage) {
            console.error('ImagePicker Error: ', response.errorMessage);
            return;
        }
        console.log(response);
        if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            const formData = new FormData();
            formData.append('file', {
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName,
            });
            try {
                console.log();
                const result = await uploadImage(formData);
                if (result) {
                    // setImage([result.url]);
                    console.log("xxx", result.url);
                    handleSendMessage(result.url, "image")
                } else {
                    const options = {
                        // ...
                        title: 'Có lỗi xảy ra',
                        message: 'Không thể gửi ảnh, thử lại sau',
                        titleColor: '#E46929',
                        icon: {
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s',
                            size: 24,
                        },
                    };

                    toast(options);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                const options = {
                    // ...
                    title: 'Có lỗi xảy ra',
                    message: 'Không thể gửi ảnh, thử lại sau',
                    titleColor: '#E46929',
                    icon: {
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s',
                        size: 24,
                    },
                };

                toast(options);
            }
        }
    }, []);

    const openCamera = useCallback(async () => {
        async function requestCameraPermission() {
            try {
                const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
                if (hasPermission) 
                    return true;
                else {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: "Cấp quyền!",
                            message: "Cho phép truy cập Camera",
                            buttonNeutral: "Để lần sau",
                            buttonNegative: "Từ chối",
                            buttonPositive: "Đồng Ý"
                        }
                    );
                    return (granted === PermissionsAndroid.RESULTS.GRANTED);
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        const permissionGranted = await requestCameraPermission();
        if (permissionGranted) {
            const options = {
                mediaType: 'photo',
                quality: 1,
                saveToPhotos: true,
            };
            launchCamera(options, takePhoto);
        } else {
            const options = {
                title: 'Có lỗi xảy ra',
                message: 'Bạn từ chối cho phép truy cập camera',
                titleColor: '#E46929',
                icon: {
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s',
                    size: 24,
                },
            };
    
            toast(options);
        }
    }, [takePhoto]);

    //hiển thị thư viện
    const openLibrary = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        await launchImageLibrary(options, takePhoto);
    }, []);

    const handleSendMessage = (message, typeMessage) => {
        sendMessageChat(order, 'shipper', message, typeMessage);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                handleSendMessage("loading", "loading");
            } catch (error) {
                console.log(error);
            }
        };
        if (dataMessage === null)
            fetchData();
        if (user && receiveMessageChat) {
            receiveMessageChat(async message => {
                switch (message.command) {
                    case 'chat':
                        if (message.order._id == order._id) {
                            setdataMessage(message.fullchat);
                            console.log(dataMessage);
                        }
                        break;
                    default:
                        console.log('Unknown command:', message.command);
                        break;
                }
            });
        } else {
            console.log('User is not set or receiveMessage is not defined');
        }
    }, []);

    const renderMessage = ({ item }) => {

        return (
            <View style={[item.typeUser == 'shipper' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, styles.viewContent]}>
                {
                    (item.typeUser == 'shipper') ? null : <Image style={styles.icAvatarCustomer} source={{ uri: order.customerID.avatar ? order.customerID.avatar : 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png' }} />
                }
                <View style={styles.content}>
                    {
                        renderContentMessage(item.type_mess, item.message)
                    }
                    {
                        item.type_mess == "loading" ? null : <Text style={styles.txtTimeMessage}>{convertToHHMM(item.timestamp)}</Text>
                    }

                </View>

            </View>
        );
    };
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.viewBack}>
                    <TouchableOpacity style={styles.viewICBack}
                        onPress={() => {
                            if (confirm) setconfirm(!confirm)
                            else navigation.goBack()
                        }}
                    >
                        <Icon
                            name="chevron-left"
                            size={12}
                            color="#005987"
                            FontWeight={FontWeight.FW700}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Chat với khách hàng</Text>
                </View>
                <FlatList style={styles.containerMessage}
                    data={dataMessage}
                    renderItem={renderMessage}
                >

                </FlatList>
                <View style={styles.viewInput}>
                    <TouchableOpacity
                        onPress={openCamera}
                        style={styles.viewIcImg}>
                        <Icon
                            name="camera"
                            size={22}
                            color="#005987"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={openLibrary}
                        style={styles.viewIcImg}>
                        <Icon
                            name="image"
                            size={22}
                            color="#005987"
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={message}
                        onChangeText={(text) => {
                            setmessage(text)
                        }}
                        keyboardType="default"
                        placeholder=""
                    />
                    <TouchableOpacity
                        onPress={() => {
                            handleSendMessage(message, "text")
                            setmessage('');
                        }}
                        style={styles.btnSend}
                    >
                        <View>
                            <Text style={styles.txtSend}>Gửi</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ChatWithCustomer