import { StyleSheet, Dimensions, ScrollView, Text, View, TouchableWithoutFeedback, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Color, FontFamily, FontWeight, Size } from '../../../constants/theme'
import ImageChat from './ImageChat';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { uploadImage } from '../ShipperHTTP';
import { toast } from '@baronha/ting';


const Demo = () => {
    const flatListRef = useRef(null);
    const [listPhoto, setlistPhoto] = useState([])
    const [numColumns, setNumColumns] = useState(2);
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollViewRef = useRef(null);
    const [dataMessage, setdataMessage] = useState([
        {
            typeUser: "timeStart",
            message: "timeStart",
            timestamp: '20 thg 06, 16:21',
            type_mess: "timeStart"
        },
        {
            type_mess: 'text',
            message: 'hello bạn',
            typeUser: 'shipper',
            timestamp: '16:01'
        },
        {
            type_mess: 'text',
            message: 'hello, anh shipper',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'text',
            message: 'hello, anh shipper',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'text',
            message: 'hello, anh shipper',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'text',
            message: 'hello, anh shipper',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'text',
            message: 'hello, anh shipper',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'text',
            message: 'hello, anh shipper',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'text',
            message: 'hello, anh shipper',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'text',
            message: 'hello, anh shipper',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'image',
            message: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_68.jpg',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'image',
            message: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJAUhT-gxAhj1yq1pZuUBj7fbbkqVFjkD_MNSzzv85PwvDkCZ7i2WN4m8NrJ2NlUcg-dM&usqp=CAU',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'image',
            message: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_68.jpg',
            typeUser: 'shipper',
            timestamp: '16:01'
        },
        {
            type_mess: 'image',
            message: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJAUhT-gxAhj1yq1pZuUBj7fbbkqVFjkD_MNSzzv85PwvDkCZ7i2WN4m8NrJ2NlUcg-dM&usqp=CAU',
            typeUser: 'shipper',
            timestamp: '16:01'
        },
        {
            typeUser: "timeStart",
            message: "timeStart",
            timestamp: '20 thg 06, 16:21',
            type_mess: "timeStart"
        },
        {
            type_mess: 'text',
            message: 'hello bạn',
            typeUser: 'shipper',
            timestamp: '16:01'
        },
        {
            type_mess: 'text',
            message: 'hello, anh shipper',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'image',
            message: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_68.jpg',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'image',
            message: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJAUhT-gxAhj1yq1pZuUBj7fbbkqVFjkD_MNSzzv85PwvDkCZ7i2WN4m8NrJ2NlUcg-dM&usqp=CAU',
            typeUser: 'customer',
            timestamp: '16:01'
        },
        {
            type_mess: 'text',
            message: 'hello, anh shipper',
            typeUser: 'customer',
            timestamp: '16:01'
        },
    ])
    const scrollToEnd = () => {
        if (flatListRef.current && dataMessage.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }

    useEffect(() => {
        const isShowImg = async () => {
            for (let i = 0; i < (dataMessage.length - 1); i++) {
                if (dataMessage[i].typeUser == "customer") {
                    if (dataMessage[i + 1].typeUser == "customer") {
                        dataMessage[i].continue = true
                    } else {
                        dataMessage[i].continue = false
                    }
                }
            }
        };
        isShowImg();
        setTimeout(() => {
            scrollToEnd()
            setTimeout(() => {
                scrollToEnd()
            }, 300);
        }, 300);
    }, [dataMessage]);
    const renderContentMessage = (type_mess, message, typeUser, timestamp) => {
        switch (type_mess) {
            // case "timeStart":
            //     return (
            //         <View style={{ backgroundColor: 'red' }}>

            //         </View>
            //     )
            case "text":
                return (
                    <View style={[styles.viewMessage, typeUser == 'shipper' ? { backgroundColor: '#005987' } : { backgroundColor: '#D3D3D3' }, { paddingVertical: 7 }]}>
                        <Text style={[styles.txtMessage, typeUser == 'shipper' ? { color: 'white' } : { color: '#005987' }]}>{message}</Text>
                        <Text style={[styles.txtTimeMessage, typeUser == 'shipper' ? { color: 'white' } : { color: '#005987' }]}>{timestamp}</Text>
                    </View>)
            case "image":
                return <TouchableOpacity
                onPress={()=>{
                    console.log("zoom full screen");
                }}
                >
                <ImageChat uri={message} style={styles.imgMessage} scrollToEnd={scrollToEnd} />
                </TouchableOpacity>
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
                        <Text style={styles.txtTimeStart}>{item.timestamp}</Text> :
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
                if (flatListRef.current && dataMessage.length > 0) {
                    flatListRef.current.scrollToEnd({ animated: true });
                }
            }, 100);
        }
    };
    const openCamera = useCallback(async () => {

        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        launchCamera(options, takePhoto);
    }, [takePhoto]);
    const takePhoto = useCallback(async response => {
        console.log(1);
        if (response.didCancel) return;
        console.log(2);
        if (response.errorCode) {
            console.error('ImagePicker Error: ', response.errorCode);
            return;
        }
        console.log(3);
        if (response.errorMessage) {
            console.error('ImagePicker Error: ', response.errorMessage);
            return;
        }
        console.log(4);
        if (response.assets && response.assets.length > 0) {
            console.log(5);
            const asset = response.assets[0];
            const formData = new FormData();
            formData.append('file', {
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName,
            });
            console.log(asset);
            console.log(formData);
            try {
                const result = await uploadImage(formData);
                console.log("result", result);
                if (result) {

                    // handleSendMessage(result.url, "image")
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
    //hiển thị thư viện
    const openLibrary = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        await launchImageLibrary(options, takePhoto);
    }, []);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const openImagePicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            mediaType: 'launchCamera',
        }).then(image => {
            console.log(image);
            setSelectedImage(...image.path);
        }).catch(error => {
            console.log('Error: ', error.message);
        });
    };
    const renderPhoto = ({ item }) => {
        return (
            <View style={{
                width: 150,
                height: 200, borderRadius: 10, justifyContent: 'center', alignItems: 'center'
            }}>
                {item.isTakeCamera ? (
                    <TouchableOpacity
                        style={{ width: '99%', height: '99%', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            openCamera();
                        }}
                    >
                        <Icon
                            name="camera"
                            size={32}
                            color="#646982"
                        />
                        <Text>Chụp ảnh</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={async () => {
                            const formData = new FormData();
                            formData.append('file', {
                                uri: item.node.image.uri,
                                type: item.node.type,
                                name: 'photo.jpg',
                            });
                            console.log(formData);
                            try {
                                const result = await uploadImage(formData);
                                console.log("result", result);
                                if (result) {

                                    // handleSendMessage(result.url, "image")
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
                        }}
                        style={{ width: '99%', height: '99%' }}
                    >
                        <Image source={{ uri: item.node.image.uri }} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                )}
            </View>
        )
    }
    const getAllPhoTo = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
            .then(r => {
                console.log(r.edges);
                setlistPhoto(() => [{
                    isTakeCamera: true
                }, ...r.edges]);
            })
            .catch((err) => {
                //Error Loading Images
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewBack}>
                <View style={styles.leftBar}>
                    <TouchableOpacity style={styles.viewICBack}
                    // onPress={() => {
                    //     if (confirm) setconfirm(!confirm)
                    //     else navigation.goBack()
                    // }}
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
                // onPress={() => {
                //     if (confirm) setconfirm(!confirm)
                //     else navigation.goBack()
                // }}
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
            {/* <FlatList style={styles.containerMessage}
                data={listPhoto}
                renderItem={renderPhoto}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={numColumns}
                key={`${numColumns}`}
            >
            </FlatList> */}


            <View style={styles.viewInput}>
                <TouchableOpacity
                    onPress={openImagePicker}
                    style={styles.viewIcImg}>
                    <Icon
                        name="camera"
                        size={22}
                        color="#646982"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        getAllPhoTo()
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
                    // value={message}
                    // onChangeText={}
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
                    // onPress={() => {
                    //     handleSendMessage(message, "text")
                    //     setmessage('');
                    // }}
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
    )
}

export default Demo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: FontFamily.poppins,
        position: 'relative'
    },
    viewBack: {
        flexDirection: 'row',
        height: 96,
        alignItems: 'center',
        borderBottomColor: '#005987',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F6F8FA'
    },
    leftBar: {
        flexDirection: 'row'
    },
    viewICBack: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarHeader: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    nameHeader: {
        color: '#005987',
        fontSize: 20,
        fontWeight: '700',
        marginStart: 13
    },
    type: {
        color: 'black',
        fontSize: 14,
        fontWeight: '400',
        marginStart: 13
    },
    viewICMore: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewInput: {
        width: '100%',
        height: 74,
        borderTopWidth: 1,
        borderColor: '#DFDFDF',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '3%',
        position: 'absolute',
        bottom: 0
    },
    viewIcImg: {
        width: '10%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 2
    },
    input: {
        fontSize: 14,
        fontWeight: '400',
        color: '#646982',
        width: '60%',
        paddingHorizontal: 15,
        backgroundColor: '#F0F5FA',
        borderRadius: 8
    },
    btnSend: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSend: {
        color: 'black',
        fontWeight: 'bold'
    },
    icAvatarCustomer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginEnd: 10,
        alignSelf: 'flex-end'
    },
    txtMessage: {
        fontSize: 20,
        fontFamily: FontFamily.poppins,
        fontWeight: '700'
    },
    txtTimeMessage: {
        fontSize: 10,
        fontWeight: FontWeight.FW400
    },
    viewContent: {
        width: '100%',
        flexDirection: 'row',
    },
    imgMessage: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#005987'
    },
    viewMessage: {
        paddingHorizontal: 13,
        borderRadius: 10
    },
    content: {
        marginVertical: 8
    },
    containerMessage: {
        alignSelf: 'center',
        paddingHorizontal: 16,
        marginBottom: 74
    },
    txtTimeStart: {
        fontSize: 14,
        fontWeight: '400',
        color: '#646982',
        marginStart : -40
    },
})