import React, { createContext, useState, useEffect, useCallback } from 'react'
import { Alert } from 'react-native'
import io from 'socket.io-client';
import messaging from '@react-native-firebase/messaging';
import SoundPlayer from 'react-native-sound-player'
import { toast } from '@baronha/ting';

const SOCKET_URL = 'https://duantotnghiep-api-a32664265dc1.herokuapp.com/';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [socket, setSocket] = useState(null);
    const [tokenNotification, setTokenNotification] = useState(null);

    useEffect(() => {
        if (user && tokenNotification) {
            const socketInstance = io(SOCKET_URL, {
                query: {
                    id_user: user.checkAccount._id,
                    type_user: "shipper",
                    id_merchant: "shipper",
                    tokenNotification: tokenNotification,
                },
            });

            setSocket(socketInstance);

            socketInstance.on('connect', () => {
                console.log('Kết nối tới WebSocket server');
            });

            socketInstance.on('disconnect', () => {
                console.log('Ngắt kết nối từ WebSocket server');
            });

            socketInstance.on('message', (message) => {
                // Gọi callback hoặc xử lý tin nhắn tại đây nếu cần
            });

            return () => {
                socketInstance.disconnect();
            };
        }
    }, [tokenNotification]);

    const sendMessage = useCallback((type_user, command, order) => {
        if (socket) {
            socket.emit('message', { type_user, command, order });
        } else {
            console.log('Socket is not connected');
        }
    }, [socket]);

    const receiveMessage = useCallback((callback) => {
        if (socket) {
            socket.on('message', (message) => {
                callback(message);
            });
        }
    }, [socket]);
    const sendMessageChat = useCallback((type_user, command, order, message, type_mess) => {
        if (socket) {
            socket.emit('message', { type_user, command, order, message, type_mess });
        } else {
            console.log('Socket is not connected');
        }
    }, [socket]);

    const receiveMessageChat = useCallback((callback) => {
        if (socket) {
            socket.on('message', (message) => {
                callback(message);
            });
        }
    }, [socket]);

    useEffect(() => {
        if (user) {
            // Request permission to receive notifications
            const requestUserPermission = async () => {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (enabled) {
                    console.log('Authorization status:', authStatus);
                    // Get FCM token
                    const token = await messaging().getToken();
                    console.log('FCM Token:', token);
                    // Send token to server
                    sendTokenToServer(token);
                }
            };

            const sendTokenToServer = async (token) => {
                try {
                    await fetch('https://duantotnghiep-api-a32664265dc1.herokuapp.com/notifications/save-token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    });
                    console.log('Token sent to server successfully');
                    setTokenNotification(token);
                } catch (error) {
                    console.error('Error sending token to server:', error);
                }
            };

            requestUserPermission();

            // Foreground message handler
            const unsubscribe = messaging().onMessage(async remoteMessage => {
                // Notifications.registerRemoteNotifications();
                // Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
                const options = {
                    // ...
                    title: 'YumHub Shipper 😎',
                    message: remoteMessage.notification.body,
                    titleColor: '#D60A2E',
                    icon: {
                      uri: 'https://storage.googleapis.com/yumhub-api-c3646.appspot.com/1720104848209.jpg',
                      size: 24,
                    },
                  };
                  toast(options);
                try {
                    SoundPlayer.playUrl('https://storage.googleapis.com/yumhub-api-c3646.appspot.com/1720107599797.mp3')
                } catch (e) {
                    console.log(`cannot play the sound file`, e)
                }
            });

            return unsubscribe;
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, socket, sendMessage, receiveMessage, sendMessageChat, receiveMessageChat }}>
            {children}
        </UserContext.Provider>
    );
};