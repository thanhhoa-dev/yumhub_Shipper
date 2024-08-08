import AxiosInstance from '../../http/AxiosInstance';

export const getShipperBeReview = async (id) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'orders/historyShipperIsReview';
    const params = {id: id};
    return await axiosInstance.get(url, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getShipperReview = async (id) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'orders/historyShipperReview';
    const params = {id: id};
    return await axiosInstance.get(url, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const revenueShipperTimeTwoTime = async (ID, startDate, endDate) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'shippers/RevenueTTT';
    const body = {
      ID: ID,
      startDate: startDate,
      endDate: endDate,
    };
    return await axiosInstance.post(url, body);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetOrderByID = async id => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'orders/getOrderById';
    const params = {id: id};
    return await axiosInstance.get(url, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const SetStatus = async (id, status) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'orders/statusOrder';
    const params = {
      id: id,
      status: status,
    };
    return await axiosInstance.post(url, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const SetDeleteReview = async id => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'reviews/delete';
    const params = {
      id: id,
    };
    return await axiosInstance.delete(url, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateShipperInformation = async (id, status) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'shippers/updateShipper';
    const params = {id: id};
    const body = {
      status: status,
    };
    return await axiosInstance.patch(url, body, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateShipperReview = async (id, data) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'reviews/updateReview';
    const params = {id: id};
    return await axiosInstance.patch(url, data, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ShowDetail = async id => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'detail/order';
    const params = {id: id};
    return await axiosInstance.get(url, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadImage = async form => {
  try {
    const axiosInstance = AxiosInstance('multipart/form-data');
    const url = 'files/upload';
    return await axiosInstance.post(url, form);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateOrder = async (id, data) => {
  console.log(id);
  try {
    const axiosInstance = AxiosInstance();
    const url = 'orders/updateOrder';
    const params = {id: id};
    return await axiosInstance.post(url, data, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const CreateReivew = async data => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'reviews/createReview';
    return await axiosInstance.post(url, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAll = async data => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'shippers/getAllShipper';
    return await axiosInstance.get(url);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changePass = async (passOld, passNew,id) => {
  try {
      const axiosInstance = await AxiosInstance();
      const url = '/shippers/changePass'
      const params = {id:id};
      const body = {
          passOld: passOld,
          passNew: passNew
      }
      return await axiosInstance.post(url, body,{params})
  } catch (error) {

      ToastAndroid.show('error', ToastAndroid.SHORT)
  }
}
export const getHistoryShipper = async(id) =>{
  try {
      const axiosInstance = AxiosInstance();
      const url = 'shippers/getHistoryOrder';
      const params = {id: id};
      return await axiosInstance.get(url, {params});
  } catch (error) {
      console.log(error);
      throw error;
  }
}

export const getReviewOfOrder = async id => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'orders/getReviewOfOrder/';
    const params = {id: id};
    return await axiosInstance.get(url, {params});
  } catch (error) {
    console.log(error);
  }
};
export const topUp = async (id, data) =>{
  try {
      const axiosInstance = AxiosInstance();
      const url ='shippers/topUp';
      const params = {id: id}
      return await axiosInstance.post(url,data,{params})
  } catch (error) {
      console.log(error);
      throw error;
  }
}
export const Withdraw = async (id, data) =>{
  try {
      const axiosInstance = AxiosInstance();
      const url ='shippers/cashOut';
      const params = {id: id}
      return await axiosInstance.post(url,data,{params})
  } catch (error) {
      console.log(error);
      throw error;
  }
}
export const getHistoryTransaction = async (id) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'shippers/transactionHistory';
    const params = {id: id};
    return await axiosInstance.get(url, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateProfile = async (id, data) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'shippers/updateShipper';
    const params = {id: id};
    const body = {
      phoneNumber: data.phoneNumber,
      email: data.email,
      fullName: data.fullName,
      sex: data.gender,
      birthDay: data.birthDay
    };
    return await axiosInstance.patch(url, body, {params});
  } catch (error) {
    console.log('>>>>>change pass: 76', error);
    ToastAndroid.show('error', ToastAndroid.SHORT);
  }
};

export const getListReviewCustomer = async (id) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'orders/historyCustomerIsReview';
    const params = {id : id}
    return await axiosInstance.get(url, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const setUpdateCustomer = async (id, data) => {
  try {
    const axiosInstance = AxiosInstance();
    const url = 'customers/updateCustomer';
    const params = {id: id}
    return await axiosInstance.patch(url, data, {params});
  } catch (error) {
    console.log(error);
    throw error;
  }
};