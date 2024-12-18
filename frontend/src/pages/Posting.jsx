import { Container, Navbar, Toast, ToastContainer } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import '../components/Custom.css'
import postsApi from "../api/posts";

function Posting() {
    const [image, setImage] = useState(null); // Lưu trực tiếp file ảnh
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        setIsLoggedIn(!!accessToken);
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Lưu file thay vì URL
        }
    };

    const handlePosting = async (e) => {
        e.preventDefault();
        try {
            if (!isLoggedIn) {
                setShowAlert(true);
            } else {
                const response = await postsApi.posting(title, content, image);
                if (response) {
                    setShowMessage(true);
                    setTimeout(() => {
                        navigate('/blog');
                    }, 1000);
                }
            }
        } catch (error) {
            console.error("Lỗi khi đăng bài:", error);
            if (error.response) {
                setError(error.response.data.detail || 'Đăng bài không thành công!');
            } else {
                setError('Có lỗi xảy ra, hãy kiểm tra lại!');
            }
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Navbar>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/" className="link-underline-light text-secondary">Trang chủ</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/blog" className="link-underline-light text-secondary">Cộng đồng</Link>
                            </li>
                            <li className="breadcrumb-item active text-dark" aria-current="page">Đăng bài</li>
                        </ol>
                    </nav>
                </Navbar>
                <h1>Đăng bài</h1>
                <div className="bg-white m-3 rounded p-3">
                    <form onSubmit={handlePosting}>
                        <div className="mb-3">
                            <label htmlFor="titleInput" className="form-label fw-bold">Tiêu đề bài viết</label>
                            <input
                                type="text"
                                className="form-control"
                                id="titleInput"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="imageUpload" className="form-label">Chọn ảnh</label>
                            <input
                                type="file"
                                className="form-control"
                                id="imageUpload"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        {image && (
                            <div className="mt-3">
                                <h5>Hình ảnh đã chọn:</h5>
                                <img src={URL.createObjectURL(image)} alt="Selected" className="img-fluid" />
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="contentTextarea" className="form-label fw-bold">Nội dung bài viết</label>
                            <textarea
                                className="form-control"
                                id="contentTextarea"
                                rows="3"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                                type="submit"
                                className="btn mb-3 buttonHover rounded-pill"
                            >
                                Đăng bài
                            </button>
                        </div>
                    </form>
                </div>
            </Container>
            <ToastContainer className="mt-3" position="top-center">
                <Toast className="bg-warning-subtle text-center" onClose={() => setShowAlert(false)} delay={3000} show={showAlert} autohide>
                    <Toast.Body>Hãy đăng nhập trước!</Toast.Body>
                </Toast>    
            </ToastContainer>
            <ToastContainer className="mt-3" position="top-center">
                <Toast className="bg-success text-white text-center" onClose={() => setShowMessage(false)} delay={800} show={showMessage} autohide>
                    <Toast.Body>Đăng bài thành công!</Toast.Body>
                </Toast>    
            </ToastContainer>
            <Footer />
        </>
    );
}

export default Posting;
