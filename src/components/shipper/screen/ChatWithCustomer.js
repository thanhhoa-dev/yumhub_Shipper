import {
    View, Text, TouchableWithoutFeedback,
    FlatList, TextInput,
    TouchableOpacity,
    Image, Modal, ScrollView, Dimensions
} from 'react-native'
import React, { useContext, useEffect, useState, useCallback, useRef } from 'react'
import { UserContext } from '../../user/UserContext'
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../styles/ChatWithCustomerStyle';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { FontWeight } from '../../../constants/theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImage } from '../ShipperHTTP';
import { toast } from '@baronha/ting';
import ImageChat from './ImageChat';
import LoadImage from './LoadImage';

const { width, height } = Dimensions.get('window');
function convertToHHMM(isoString) {

    const date = new Date(isoString);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

const ChatWithCustomer = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const flatListRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const { order } = route.params;
    const [dataMessage, setdataMessage] = useState(null)
    const { user, sendMessageChat, receiveMessageChat } = useContext(UserContext);
    const [message, setmessage] = useState("")
    const [isShowImgFull, setisShowImgFull] = useState(false)
    const [uriFull, seturiFull] = useState(null)

    const scrollToEnd = () => {
        if (flatListRef.current && dataMessage && dataMessage.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }
    useEffect(() => {
        const isShowImg = async () => {
            if (dataMessage) {
                for (let i = 0; i < (dataMessage.length - 1); i++) {
                    if (dataMessage[i].typeUser == "shipper") {
                        if (dataMessage[i + 1].typeUser == "shipper") {
                            dataMessage[i].continue = true
                        } else {
                            dataMessage[i].continue = false
                        }
                    }
                }
            }
        };
        isShowImg();
        setTimeout(() => {
            scrollToEnd()
            setTimeout(() => {
                scrollToEnd()
            }, 3000);
        }, 300);
    }, [dataMessage]);

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
            const loadingMessage = {
                type_mess: 'loadingImg',
                message: '',
                typeUser: 'shipper',
                timestamp: new Date().toISOString(),
            };
            setdataMessage(prevMessages => [...prevMessages, loadingMessage])
            
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
        sendMessageChat('shipper', 'chat', order, message, typeMessage);
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
        if (flatListRef && user && receiveMessageChat) {
            receiveMessageChat(async message => {
                switch (message.command) {
                    case 'chat':
                        if (message.order && message.order.orderID == order._id) {
                            setdataMessage(message.order.fullChat)
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
    const renderContentMessage = (type_mess, message, typeUser, timestamp) => {
        switch (type_mess) {
            case "text":
                return (
                    <View style={[styles.viewMessage, typeUser == 'customer' ? { backgroundColor: '#005987' } : { backgroundColor: '#D3D3D3' }, { paddingVertical: 7 }]}>
                        <Text style={[styles.txtMessage, typeUser == 'customer' ? { color: 'white' } : { color: '#005987' }]}>{message}</Text>
                        <Text style={[styles.txtTimeMessage, typeUser == 'customer' ? { color: 'white' } : { color: '#005987' }]}>{convertToHHMM(timestamp)}</Text>
                    </View>)
            case "image":
                return <TouchableOpacity
                    onPress={() => {
                        seturiFull(message)
                        setisShowImgFull(true)
                    }}
                >
                    <ImageChat uri={message} style={styles.imgMessage} scrollToEnd={scrollToEnd} />
                </TouchableOpacity>
            case "loadingImg":
                return (
                    <View style={[styles.viewMessage, { backgroundColor: '#D3D3D3', paddingVertical: 7 }]}>
                        <Text style={[styles.txtMessage, { color: '#005987' }]}>Đang gửi ảnh...</Text>
                    </View>
                );
            default:
                return null
        }
    }
    
    const renderMessage = ({ item }) => {
        return (
            <View
                style={[item.typeUser == 'shipper' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' },
                item.typeUser == "timeStart" ? { justifyContent: 'center' } : null,
                styles.viewContent]}
            >
                {
                    (item.typeUser == 'customer' && !item.continue) ? <Image style={styles.icAvatarCustomer} source={{ uri: 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png' }} /> : <View style={styles.icAvatarCustomer}></View>
                }
                {
                    (item.type_mess == "timeStart") ?
                        <Text style={styles.txtTimeStart}>{convertToHHMM(item.timestamp)}</Text> :
                        <View style={styles.content}>
                            {
                                renderContentMessage(item.type_mess, item.message, item.typeUser, item.timestamp)
                            }
                        </View>
                }
            </View>
        );
    };
    const handleScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const isEndReached =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        // Xác định hướng lướt
        const currentPosition = contentOffset.y;
        const scrollingUp = currentPosition < scrollPosition;
        const scrollingDown = currentPosition > scrollPosition;
        setScrollPosition(currentPosition);

        // if (scrollingUp) {
        //     console.log('Lướt lên');
        //     // Xử lý sự kiện lướt lên
        // } else if (scrollingDown) {
        //     console.log('Lướt xuống');
        //     // Xử lý sự kiện lướt xuống
        // }

        if (scrollToEnd && isEndReached && scrollingDown) {
            setTimeout(() => {
                if (flatListRef.current && dataMessage && dataMessage.length > 0) {
                    flatListRef.current.scrollToEnd({ animated: true });
                }
            }, 100);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.viewBack}>
                <View style={styles.leftBar}>
                    <TouchableOpacity style={styles.viewICBack}
                        onPress={() => { navigation.goBack() }}
                    >
                        <Icon
                            name="chevron-left"
                            size={12}
                            color="#005987"
                            FontWeight={FontWeight.FW700}
                        />
                    </TouchableOpacity>
                    <Image style={styles.avatarHeader} source={{ uri: "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg" }} />
                    <View>
                        <Text style={styles.nameHeader}>Đoàn Thanh Hòa</Text>
                        <Text style={styles.type}>Khách hàng</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.viewICMore}
                    onPress={() => { navigation.goBack() }}
                >
                    <Icon
                        name="ellipsis-vertical"
                        size={24}
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
                onScroll={handleScroll}
            >
            </FlatList>


            <View style={styles.viewInput}>
                <TouchableOpacity
                    onPress={openCamera}
                    style={styles.viewIcImg}>
                    <Icon
                        name="camera"
                        size={22}
                        color="#646982"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        openLibrary()
                    }}
                    style={styles.viewIcImg}>
                    <Icon
                        name="images"
                        size={24}
                        color="#646982"
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={(text) => setmessage(text)}
                    keyboardType="default"
                    placeholder="nhập tin nhắn"
                    onFocus={() => {
                        setTimeout(() => {
                            scrollToEnd()
                            setTimeout(() => {
                                scrollToEnd()
                            }, 300);
                        }, 300);

                    }}


                />
                <TouchableOpacity
                    onPress={() => {
                        handleSendMessage(message, "text")
                        setmessage("")
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
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isShowImgFull}
                    onRequestClose={setisShowImgFull}
                >
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)' }}>
                        <View style={{
                            width: 50, height: 50, position: 'absolute', zIndex: 100,
                            bottom: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white',
                            borderRadius: 25, alignSelf: 'center'
                        }}>
                            <TouchableOpacity style={styles.viewICBack}
                                onPress={() => { setisShowImgFull(false) }}
                            >
                                <Icon
                                    name="circle-xmark"
                                    size={25}
                                    color="black"
                                    FontWeight={FontWeight.FW700}
                                />
                            </TouchableOpacity>
                        </View>
                        <LoadImage
                            uri={uriFull}
                            style={{ width: '100%', height: '100%', zIndex: 80 }}
                        />
                    </View>

                </Modal>
            </View>
        </View>
    )
}

export default ChatWithCustomer