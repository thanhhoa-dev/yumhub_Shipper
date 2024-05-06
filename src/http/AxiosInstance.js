import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://192.168.1.16:3000/'
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            // const token = await AsyncStorage.getItem('token');
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA3NzY2MTY4MTgyIiwic2V4IjoiTWFsZSIsImVtYWlsIjoiaG9hbmdrdW42MTBAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJHcmVnIiwiYXZhdGFyIjoiaHR0cDovL2R1bW15aW1hZ2UuY29tLzE0NHgxMDAucG5nL2ZmNDQ0NC9mZmZmZmYiLCJiaXJ0aERheSI6IjUvMTMvMjAyMyIsImpvaW5EYXkiOiIyMDIzLTExLTIyVDE3OjAwOjAwLjAwMFoiLCJicmFuZEJpa2UiOiIzNjk4Ny0yMzA4IiwibW9kZUNvZGUiOiJZZWxsb3ciLCJpZEJpa2UiOiIkMmEkMDQkWTlXSVdWMkR1ME5lR3R4TS96SjFaT2FyL1VXRjd4Z1Z1R01EWk1oL0dleXpBWnlhcGxaMmEiLCJpYXQiOjE3MTQ4Nzg4NDQsImV4cCI6MTcxNzQ3MDg0NH0.vrazMn4sOhiMaMm0nSRnd7cWLzYWBfd6uFhTjOVfnWw"
        
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstance