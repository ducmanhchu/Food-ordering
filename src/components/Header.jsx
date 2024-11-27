import { Navbar, Container, Form, InputGroup, Offcanvas, Dropdown } from 'react-bootstrap'
import { useState } from 'react';
import { Link } from 'react-router-dom'

import Logo from '../assets/Logo.svg'
import SearchLogo from '../assets/Search.svg'
import UserLogo from '../assets/User.svg'
import GroupLogo from '../assets/Group.svg'
import BagLogo from '../assets/Bag.svg'
import Cart from './Cart';

function Header() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    return (
        <>
            <Navbar className='bg-white'>
                <Container className='py-2 d-flex justify-content-between'>
                    {/* Logo  */}
                    <Navbar.Brand as={Link} to="/">
                        <img src={Logo} alt="TLU Food Logo" height="35" className="d-inline-block" />
                    </Navbar.Brand>

                    {/* Tìm kiếm */}
                    <Form>
                        <InputGroup className='rounded-pill bg-body-secondary px-3' style={{ cursor: 'pointer', width: '500px', height: '4030' }} >
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="rounded-pill bg-body-secondary border-0 me-2"
                            />
                            <img src={SearchLogo} alt="Search Logo" height='20' className="align-self-center" onClick={() => {}} />
                        </InputGroup>
                    </Form>

                    <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                        {/* Blog  */}
                        <Link to='/blog'>
                            <img src={GroupLogo} alt="Group Logo" height='30' className='me-4'/>                        
                        </Link>
                        {/* Giỏ hàng */}
                        <img src={BagLogo} alt="Bag Logo" height='30' className='me-2' onClick={handleShow}/>
                        {/* Người dùng */}
                        <Dropdown className='p-0'>
                            <Dropdown.Toggle className='bg-transparent border border-0'>
                                <img src={UserLogo} className='' alt="User Logo" height='30'/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link to='/login' className='text-decoration-none text-black'>
                                        Đăng nhập
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Container>
            </Navbar>

            {/* Giỏ hàng */}
            <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='fw-bold'>Giỏ hàng</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Cart />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header