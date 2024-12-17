import { Container, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Back from '../assets/Back.svg'
import Currency from "../components/Currency"
import '../components/Custom.css'

function Checkout() {
    return (
        <>
            <Header />

            <Container>
                <div className="row">
                    <div className="col-8 offset-md-2">
                        <div className="bg-white mt-4 px-4 py-3 rounded">
                            {/* Thanh toán  */}
                            <div className="d-flex border-bottom mb-3">
                                <Link to='/' className="me-auto">
                                    <img src={Back} alt="Backward" height='25' style={{ cursor: 'pointer' }}/>
                                </Link>
                                <p className="fw-bold fs-5 me-auto">THANH TOÁN</p>
                            </div>
                            {/* Form  */}
                            <div className="px-3 pb-3 mb-3 border-bottom">
                                <div className="row mb-1">
                                    <div className="col">
                                        <Form.Label htmlFor="name">Họ và tên</Form.Label>
                                        <Form.Control
                                            type="email"
                                            id="name"
                                            placeholder='Nhập họ và tên người nhận'
                                            className='mb-2'
                                        />
                                    </div>
                                    <div className="col">
                                        <Form.Label htmlFor="sdt">SĐT</Form.Label>
                                        <Form.Control
                                            type="email"
                                            id="sdt"
                                            placeholder='Nhập SĐT người nhận'
                                            className='mb-2'
                                        />
                                    </div>
                                </div>
                                <Form.Label htmlFor="address">Giao tới</Form.Label>
                                <Form.Control
                                    type="email"
                                    id="address"
                                    placeholder='Nhập địa chỉ người nhận'
                                    className='mb-2'
                                />
                            </div>
                            {/* Tóm tắt đơn hàng */}
                            <div className="px-3 pb-3 border-bottom">
                                <p className="fs-5 fw-medium">Chi tiết đơn hàng</p>
                            </div>
                            <div className="row px-3 py-3">
                                <div className="col-md-10">
                                    <img src="anh1.jpg" style={{width:"50px"}}></img><span> x1</span><span> Cơm tấm Sài Gòn</span>
                                </div>
                                <div className="col-md-2">
                                    <p>50.000</p>
                                </div>
                            </div>
                            <div className="row mb-3 px-3 py-3">
                                <div className="col-md-10">
                                    <img src="anh2.jpg" style={{width:"50px"}}></img><span> x1</span><span> Nem nướng Nha Trang</span>
                                </div>
                                <div className="col-md-2">
                                    <p>50.000</p>
                                </div>
                            </div>
                            <div class=" px-3 py-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Ghi chú cho người bán</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            {/* Phương thức và khuyến mãi */}
                            <div className="px-3 py-3 border-bottom">
                                <p className="fs-5 fw-medium">Phương thức và khuyến mãi</p>
                                <Form.Label>Phương thức thanh toán</Form.Label>
                                <Form.Select defaultValue="Chọn phương thức thanh toán" className="mb-4">
                                    <option>Thanh toán khi nhận hàng</option>
                                    <option>Qua ví điện tử</option>
                                </Form.Select>
                                <Form.Label htmlFor="coupon">Mã giảm giá</Form.Label>
                                <div className="d-flex justify-content-between">
                                <Form.Select defaultValue="Chọn mã giảm giágiá" className="mb-4">
                                    <option>TLU25</option>
                                    <option>TLU10</option>
                                </Form.Select>
                                   
                                    <Button
                                        variant="dark"
                                        className='blButtonHover rounded-pill'
                                        style={{width: '110px', height: '35px'}}
                                    >
                                        Áp dụng
                                    </Button>
                                </div>
                            </div>
                            {/* Chi tiết thanh toán  */}
                            <div className="px-3 py-3">
                                <p className="fs-5 fw-medium">Chi tiết thanh toán</p>
                                <p className="mb-2">
                                    Tổng sản phẩm
                                    <span className="float-end">
                                        <Currency amount={100000} fontSize={17}/>
                                    </span>
                                </p>
                                <p className="mb-2">
                                    Phí vận chuyển
                                    <span className="float-end">
                                        <Currency amount={100000} fontSize={17}/>
                                    </span>
                                </p>    
                                <p className="mb-2">
                                    Mã giảm giá
                                    <span className="float-end">
                                        -<Currency amount={100000} fontSize={17}/>
                                    </span>
                                </p>
                                <p className="mb-2 fw-medium">
                                    Tổng cộng
                                    <span className="float-end" style={{color: '#000066'}}>
                                        <Currency amount={100000} fontSize={18}/>
                                    </span>
                                </p>
                                <div className="d-flex justify-content-end">
                                    <Button
                                        className="mt-4 buttonHover rounded-pill"
                                        style={{width: '150px'}}
                                    >
                                        Đặt hàng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Footer />
        </>
    )
}

export default Checkout