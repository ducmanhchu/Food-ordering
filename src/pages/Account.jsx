import { Container,Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import React, { useState } from 'react';



function Account() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); 
        }
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
                <li className="breadcrumb-item active text-dark" aria-current="page">Tài khoản</li>
            </ol>
            </nav>
            </Navbar>
            <div className="bg-white p-3 rounded just-content-center" style={{marginTop:"50px",marginBottom:"90px"}}>
                <h2 className="mb-3">Thông tin của bạn</h2>
                <div className="row">
                <div className="col-md-4 text-center ">
              <div className="mb-3">
                <div
                  className="rounded-circle overflow-hidden"
                  style={{ width: "100px", height: "100px", margin: "auto" }}
                >
                  <img
                    src={image || "https://via.placeholder.com/100x100?text=No+Image"}
                    alt="Profile"
                    className="img-fluid"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                id="profilePicture"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label
                htmlFor="profilePicture"
                className="btn text-white"
                style={{ backgroundColor: "#000066" }}
              >
                Upload a picture
              </label>
            </div>
                <div className="col-md-8 " >
                    <label for="exampleFormControlInput1" class="form-label fw-bold">Tên tài khoản</label>
                    <input 
                    type="text" 
                    className="form-control mb-3" 
                    id="exampleFormControlInput1" 
                    placeholder="Đức Mạnh Chu"
                    />
                    <label for="exampleFormControlInput1" class="form-label fw-bold">Email</label>
                    <input 
                    type="email" 
                    className="form-control mb-3" 
                    id="exampleFormControlInput1" 
                    placeholder="ducmanhchu@gmail.com"
                    />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link
                    to="/acc"
                    className="btn"
                    style={{
                        backgroundColor: "#000066",
                        color: "#fff",
                        textDecoration: "none",
                    }}
                >
                    Cập nhật
                </Link>
            </div> 
            
                </div>
            </div>
            </div>
            </Container>

            <Footer />
        </>
    )
}

export default Account