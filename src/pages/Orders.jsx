import { Container,Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"


function Orders() {
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
                        <li className="breadcrumb-item active text-dark" aria-current="page">Đơn hàng</li>
                    </ol>
                    </nav>
                </Navbar>
                <h1 className="mb-3">Đơn hàng của tôi</h1>
            <div className="my-4">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
                            <h6>Mã đơn hàng: <span className="text-secondary">012345679</span></h6>
                            <h6>Trạng thái:<span className="text-primary"> Chuẩn bị hàng</span></h6>
                        </div>
                        <ul className="list-group list-group-flush mb-3 border-bottom">
                            <li class=" d-flex justify-content-between mb-3">
                                <span>Cơm tấm Sài Gòn</span>
                                <span>x1</span>
                            </li>
                            <li className=" d-flex justify-content-between">
                                <span>Nem nướng Nha Trang</span>
                                <span>x1</span>
                            </li>
                        </ul>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-bold">Thành tiền: <span class="fw-bold" style={{color:"#000066"}} >110.000đ</span></p>
                        </div>
                        <div className="text-end mt-3">
                            <button class="btn btn-danger btn-sm">Hủy đơn</button>
                        </div>
                    </div>
                </div>
            </div>
            
            
            </Container>

            <Footer />
        </>
    )
}

export default Orders