import axiosClient from './axios'

const dishesApi = {
    getAllDishes(params) {
        const url = `/tlu/products/`
        return axiosClient.get(url, { params })
    },
    getDishDetail(id) {
        const url = `/tlu/products/${id}`
        return axiosClient.get(url)
    },
    getAllCategories(params) {
        const url = `/tlu/categories/`
        return axiosClient.get(url, { params })
    },
};

export default dishesApi
