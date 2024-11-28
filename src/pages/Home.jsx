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
    const [loading, setLoading] = useState(true)   // Trạng thái lấy dữ liệu
    const [categories, setCategories] = useState({})    // Danh mục và các món ăn trong đó

    // Lấy dữ liệu 
    useEffect(() => {
        const fetchDishes = async () => {
            setLoading(true);
            try {
                const response = await dishesApi.getAllDishes()

                if (response) {
                    const dishesData = response.items || []  
                    
                    // Nhóm món ăn theo danh mục
                    const dishCatagories = dishesData.reduce((acc, dish) => {   // Danh sách gồm danh mục và các món ăn của nó
                        const catagoryName = dish.groupName[0]   // Thuộc tính dùng để chia nhóm (groupName[0])
                        if (!acc[catagoryName]) {
                            acc[catagoryName] = []
                        }
                        acc[catagoryName].push(dish)
                        return acc
                    }, {})

                    setCategories(dishCatagories)
                }
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchDishes()
    }, [])


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
                    Object.keys(categories).map((group, index) => (
                        <ProductCarousel
                            key={index}
                            group={group}
                            dishes={categories[group]}
                        />
                    ))
                )}
            </Container>

            <Footer />
        </>
    )
}

// Hàm hiển thị sản phẩm theo băng chuyền
function ProductCarousel({ group, dishes }) {
    const [startIndex, setStartIndex] = useState(0)

    const handlePrev = () => {
        setStartIndex((prevIndex) =>
            prevIndex === 0 ? Math.max(dishes.length - 4, 0) : Math.max(prevIndex - 4, 0)
        )
    }

    const handleNext = () => {
        setStartIndex((prevIndex) =>
            prevIndex + 4 >= dishes.length ? 0 : Math.min(prevIndex + 4, dishes.length - 4)
        )
    }

    // Hiển thị 4 sản phẩm 1 lượt 
    const visibleDishes = dishes.slice(startIndex, startIndex + 4)

    return (
        <div className="my-5">
            <h1 className="text-center pb-4">{group}</h1>
            <div className="d-flex justify-content-between align-items-start px-5">
                <button
                    type="button"
                    className="btn d-flex align-self-center rounded-pill"
                    onClick={handlePrev}
                >
                    <img src={Left} alt="Left Arrow" height="20" />
                </button>
                <Dish data={visibleDishes} />
                <button
                    type="button"
                    className="btn d-flex align-self-center rounded-pill"
                    onClick={handleNext}
                >
                    <img src={Right} alt="Right Arrow" height="20" />
                </button>
            </div>
        </div>
    )
}

export default Home