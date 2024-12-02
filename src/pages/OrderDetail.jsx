import { Container,Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"


function OrderDetail() {
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
                <li className="breadcrumb-item"><Link to="/orders" className="link-underline-light text-secondary">Đơn hàng</Link></li>
                <li className="breadcrumb-item active text-dark" aria-current="page">Chi tiết đơn hàng</li>
            </ol>
            </nav>
            </Navbar>
            <h1>Chi tiết đơn hàng</h1>
            <div className="bg-white rounded p-3 mb-5" >
                    <h5 className="border-bottom mb-3">Chuẩn bị đơn hàng</h5>
                    <p className="fw-bold text-secondary">Từ</p>
                    <p className="fw-bold">Đồ ăn| TLU FOOD</p>
                    <p className="text-secondary mb-3">[Trường đại học Thăng Long] Nghiêm Xuân Yêm - P.Đại Kim, Hoàng Mai, Hà Nội</p>
                    <p className="fw-bold text-secondary">Đến</p>
                    <p className="fw-bold border-bottom mb-3">250 Kim Giang</p>
                    <h5>Chi tiết đơn hàng</h5>
                    <div className="row mb-3">
                        <div className="col-md-10">
                            <img src="anh1.jpg" style={{width:"50px"}}></img><span> x1</span><span> Cơm tấm Sài Gòn</span>
                        </div>
                        <div className="col-md-2">
                            <p>50.000</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-10">
                            <img src="anh2.jpg" style={{width:"50px"}}></img><span> x1</span><span> Nem nướng Nha Trang</span>
                        </div>
                        <div className="col-md-2">
                            <p>50.000</p>
                        </div>
                    </div>
                    <div className="d-flex mb-3 gap-3">
                        <div className="col-md-10">
                            <h5>Tổng (2 món)</h5>            
                            <p>Phí giao hàng</p>
                            <p>Giảm giá</p>
                        </div>
                        <div className="col-md-2">
                            <p className="fw-bold">100.000</p>
                            <p>10.000</p>
                            <p>-10.000</p>
                            <h5 className="mt-3">100.000</h5>
                        </div>
                    </div>
                    <div className="d-flex mb-3 text-secondary gap-3">
                        <div className="col-md-10">
                            <p>Ghi chú</p>          
                            <p>Mã đơn hàng</p>
                            <p>Thanh toán</p>
                        </div>
                        <div className="col-md-2">
                            <p>Không có</p>
                            <p>123456789</p>
                            <p>Thanh toán khi nhận hàng</p>
                        </div>
                    </div>
                    <div className="d-grid d-md-flex justify-content-md-end">
                        <Link
                            to="/orders"
                            className="btn"
                            style={{
                                backgroundColor: "#000066",
                                color: "#fff",
                                textDecoration: "none",
                            }}
                        >
                            Quay lại
                        </Link>
                    </div>           
            </div>
            </Container>

            <Footer />
        </>
    )
}

export default OrderDetail