import {
    View, Text, TouchableWithoutFeedback,
    FlatList, TextInput,
    TouchableOpacity,
    Image, Dimensions, 
} from 'react-native'
import React, { useContext, useEffect, useState, useCallback, useRef } from 'react'
import { UserContext } from '../../user/UserContext'
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../styles/ChatWithCustomerStyle';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImage } from '../ShipperHTTP';
import { toast } from '@baronha/ting';
import { PermissionsAndroid } from 'react-native';
import { Color, FontFamily, FontWeight, Size } from '../../../constants/theme'
import ImageChat from './ImageChat';

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
    const route = useRoute();
    const flatListRef = useRef(null);
    const { order } = route.params;
    console.log(order);
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
        if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            const formData = new FormData();
            formData.append('file', {
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName,
            });
            try {
                const result = await uploadImage(formData);
                if (result) {
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

        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        launchCamera(options, takePhoto);
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
        sendMessageChat('shipper', 'chat', order.order, message, typeMessage);
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
                console.log(message);
                switch (message.command) {
                    case 'chat':
                        if (message.order.orderID == order.order._id) {
                            setdataMessage(message.order.fullChat)
                            flatListRef.current.scrollToEnd({ animated: true });
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
                    (item.typeUser == 'shipper') ? null : <Image style={styles.icAvatarCustomer} source={{ uri: order.order.shipperID.avatar ? order.order.shipperID.avatar : 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png' }} />
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
                    <View style={styles.leftBar}>
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
                        <Image style={styles.avatarHeader} source={uri = order.customerID.avatar} />
                        <View>
                            <Text style={styles.nameHeader}>{order.customerID.fullName}</Text>
                            <Text style={styles.type}>Khách hàng</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.viewICMore}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Icon
                            name="ellipsis-vertical"
                            size={12}
                            color="#005987"
                            FontWeight={FontWeight.FW700}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList style={styles.containerMessage}
                    data={dataMessage}
                    renderItem={renderMessage}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ref={flatListRef}
                />
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
                            <Icon
                                name="paper-plane"
                                size={22}
                                color="#005987"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ChatWithCustomer