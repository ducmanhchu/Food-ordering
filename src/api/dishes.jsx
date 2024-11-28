import axiosClient from './axios';

const dishesApi = {
    getAllDishes(params) {
        const url = '/Beans?pageIndex=1&pageSize=200'; 
        return axiosClient.get(url, { params });
    },
    getDishDetail(id) {
        const url = `/Beans/${id}`; 
        return axiosClient.get(url);
    },
};

export default dishesApi;
