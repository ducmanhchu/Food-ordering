import { Container, Navbar, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import postsApi from "../api/posts";
import Comment from "../components/Comment";

function MyComments() {
    const [loading, setLoading] = useState(true);
    const [myComts, setMyComts] = useState([]);
    const [posts, setPosts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const comtPerPage = 10;

    // Lấy dữ liệu bình luận và bài viết
    useEffect(() => {
        const fetchMyComts = async () => {
            setLoading(true);
            try {
                // Gọi API để lấy bình luận
                const myComtsResponse = await postsApi.getMyComts();
                setMyComts(myComtsResponse || []);
                console.log(setMyComts.post)

                // Lấy danh sách ID bài viết từ bình luận
                const postIds = myComtsResponse.map((comment) => comment.post);
                const uniquePostIds = [...new Set(postIds)];

                // Lấy thông tin bài viết theo ID
                const postPromises = uniquePostIds.map((id) => postsApi.getPostDetail(id));
                const postResponses = await Promise.all(postPromises);

                // Chuyển đổi thành object để dễ truy cập
                const postsMap = postResponses.reduce((acc, post) => {
                    acc[post.id] = post; // Key là ID bài viết
                    return acc;
                }, {});
                setPosts(postsMap);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu bình luận hoặc bài viết:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyComts();
    }, []);

    // Xử lý số comment trên một trang
    const indexOfLastComt = currentPage * comtPerPage;
    const indexOfFirstComt = indexOfLastComt - comtPerPage;
    const currentComment = myComts.slice(indexOfFirstComt, indexOfLastComt);

    // Thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Hàm cập nhật danh sách comment sau khi xóa
    const handleDelete = (deletedComtId) => {
        setMyComts((prevComts) => prevComts.filter(comment => comment.id !== deletedComtId));
    };

    // Hàm cập nhật comment
    const handleUpdate = (updatedComtId, updatedContent) => {
        setMyComts((prevComts) =>
            prevComts.map((comment) =>
                comment.id === updatedComtId
                    ? { ...comment, content: updatedContent }
                    : comment
            )
        );
    };

    return (
        <>
            <Header />

            <Container>
                <Navbar>
                    <nav style={{
                        "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")`,
                    }} aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/" className="link-underline-light text-secondary">Trang chủ</Link></li>
                            <li className="breadcrumb-item active text-dark" aria-current="page">Bình luận của tôi</li>
                        </ol>
                    </nav>
                </Navbar>
                <h1 className="mb-3">Bình luận của tôi</h1>
                <div className="mt-5">
                    {loading ? (
                        <p className="text-center text-secondary">Đang tải...</p>
                    ) : myComts.length === 0 ? (
                        <p className="text-center text-secondary">Không có bình luận nào để hiển thị</p>
                    ) : (
                        currentComment.map((comment) => (
                            <div key={comment.id} className="mb-4">
                                <h5>
                                    Bài viết:{" "}
                                    {posts[comment.post] ? (
                                        <Link to={`/posts/${comment.post}`} className="text-primary">
                                            {posts[comment.post].title}
                                        </Link>
                                    ) : (
                                        "Đang tải..."
                                    )}
                                </h5>
                                <Comment
                                    data={comment}
                                    onDelete={handleDelete}
                                    onUpdate={handleUpdate}
                                />
                            </div>
                        ))
                    )}
                </div>
                <Pagination className="justify-content-center mt-4">
                    {Array.from(
                        { length: Math.ceil(myComts.length / comtPerPage) },
                        (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        )
                    )}
                </Pagination>
            </Container>

            <Footer />
        </>
    );
}

export default MyComments;
