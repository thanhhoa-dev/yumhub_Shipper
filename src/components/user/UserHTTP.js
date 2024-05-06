import AxiosInstance from "../../http/AxiosInstance";

export const login = async (phoneNumber, password) =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = 'shippers/login';
        const body = {
            phoneNumber: phoneNumber,
            password: password
        }
        return await axiosInstance.post(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}