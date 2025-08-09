"use client";
import { useState } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiMoreVertical,
} from "react-icons/fi";
import AdminSideBar from "@/app/_components/adminSideBar";

export default function Orders() {
  // Dummy order data
  const initialOrders = [
    {
      order_id: "ORD-001",
      customer: "Amina Diallo",
      date: "2023-08-15",
      items: 3,
      amount: 149.97,
      status: "Processing",
      payment: "Paid",
    },
    {
      order_id: "ORD-002",
      customer: "Fatou Bensouda",
      date: "2023-08-14",
      items: 2,
      amount: 89.98,
      status: "Shipped",
      payment: "Paid",
    },
    {
      order_id: "ORD-003",
      customer: "Nneka Eze",
      date: "2023-08-13",
      items: 1,
      amount: 59.99,
      status: "Delivered",
      payment: "Paid",
    },
    {
      order_id: "ORD-004",
      customer: "Zahra Mohammed",
      date: "2023-08-12",
      items: 4,
      amount: 210.0,
      status: "Processing",
      payment: "Pending",
    },
    {
      order_id: "ORD-005",
      customer: "Yaa Asantewaa",
      date: "2023-08-11",
      items: 2,
      amount: 78.3,
      status: "Shipped",
      payment: "Paid",
    },
    {
      order_id: "ORD-006",
      customer: "Adjoa Mensah",
      date: "2023-08-10",
      items: 3,
      amount: 145.5,
      status: "Delivered",
      payment: "Paid",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.order_id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setShowStatusModal(false);
  };

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "Processing":
        return {
          icon: <FiClock className="mr-1" />,
          color: "bg-yellow-100 text-yellow-800",
        };
      case "Shipped":
        return {
          icon: <FiTruck className="mr-1" />,
          color: "bg-blue-100 text-blue-800",
        };
      case "Delivered":
        return {
          icon: <FiCheckCircle className="mr-1" />,
          color: "bg-green-100 text-green-800",
        };
      default:
        return { icon: null, color: "bg-gray-100 text-gray-800" };
    }
  };

  // Open status modal
  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pt-28">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#5E2BFF] text-white shadow-lg z-10">
        <AdminSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Orders Management
            </h1>
            <p className="text-gray-600">View and manage customer orders</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders by customer or ID..."
                  className="w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white">
                  <option>All Status</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white">
                  <option>All Payments</option>
                  <option>Paid</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-left text-gray-500 text-sm">
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Items</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Payment</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order) => {
                      const statusInfo = getStatusInfo(order.status);
                      return (
                        <tr key={order.order_id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">
                            {order.order_id}
                          </td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">{order.date}</td>
                          <td className="px-6 py-4">{order.items}</td>
                          <td className="px-6 py-4">
                            ${order.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs ${
                                order.payment === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.payment}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs flex items-center ${statusInfo.color}`}
                            >
                              {statusInfo.icon}
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="relative">
                              <button
                                onClick={() => openStatusModal(order)}
                                className="p-2 text-gray-500 hover:text-[#5E2BFF] rounded-lg hover:bg-purple-100"
                              >
                                <FiMoreVertical />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredOrders.length > ordersPerPage && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <button
                  onClick={() =>
                    paginate(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  disabled={currentPage === 1}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <FiChevronLeft />
                  <span>Previous</span>
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-8 h-8 rounded-full ${currentPage === number ? "bg-[#5E2BFF] text-white" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        {number}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() =>
                    paginate(
                      currentPage < totalPages ? currentPage + 1 : totalPages
                    )
                  }
                  disabled={currentPage === totalPages}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <span>Next</span>
                  <FiChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Update Order Status</h2>
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  Order:{" "}
                  <span className="font-semibold">
                    {selectedOrder.order_id}
                  </span>
                </p>
                <p className="text-gray-700">
                  Customer:{" "}
                  <span className="font-semibold">
                    {selectedOrder.customer}
                  </span>
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <h3 className="font-medium text-gray-700">
                  Select new status:
                </h3>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() =>
                      updateOrderStatus(selectedOrder.order_id, "Processing")
                    }
                    className={`px-4 py-2 rounded-lg text-left flex items-center ${selectedOrder.status === "Processing" ? "bg-[#5E2BFF] text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    <FiClock className="mr-2" />
                    Processing
                  </button>
                  <button
                    onClick={() =>
                      updateOrderStatus(selectedOrder.order_id, "Shipped")
                    }
                    className={`px-4 py-2 rounded-lg text-left flex items-center ${selectedOrder.status === "Shipped" ? "bg-[#5E2BFF] text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    <FiTruck className="mr-2" />
                    Shipped
                  </button>
                  <button
                    onClick={() =>
                      updateOrderStatus(selectedOrder.order_id, "Delivered")
                    }
                    className={`px-4 py-2 rounded-lg text-left flex items-center ${selectedOrder.status === "Delivered" ? "bg-[#5E2BFF] text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    <FiCheckCircle className="mr-2" />
                    Delivered
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
