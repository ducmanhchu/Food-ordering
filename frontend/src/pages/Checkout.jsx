import { Container, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Back from '../assets/Back.svg'
import Currency from "../components/Currency"
import '../components/Custom.css'
import { useCart } from "../components/CartContext"
import dishesApi from "../api/dishes"
import orderApi from "../api/order"

function Checkout() {
    const [cart, setCart] = useState([])
    const [coupon, setCoupon] = useState([])
    const { updateCartCount } = useCart()
    const [selectedCoupon, setSelectedCoupon] = useState([])
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState(0)

    // Lấy dữ liệu giỏ hàng
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await dishesApi.customerCart() || []
                const couponRes = await orderApi.getDiscount() || []
                setCart(response.carts[0].products || [])
                setCoupon(couponRes.discount_codes)
                setTotal(response.carts[0].total_value)
                console.log("coupon:", couponRes.discount_codes)
                console.log("cartRes in checkout:", response.carts[0].products)
            } catch (err) {
                console.log("Không thể tải giỏ hàng:", err)
            }
        }
        fetchCart()
    }, [])
    
    console.log("Total:", total)

    // Hàm xử lý khi chọn mã giảm giá
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value.split(',')
        const discountValue = parseFloat(selectedValue[0])
        const minimumOrder = parseFloat(selectedValue[1])
        setSelectedCoupon([discountValue, minimumOrder])
    };

    const handleCouponUsing = () => {
        // Nếu tổng giá trị đơn hàng > giá trị tối thiểu của mã giảm giá
        if (total >= selectedCoupon[1]) {
            setDiscount((selectedCoupon[0] / 100) * total)
            alert(`Áp dụng mã giảm giá thành công! Bạn được giảm ${((selectedCoupon[0] / 100) * total).toLocaleString()} VND!`)
            return 
        } else {
            alert(`Đơn hàng của bạn không đạt đủ giá trị tối thiểu ${selectedCoupon[1].toLocaleString()} VND!`)
            return 
        }
    }

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
                                {cart.length > 0 ? (
                                    cart.map((item, index) => (
                                        <div className="d-flex mb-3" key={index}>
                                            <img
                                                src={item.product.image}
                                                className='rounded' 
                                                style={{width: '4em'}} 
                                            />
                                            <p className="ms-3 align-self-center me-auto">{item.product.name}</p>
                                            <p className="align-self-center ms-2"><Currency amount={item.product.price} fontSize={16}/></p>
                                            <p className="align-self-center ms-2">x{item.quantity}</p>
                                        </div>
                                    ))
                                ) : (
                                    <span></span>
                                )}
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
                                    <Form.Select defaultValue="Chọn mã giảm giá" onChange={handleSelectChange}>
                                        {coupon.length > 0 ? (
                                            coupon.map((item, index) => (
                                                <option key={index} value={[item.discountvalue, item.minimum]}>{item.description}</option>
                                            ))
                                        ) : (
                                            <option className="text-secondary">Không có mã giảm giá</option>
                                        )}
                                    </Form.Select>
                                    <Button
                                        variant="dark"
                                        className='blButtonHover rounded-pill ms-3'
                                        onClick={handleCouponUsing}
                                        style={{width: '8rem'}}
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
                                    <Currency
                                        amount={cart.reduce((total, item) => total + item.quantity * item.product.price, 0)}
                                        fontSize={17}
                                    />
                                    </span>
                                </p>
                                <p className="mb-2">
                                    Phí vận chuyển
                                    <span className="float-end fw-medium" style={{color: "#16a634"}}>
                                        +<Currency amount={25000} fontSize={17}/>
                                    </span>
                                </p>    
                                <p className="mb-2">
                                    Mã giảm giá
                                    <span className="float-end fw-medium" style={{color: "#f32409"}}>
                                        -<Currency amount={discount} fontSize={17}/>
                                    </span>
                                </p>
                                <p className="mb-2 fw-medium">
                                    Tổng cộng
                                    <span className="float-end" style={{color: '#000066'}}>
                                        <Currency
                                            amount={total + 25000 - discount}
                                            fontSize={18}
                                        />
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