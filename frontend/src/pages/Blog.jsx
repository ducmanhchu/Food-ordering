import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
import '../components/Custom.css'

function Blog() {
  return (
    <>
      <Header />

      <Container>
        <Navbar>
          <nav
            style={{
              "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")`,
            }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="link-underline-light text-secondary">
                  Trang chủ
                </Link>
              </li>
              <li
                className="breadcrumb-item active text-dark"
                aria-current="page"
              >
                Cộng đồng
              </li>
            </ol>
          </nav>
        </Navbar>
        <h1>Bài viết nổi bật </h1>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link
            to="/posting"
            className="btn rounded-pill buttonHover"
            style={{
              textDecoration: "none",
            }}
          >
            Đăng bài
          </Link>
        </div>
        <div className="">
          <Post />
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default Blog;
