import axiosClient from "./axios"

const postsApi = {
    getAllPosts(params) {
        const url = `/blog/posts/`
        return axiosClient.get(url, { params })
    },
    getPostDetail(id) {
        const url = `/blog/posts/${id}/`
        return axiosClient.get(url)
    },
    posting(title, content) {
        const url = `/blog/posts/`
        const data = { title, content }
        return axiosClient.post(url, data).then(response => response)
    },
    like(id) {
        const url = `/blog/posts/${id}/like/`
        return axiosClient.post(url)
    }
}

export default postsApi