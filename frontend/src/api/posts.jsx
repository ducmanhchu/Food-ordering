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
    posting(title, content, image) {
        const url = `/blog/posts/`;
        const data = new FormData(); // Tạo FormData để gửi ảnh
        data.append("title", title);
        data.append("content", content);
        if (image) {
            data.append("image", image); // Chỉ thêm ảnh nếu có
        }
        return axiosClient.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data", // Định nghĩa header cho upload file
            },
        }).then(response => response);
    },    
    like(id) {
        const url = `/blog/posts/${id}/like/`
        return axiosClient.post(url)
    },
    comment(post, content) {
        const url = `/blog/posts/${post}/comments/`
        const data = { post, content }
        return axiosClient.post(url, data).then(response => response)
    },
    getCommentList(post) {
        const url = `/blog/posts/${post}/comments/`
        return axiosClient.get(url)
    },
    getMyPosts(params) {
        const url = `/blog/my-posts/`
        return axiosClient.get(url, { params })
    },
    deletePost(id) {
        const url = `/blog/posts/${id}/`;
        return axiosClient.delete(url).then(response => response);
    },
    updatePost(id, formData) {
        const url = `/blog/posts/${id}/`;
        return axiosClient.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Quan trọng để thông báo với server rằng đây là form-data
            },
        }).then(response => response);
    },
    getMyComts(params) {
        const url = `/blog/my_comments/`
        return axiosClient.get(url, { params })
    },
    updateComment(id, post, content) {
        const url = `/blog/comments/${id}/`
        const data = { post, content }
        return axiosClient.put(url, data).then(response => response)
    },
    deleteComment(id) {
        const url = `/blog/comments/${id}/`
        return axiosClient.delete(url).then(response => response);
    }
}

export default postsApi