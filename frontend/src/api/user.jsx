import axiosClient from "./axios";

const userApi = {
    login(email, password) {
        const url = '/login/'
        const data = { email, password }
        return axiosClient.post(url, data).then(response => response)
    },
    register(username, email, password) {
        const url = '/register/'
        const data = { username, email, password }
        return axiosClient.post(url, data).then(response => response)
    },
}

export default userApi
