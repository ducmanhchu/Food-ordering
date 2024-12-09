import { Container, Navbar } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Posting() {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(""); // State cho Tiêu đề
    const [content, setContent] = useState(""); // State cho Nội dung
    const [error, setError] = useState(""); // State cho thông báo lỗi
    const navigate = useNavigate(); 


    // Hàm xử lý khi người dùng chọn ảnh
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Tạo URL cho hình ảnh
        }
    };

    // Hàm xử lý gửi bài viết
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !content) {
            setError("Tiêu đề và nội dung bài viết là bắt buộc!");
            return;
        }

        setError(""); 
        alert("Bài viết đã được đăng!");
        navigate("/blog");
    };

    return (
        <>
            <Header />

            <Container>
                <Navbar style={{ paddingLeft: "12px" }}>
                    <nav
                        style={{
                            "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")`,
                        }}
                        aria-label="breadcrumb"
                    >
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
                <h1 style={{ paddingLeft: "12px" }}>Đăng bài</h1>
                <div className="bg-white m-3 rounded p-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Tiêu đề bài viết</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="bg-white">
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
                                    <img src={image} alt="Selected" className="img-fluid" />
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label fw-bold">Nội dung bài viết</label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                                type="submit"
                                className="btn btn-primary mb-3"
                                style={{
                                    backgroundColor: "#000066",
                                    color: "#fff",
                                    textDecoration: "none",
                                }}
                            >
                                Đăng bài
                            </button>
                        </div>
                    </form>
                </div>
            </Container>

            <Footer />
        </>
    );
}

export default Posting;
