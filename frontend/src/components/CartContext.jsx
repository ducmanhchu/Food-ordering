import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";

import dishesApi from "../api/dishes";

// Đảm bảo hiển thị số loại sản phẩm đang có trong giỏ hàng

// Tạo Context
const CartContext = createContext();

// Provider để bao bọc các component cần dùng context
export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    // Lấy số lượng loại sản phẩm hiện có trong giỏ hàng
    useEffect(() => {
        const fetchCart = async() => {
            try {
                const dishCount = await dishesApi.customerCart()
                setCartCount(dishCount.carts[0].quantity)
            } catch(err) {
                console.log("Lỗi khi lấy dữ liệu giỏ hàng trong context", err)
                setCartCount(0)
            }
        }
        fetchCart()
    }, [])


    const updateCartCount = (newCount) => {
        setCartCount(newCount); 
    };

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook để dễ dàng sử dụng CartContext
export const useCart = () => {
    return useContext(CartContext);
};
