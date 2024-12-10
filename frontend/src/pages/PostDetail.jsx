import { Container, Breadcrumb, Form, FloatingLabel } from 'react-bootstrap'
import { useEffect, useState } from 'react'   
import { useParams, Link } from 'react-router-dom'

import Header from "../components/Header"
import Footer from "../components/Footer"
import postsApi from '../api/posts'
import Favorite from '../assets/Favorite.svg'
import Favorited from '../assets/Favorited.svg'
import '../components/Custom.css'

function PostDetail() {
    const {id} = useParams()
    const [post, setPost] = useState(null)
    const [isLiking, setIsLiking] = useState(false)
    const [likedCount, setLikedCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const postDetail = await postsApi.getPostDetail(id)
                setPost(postDetail)
                setLikedCount(postDetail.liked_by.length)
                setIsLiked(postDetail.liked_by.includes(localStorage.getItem("username")))
                // console.log("DL Post", postDetail)
            } catch (error) {
                console.log("Có lỗi khi lấy dữ liệu chi tiết bài viết:", error)
            }
        }
        fetchPost()
    }, [id])

    const handleLikePost = async () => {
        if (!localStorage.getItem("access_token")) {
            alert("Bạn cần đăng nhập để thích bài viết")
            return
        }
        if (!post || isLiking) return
        setIsLiking(true) // Ngăn nhấn liên tục
        try {
            const updatedPost = await postsApi.like(id)
            console.log("Res:", updatedPost)

            setLikedCount(updatedPost.liked_by.length)
            setIsLiked(!isLiked)
        } catch (error) {
            console.log("Có lỗi khi thích bài viết:", error)
        } finally {
            setIsLiking(false)
        }
    }

    return (
        <>
            <Header />

            <Container>
                <Breadcrumb className='my-3'>
                    <Link to='/' className='text-decoration-none text-secondary me-2'>Trang chủ</Link>
                    <span className='text-secondary me-2'>&gt;</span>
                    <Link to='/blog' className='text-decoration-none text-secondary me-2'>Cộng đồng</Link>
                    <span className='text-secondary me-2'>&gt;</span>
                    <Breadcrumb.Item active className='text-dark'>
                        {post ? post.title : "Đang tải..."}
                    </Breadcrumb.Item>
                </Breadcrumb>

                <div className="row container gx-3">
                    <div className="col-lg-8">
                        <div className="bg-white rounded py-2 px-4">
                            <div className="d-flex mb-3">
                                <span className='text-secondary me-2'>&lt;</span>
                                <Link to={'/blog'} className='text-secondary text-decoration-none'>Quay lại</Link>
                            </div>
                            <h3 className='mb-3'>{post ? post.title : "Đang tải..."}</h3>
                            <p>{post ? post.content : "Đang tải..."}</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="bg-white rounded py-2 px-4 clearfix">
                            <p className='fw-medium border-bottom pb-2 mb-2' style={{color: '#000066'}}>{post ? post.author : "Đang tải..."}</p>
                            <div className="d-flex border-bottom pb-2 mb-2">
                                <img 
                                    src={isLiked ? Favorited : Favorite}
                                    className="me-2"
                                    width='25'
                                    style={{ cursor: 'pointer' }} 
                                    onClick={handleLikePost}
                                />
                                <span className='text-secondary'>{likedCount}</span>
                            </div>
                            <p className='fw-medium mb-2'>
                                <span className='me-1'>{post && post.comments ? post.comments.length : "Đang tải..."}</span>
                                bình luận
                            </p>
                            <Form>
                                <FloatingLabel controlId="floatingTextarea2" label="Bình luận" className='mb-2'>
                                    <Form.Control
                                        as='textarea'
                                        placeholder="Thêm bình luận"
                                    />
                                </FloatingLabel>
                                <button
                                    className='rounded-pill btn float-end buttonHover mb-2'
                                    style={{fontSize: '14px'}}
                                    type='submit'
                                >
                                    Bình luận
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>

            </Container>

            <Footer />
        </>
    )
}

export default PostDetail