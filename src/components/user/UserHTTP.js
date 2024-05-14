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

export const changePass = async (id, passNew, passOld) => {
    try {
        const axiosInstance = await AxiosInstance();
        const url = '/shippers/changePass/:id'
        const body = {
            id : id,
            passOld : passOld,
            passNew: passNew
        }
        return await axiosInstance.post(url, body);
    }catch (error) {
    
    ToastAndroid.show('error', ToastAndroid.SHORT)
}
}

export const resetpass = async ( id, password ) => {
    try {
        const axiosInstance = await AxiosInstance();
        const url = '/shippers/resetPass/:id'
        const body = {
            id: id,
            password: password,
        }
        return await axiosInstance.post(url, body)
    }catch (error) {
   
    ToastAndroid.show('error', ToastAndroid.SHORT)
}
}