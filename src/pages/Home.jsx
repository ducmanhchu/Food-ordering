import { Container, Spinner } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Left from '../assets/Left.svg'
import Right from '../assets/Right.svg'
import Banner from '../assets/Banner.png'
import Dish from '../components/Dish'
import dishesApi from '../api/dishes'

function Home() {
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [startIndex, setStartIndex] = useState(0);

    // Lấy dữ liệu 
    useEffect(() => {
        const fetchDishes = async () => {
            setLoading(true);
            try {
                const response = await dishesApi.getAllDishes()

                if (response) {
                    setDishes(response.items || [])

                }
            } catch (error) {
                console.log("Loi khi lay du lieu:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchDishes()
    }, [])

    // Điều khiển mũi tên trái
    const handlePrev = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
    };

    // Điều khiển mũi tên phải
    const handleNext = () => {
        setStartIndex((prevIndex) => Math.min(prevIndex + 4, dishes.length - 4));
    };

    // Chỉ hiển thị 4 món ăn mỗi lần
    const visibleDishes = dishes.slice(startIndex, startIndex + 4);

    return (
        <>
            <Header />

            <img src={Banner} alt="Banner" className='w-100 mb-4'/> 
            <Container>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" variant="secondary"/>
                    </div>
                ) : (
                    <div className="d-flex justify-content-between align-items-start my-5 px-5">
                        <button type='button' className='btn d-flex align-self-center rounded-circle' onClick={handlePrev}>
                            <img src={Left} alt="Left Arrow" height='20'/>
                        </button>
                        <Dish data={visibleDishes}/>
                        <button type='button' className='btn d-flex align-self-center rounded-circle' onClick={handleNext}>
                            <img src={Right} alt="Right Arrow" height='20'/>
                        </button>
                    </div>
                )}
            </Container>

            <Footer />
        </>
    )
}

export default Home