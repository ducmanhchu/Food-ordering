import { Navbar, Container, Form, InputGroup, Offcanvas, Dropdown, Button, Toast, ToastContainer, ListGroup } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Logo from '../assets/Logo.svg'
import SearchLogo from '../assets/Search.svg'
import UserLogo from '../assets/User.svg'
import GroupLogo from '../assets/Group.svg'
import BagLogo from '../assets/Bag.svg'
import Cart from './Cart';
import Currency from './Currency'
import './Custom.css'
import dishesApi from '../api/dishes';

function Header() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    // Ngăn người dùng sử dụng các nút điều hướng trên Header khi đang ở trang thanh toán 
    const location = useLocation()
    const isCheckout = location.pathname === '/checkout'
    const [showCheckout, setShowCheckout] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const [dishes, setDishes] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredDishes, setFilteredDishes] = useState([])
    const [quantity, setQuantity] = useState(1)
    // Xử lý khi đã đăng nhập
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const userName = sessionStorage.getItem('username')
    const navigate = useNavigate()

    // Kiểm tra trạng thái đăng nhập
    useEffect(() => {
        const accessToken = sessionStorage.getItem("access_token")
        setIsLoggedIn(!!accessToken) // Chuyển đổi thành boolean
    }, [])

    // Xử lý đăng xuất
    const handleLogout = () => {
        sessionStorage.clear() // Xóa tất cả thông tin trong sessionStorage
        setIsLoggedIn(false) // Cập nhật trạng thái
        setShowLogout(true)
        navigate('/')
    }

    const handleClose = () => setShowOffcanvas(false)
    const handleShow = () => {
        if (isCheckout) {
            setShowCheckout(true)
        } else {
            setShowOffcanvas(true);
        }
    }

    // Lấy dữ liệu cho việc tìm kiếm sản phẩm 
    useEffect(() => {
        const fetchDishes = async() => {
            try {
                const response = await dishesApi.getAllDishes()
                setDishes(response || [])
            } catch (error) {
                console.log('Lỗi lấy dữ liệu tìm kiếm: ', error)
            }
        }

        fetchDishes()
    }, [])

    const handleSearch = (query) => {
        setSearchQuery(query)
        if (query === '') {
            setFilteredDishes([])
        } else {
            const filtered = dishes.filter(dish => {
                return dish.name.toLowerCase().includes(query.toLowerCase())  // So sánh giá trị người dùng nhập với tên món (flavorName)
            })
            setFilteredDishes(filtered)
        }
    }

    // Ẩn phần tìm kiếm sau khi người dùng chọn một món ăn trong phần tìm kiếm này
    const handleSelectDish = (dishId, dishName) => {
        setSearchQuery('')
        setFilteredDishes([])
    }

    // Tăng giảm số lượng 
    const handleIncrease = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        if (onQuantityChange) onQuantityChange(newQuantity)
    }
    
    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
            if (onQuantityChange) onQuantityChange(newQuantity) 
        }
    }

    return (
        <>
            <Navbar className='bg-white sticky-top'>
                <Container className='py-2 d-flex justify-content-between'>
                    {/* Logo  */}
                    <Navbar.Brand as={Link} to="/">
                        <img src={Logo} alt="TLU Food Logo" height="35" className="d-inline-block" />
                    </Navbar.Brand>

                    {/* Tìm kiếm */}
                    <Form className='position-relative' onSubmit={(e) => e.preventDefault()}>
                        <InputGroup className='rounded-pill bg-body-secondary px-3' style={{ width: '500px', height: '4030' }} >
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="rounded-pill bg-body-secondary border-0 me-2"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <img
                                src={SearchLogo}
                                alt="Search Logo"
                                height='20'
                                className="align-self-center"
                            />
                        </InputGroup>
                        {/* Phần hiển thị kết quả tìm kiếm  */}
                        {filteredDishes.length > 0 && (
                            <ListGroup className='z-3 position-absolute mt-2 overflow-y-auto' style={{ maxHeight: '300px' }}>
                                {filteredDishes.map(dish => (
                                    <ListGroup.Item
                                        key={dish.id}
                                        onClick={() => handleSelectDish(dish.id, dish.name)}
                                        style={{width: '500px'}}
                                    >
                                        <Link to={dish ? `/dish/${dish.id}` : '/'} className="text-decoration-none text-dark">
                                            <div className="d-flex">
                                                <img
                                                    src={dish.image}
                                                    className='object-fit-scale'
                                                    style={{width: '35px', height: '30px'}}
                                                />
                                                <h6 className='ms-3 pt-2'>{dish.name}</h6>
                                            </div>
                                        </Link> 
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Form>

                    <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                        {/* Blog  */}
                        <Link to='/blog'>
                            <img src={GroupLogo} alt="Group Logo" height='30' className='me-4 iconHover'/>                        
                        </Link>
                        {/* Giỏ hàng */}
                        <img src={BagLogo} alt="Bag Logo" height='30' className='me-2 iconHover' onClick={handleShow}/>
                        {/* Người dùng */}
                        <Dropdown className='p-0'>
                            <Dropdown.Toggle className='bg-transparent border border-0'>
                                <img src={UserLogo} className='iconHover' alt="User Logo" height='30'/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {isLoggedIn ? (
                                    <>
                                        <Dropdown.Header className='fw-medium'>{userName}</Dropdown.Header>
                                        <Dropdown.Divider />
                                        <Dropdown.Item>
                                            <Link to="/account" className="text-decoration-none text-black">
                                                Trang cá nhân
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link to="/orders" className="text-decoration-none text-black">
                                                Đơn hàng của tôi
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout} className="text-decoration-none text-black">
                                            Đăng xuất
                                        </Dropdown.Item>
                                    </>
                                    ) : (
                                        <Dropdown.Item>
                                            <Link to="/login" className="text-decoration-none text-black">
                                                Đăng nhập
                                            </Link>
                                        </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Container>
            </Navbar>

            {/* Giỏ hàng */}
            <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title className='fw-bold'>Giỏ hàng</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="d-flex mb-2">
                        <span className='d-flex align-self-center pb-1' >
                            <button type='button' className='btn fw-bold border border-0' onClick={handleDecrease}>-</button>
                            <span className='align-self-center mx-0'>{quantity}</span>
                            <button type='button' className='btn fw-bold border border-0' onClick={handleIncrease}>+</button>
                        </span>
                        <img 
                            src="https://placehold.co/50x50" 
                            className='object-fit-scale mx-1' 
                            style={{width: '50px', height: '50px'}}
                        />
                        <p className='fw-medium ms-2 pt-3' style={{fontSize: '14px'}}>Cơm tấm Sài Gòn</p>
                        <p className='ms-auto pt-3'><Currency amount={50000} fontSize={16} /></p>
                    </div>
                    
                </Offcanvas.Body>
                <div className="mt-auto px-3 py-2 border-top">
                    <div className="d-flex justify-content-between align-items-end">
                        <p className=''>Tổng cộng</p>
                        <p><Currency amount={100000}/></p>
                    </div>
                    <Link to='/checkout'>
                        <Button className='buttonHover rounded-pill' style={{width: '100%'}}>
                            Thanh toán
                        </Button>
                    </Link>
                </div>
            </Offcanvas>

            <ToastContainer className="mt-3" position="top-center">
                <Toast className="bg-warning-subtle text-center" onClose={() => setShowCheckout(false)} delay={3000} show={showCheckout} autohide>
                    <Toast.Body>Hãy hoàn thành việc thanh toán!</Toast.Body>
                </Toast>    
            </ToastContainer>
            <ToastContainer className="mt-3" position="top-center">
                <Toast className="bg-success-subtle text-center" onClose={() => setShowLogout(false)} delay={2500} show={showLogout} autohide>
                    <Toast.Body>Đăng xuất thành công!</Toast.Body>
                </Toast>    
            </ToastContainer>
        </>
    )
}

export default Header