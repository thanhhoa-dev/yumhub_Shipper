import AxiosInstance from "../../http/AxiosInstance";

export const getShipperBeReview = async () =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = 'orders/historyShipperIsReview';
        const params = {id: "6604e1ec5a6c5ad8711aebf9"}
        return await axiosInstance.get(url, {params});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getShipperReview = async () =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = 'orders/historyShipperReview';
        const params = {id: "6604e1ec5a6c5ad8711aebf9"}
        return await axiosInstance.get(url, {params});
    } catch (error) {
        console.log(error);
        throw error;
    }
}
//6604e1ec5a6c5ad8711aebf9
export const revenueShipperTimeTwoTime = async (ID, startDate) =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = 'shippers/RevenueTTT';
        const body = {
            ID: ID, 
            startDate: startDate,
            endDate: startDate
        }
        return await axiosInstance.post(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const GetOrderByID = async (id) =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = 'orders/getOrderById';
        const params = {id: id}
        return await axiosInstance.get(url, {params});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const SetStatus = async (id, status) =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = 'orders/statusOrder';
        const params = {
            id: id,
            status: status
        }
        return await axiosInstance.post(url, {params});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const SetDeleteReview = async (id) =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = 'reviews/delete';
        const params = {
            id: id,
        }
        return await axiosInstance.delete(url, {params});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const UpdateShipperInformation = async (id, status) =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = `shippers/updateShipper/${id}`;
        const body = {
            status: status
        }
        return await axiosInstance.patch(url, body) 
    } catch (error) {
        console.log(error);
        throw error;
    }
}