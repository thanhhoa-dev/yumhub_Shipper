import AxiosInstance from "../../http/AxiosInstance";

export const getReviews = async () =>{
    try {
        const axiosInstance = AxiosInstance();
        const url = 'reviews/getAllReview';
        return await axiosInstance.get(url);
    } catch (error) {
        console.log(error);
        throw error;
    }
}