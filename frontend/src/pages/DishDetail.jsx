import { Breadcrumb, Container, Col, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import dishesApi from "../api/dishes"
import Star from '../components/Star'
import Currency from '../components/Currency'
import Review from '../components/Review'
import '../components/Custom.css'

function DishDetail() {
    const {id} = useParams()
    const [dish, setDish] = useState(null)
    const [quantity, setQuantity] = useState(1)

    // Lấy dữ liệu
    useEffect(() => {
        const fetchDish = async() => {
            try {
                const dishDetail = await dishesApi.getDishDetail(id)
                setDish(dishDetail)
            } catch (error) {
                console.log("Loi khi lay du lieu mon an:", error)
            }
        }
        fetchDish()
    }, [id])

    const handleIncrease = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
    }
    
    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
        }
    }

    return (
        <>
            <Header />

            <Container>
                <Breadcrumb className='my-3'>
                    <Link to='/' className='text-decoration-none text-secondary me-2'>Trang chủ</Link>
                    <span className='text-secondary me-2'>&gt;</span>
                    <Breadcrumb.Item active>
                        {dish ? dish.name : "Đang tải..."}
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Row className='border-bottom pb-3 mb-4'>
                    <Col>
                        <img 
                            src={dish?.image || 'https://placehold.co/320x200?text=Loading...'} 
                            alt="Ảnh sản phẩm"
                            className='object-fit-cover rounded' 
                            style={{width:'100%', height: '450px'}}
                        />
                    </Col>
                    <Col className='ps-2'>
                        <p className='fs-1 fw-medium mb-2'>{dish ? dish.name : "Đang tải..."}</p>
                        <Star st={dish ? dish.rating : 0} />
                        <span className='ms-2 text-secondary'>{dish ? dish.rating : 0}/5</span>
                        {
                            dish && dish.status === 'tạm ngưng'  ? (
                                <span className='ms-3 px-3 py-1 bg-danger rounded-pill text-white'>Tạm ngưng</span>
                            ) : (
                                <span></span>
                            )
                        }
                        <p className='text-secondary my-2'>Đã bán {dish ? dish.sold : 0}</p>
                        <p className='my-1'><Currency amount={dish ? dish.price : 0} fontSize={32}/></p>
                        <p className='text-secondary border-bottom border-secondary-subtle pb-3'>{dish ? dish.description : "Đang tải..."}</p>
                        <div className="d-flex">
                            <span className='d-flex rounded-pill align-self-center px-2 pb-1' style={{backgroundColor: '#D1D1D6'}}>
                                <button type='button' className='btn fw-bold border border-0' onClick={handleDecrease}>-</button>
                                <span className='align-self-center mx-3'>{quantity}</span>
                                <button type='button' className='btn fw-bold border border-0' onClick={handleIncrease}>+</button>
                            </span>
                            {
                                dish && dish.status === 'tạm ngưng'  ? (
                                    <button disabled
                                        type="button" className="btn rounded-pill ms-3 px-5 pb-2 buttonHover"
                                        
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                            ) : (
                                    <button
                                        type="button" className="btn rounded-pill ms-3 px-5 pb-2 buttonHover"
                                        
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                            )
                        }
                        </div>
                    </Col>                
                </Row>
                <p className='fs-4 fw-medium'>Đánh giá</p>
                
            </Container>
                <Container className='d-flex flex-wrap'>
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                </Container>
            <Footer />
        </>
    )
}

export default DishDetail