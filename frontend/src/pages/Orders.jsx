import { Container,Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

import React, { useState, useEffect } from "react";
// import orderApi from "./api/orderApi"; // Import the API
import orderApi from "../api/order";
import '../components/Custom.css'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getUserOrders();
        console.log(response.orders)
        setOrders(response.orders); // Assuming response contains an 'orders' array
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
    return (
        <>
            <Header />
            
            <Container>
                <Navbar>
                    <nav style={{
                                    "--bs-breadcrumb-divider": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")`,
                                }} aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/" className="link-underline-light text-secondary">Trang chủ</Link></li>
                        <li className="breadcrumb-item active text-dark" aria-current="page">Đơn hàng</li>
                    </ol>
                    </nav>
                </Navbar>
                <h1 className="mb-3">Đơn hàng của tôi</h1>

        {orders.length === 0 ? (
          <div>Không có đơn hàng nào</div>
        ) : (
          orders.map((order) => (
            <div className="my-4" key={order.id}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
                    <h6>Mã đơn hàng: <span className="text-secondary">{order.tracking_number}</span></h6>
                    <h6>Trạng thái: <span className="text-primary">{order.status}</span></h6>
                  </div>

                  <ul className="list-group list-group-flush mb-3 border-bottom">
                  {order.products.map((productItem, index) => (
                      <li
                        className="d-flex justify-content-between mb-3"
                        key={`${order.id}-product-${index}`}
                      >
                        <span>{productItem.product.name}</span>
                        <span>x{productItem.quantity}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fw-bold">
                      Thành tiền:{" "}
                      <span className="fw-bold" style={{ color: "#000066" }}>
                        {order.tongtien.toLocaleString()}đ
                      </span>
                    </p>
                  </div>

                  <div className="text-end mt-3">
                    <button className="btn me-2 rounded-pill rButtonHover">
                      Hủy đơn
                    </button>
                    <Link
                      to="/orderdetail"
                      className="btn rounded-pill buttonHover"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Orders