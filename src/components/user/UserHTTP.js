import AxiosInstance from '../../http/AxiosInstance';

export const login = async (phoneNumber, password) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'shippers/login';
    const body = {
      phoneNumber: phoneNumber,
      password: password,
    };
    return await axiosInstance.post(url, body);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changePass = async (id, passNew, passOld) => {
  try {
    const axiosInstance = await AxiosInstance();
    const url = 'shippers/changePass/:id';
    const body = {
      id: id,
      passOld: passOld,
      passNew: passNew,
    };
    return await axiosInstance.post(url, body);
  } catch (error) {
    ToastAndroid.show('error', ToastAndroid.SHORT);
  }
};

export const resetpass = async (email, password) => {
  try {
    const axiosInstance = await AxiosInstance();
    const url = 'shippers/resetPass/';
    const body = {
      password: password,
      email: email,
    };
    return await axiosInstance.post(url, body);
  } catch (error) {
    ToastAndroid.show('error', ToastAndroid.SHORT);
  }
};
export const forgotPass = async email => {
  try {
    const axiosInstance = await AxiosInstance();
    const url = 'shippers/forgetPassByEmail';
    const body = {
      email: email,
    };
    return await axiosInstance.post(url, body);
  } catch (error) {
    ToastAndroid.show('error', ToastAndroid.SHORT);
  }
};

export const checkotp = async (email, otp) => {
  try {
    const axiosInstance = await AxiosInstance();
    const url = 'shippers/checkOTP';
    const body = {
      email: email,
      otp: otp,
    };
    return await axiosInstance.post(url, body);
  } catch (error) {
    console.log('>>>>>change pass: 76', error);
    ToastAndroid.show('error', ToastAndroid.SHORT);
  }
};


