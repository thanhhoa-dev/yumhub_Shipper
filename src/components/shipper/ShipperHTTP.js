import AxiosInstance from "../../http/AxiosInstance";

export const getReviews = async () =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = `orders/historyReviewShipper/6604e1ec5a6c5ad8711aebf9`;
        return await axiosInstance.get(url);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getHistoryReviews = async (id) =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = `reviews/gethistoryreview/6604e1ec5a6c5ad8711aebf9`;
        return await axiosInstance.get(url);
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