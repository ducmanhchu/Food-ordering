import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Logo from '../assets/Logo.svg'
import '../components/Custom.css'

function Register() {
    return (
        <>
            <div className="d-flex justify-content-center py-3 border-bottom">
                <Link to='/'>
                    <img src={Logo} alt="TLU Food Logo" height="30" style={{ cursor: 'pointer' }}/>
                </Link>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-md-3">
                        <div style={{marginTop: '100px'}}>
                            <p className="fs-3 fw-bold">Tạo tài khoản</p>
                            <Form.Label htmlFor="emailUser">Tên tài khoản</Form.Label>
                            <Form.Control
                                type="email"
                                id="emailUser"
                                placeholder='Nhập tên tài khoản'
                                className='mb-2'
                            />
                            <Form.Label htmlFor="emailUser2">Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="emailUser2"
                                placeholder='Nhập email'
                                className='mb-2'
                            />
                            <Form.Label htmlFor="passwordlUser">Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                id="passwordUser"
                                placeholder='Nhập mật khẩu'
                                className='mb-4'
                            />
                            <Button className='buttonHover rounded-pill' style={{width: '100%'}}>
                                Tạo tài khoản
                            </Button>
                            <p className='text-secondary text-center mt-4'>
                                Đã có tài khoản?
                                <Link to='/login'>
                                    <span className='text-black ms-1 text-decoration-underline'>Đăng nhập</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register