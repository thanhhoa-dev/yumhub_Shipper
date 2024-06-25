import React, { createContext, useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client';


const SOCKET_URL = 'https://duantotnghiep-api-a32664265dc1.herokuapp.com/';

export const UserContext = createContext();

export const UserProvider = (props) =>{
    const {children} = props;
    const [user, setUser] = useState(null); 
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user) {
            const socketInstance = io(SOCKET_URL, {
                query: {
                    id_user: user.checkAccount._id,
                    type_user: "shipper",
                    id_merchant: "shipper",
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
    }, [user]);

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

    return (
        <UserContext.Provider value={{ user, setUser, socket, sendMessage, receiveMessage }}>
            {children}
        </UserContext.Provider>
    );
};
