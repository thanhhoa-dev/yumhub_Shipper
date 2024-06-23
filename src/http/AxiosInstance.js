import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosInstance = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        baseURL: 'http://192.168.88.147:3001/'
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            // const token = await AsyncStorage.getItem('token');
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA5ODM4MjY3NTYiLCJzZXgiOiJNYWxlIiwiZW1haWwiOiJiYXNvbjE2MDdAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJPemF3b2EgR3JlZ2kiLCJhdmF0YXIiOiJodHRwczovL3RoLmJpbmcuY29tL3RoL2lkL09JUC5FWlNFX1I5Tms5akJTNkVHV0pzczRnSGFKMj9ycz0xJnBpZD1JbWdEZXRNYWluIiwiYmlydGhEYXkiOiI2LzkvMjAyMyIsImpvaW5EYXkiOiIyMDI0LTA1LTMxVDA4OjU1OjU4LjA3OFoiLCJicmFuZEJpa2UiOiI0OTY0My0zNzMiLCJtb2RlQ29kZSI6IlZpb2xldCIsImlkQmlrZSI6IjEyMzQ1Njc4OSIsImlhdCI6MTcxODY5MjE2NywiZXhwIjoxNzIxMjg0MTY3fQ.JLObcc1bpM6uYs2OzCFyfXsLYi-4Lp9GmE5YrPhiUJo";
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