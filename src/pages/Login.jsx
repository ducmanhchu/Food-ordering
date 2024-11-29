import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Container } from "react-bootstrap";
import Logo from '../assets/Logo.svg'
import '../components/Custom.css'

function Login() {
    return (
        <>
    
            <div className="d-flex justify-content-center py-3 border-bottom bg-white">
                <Link to='/'>
                    <img src={Logo} alt="TLU Food Logo" height="30" style={{ cursor: 'pointer' }}/>
                </Link>
            </div>
            <Container>
                
            <div className="bg-white mt-5 rounded" style={{width:"100%",height:"50%"}} >
            
                <div className="row p-3">
                
                    <div className='col-md-5'>
                    <img src='favicon.png' style={{width:"20%"}}></img>
                        <img src='login.jpg' style={{width:"85%"}}></img>
                    </div>
                    <div className="col-md-7 justify-content-center">
                        <div className='p-5' style={{width:"85%",marginTop:"85px"}}>
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
                            <Button className='buttonHover rounded-pill' style={{width: '100%'}}>
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
            </Container>
        </>
    )
}

export default Login