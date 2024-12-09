import axiosClient from './axios'

const dishesApi = {
    getAllDishes(params) {
        const url = '/products/'
        return axiosClient.get(url, { params })
    },
    getDishDetail(id) {
        const url = `/products/${id}`
        return axiosClient.get(url)
    },
    getAllCategories(params) {
        const url = `/categories/`
        return axiosClient.get(url, { params })
    },
};

export default dishesApi
