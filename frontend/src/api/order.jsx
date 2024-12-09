import axiosClient from "./axios"; // Assuming axiosClient is the configured axios instance

const orderApi = {
  // Function to get orders for the logged-in user
  getUserOrders() {
    const url = "/orders"; // Replace with the actual endpoint for fetching user orders
    return axiosClient.get(url);
  },
};

export default orderApi;
