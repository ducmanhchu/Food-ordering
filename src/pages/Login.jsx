import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Logo from '../assets/Logo.svg'

function Login() {
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
                        <div style={{marginTop: '125px'}}>
                            <p className="fs-3 fw-bold">Đăng nhập</p>
                            <Form.Label htmlFor="emailUser">Tài khoản</Form.Label>
                            <Form.Control
                                type="email"
                                id="emailUser"
                                placeholder='Nhập tên tài khoản hoặc email'
                                className='mb-2'
                            />
                            <Form.Label htmlFor="passwordlUser">Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                id="passwordUser"
                                placeholder='Nhập mật khẩu'
                                className='mb-4'
                            />
                            <Button className='text-white rounded-pill' style={{width: '100%', backgroundColor: '#000066'}}>
                                Đăng nhập
                            </Button>
                            <p className='text-secondary text-center mt-4'>
                                Không có tài khoản?
                                <Link to='/register'>
                                    <span className='text-black ms-1 text-decoration-underline'>Đăng ký</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login