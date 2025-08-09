"use client";
import {
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiActivity,
  FiPackage,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";
import { FaTshirt, FaHeadphones } from "react-icons/fa";
import AdminSideBar from "@/app/_components/adminSideBar";

export default function Dashboard() {
  // Sample data - in a real app this would come from your API
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12%",
      icon: <FiDollarSign className="text-2xl" />,
    },
    {
      title: "Total Orders",
      value: "156",
      change: "+5%",
      icon: <FiShoppingBag className="text-2xl" />,
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8%",
      icon: <FiUsers className="text-2xl" />,
    },
    {
      title: "New Products",
      value: "24",
      change: "+3%",
      icon: <FaTshirt className="text-2xl" />,
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Amina Diallo",
      date: "12 Aug 2023",
      amount: "$89.99",
      status: "Delivered",
    },
    {
      id: "#ORD-002",
      customer: "Fatou Bensouda",
      date: "11 Aug 2023",
      amount: "$124.50",
      status: "Shipped",
    },
    {
      id: "#ORD-003",
      customer: "Nneka Eze",
      date: "10 Aug 2023",
      amount: "$65.75",
      status: "Processing",
    },
    {
      id: "#ORD-004",
      customer: "Zahra Mohammed",
      date: "9 Aug 2023",
      amount: "$210.00",
      status: "Delivered",
    },
    {
      id: "#ORD-005",
      customer: "Yaa Asantewaa",
      date: "8 Aug 2023",
      amount: "$78.30",
      status: "Cancelled",
    },
  ];

  const popularProducts = [
    {
      name: "Ankara Maxi Dress",
      sales: 45,
      icon: <FaTshirt className="text-xl" />,
    },
    {
      name: "Kente Print Scarf",
      sales: 38,
      icon: <FaTshirt className="text-xl" />,
    },
    {
      name: "Dashiki Two-Piece",
      sales: 32,
      icon: <FaTshirt className="text-xl" />,
    },
    {
      name: "Beaded Waist Belt",
      sales: 28,
      icon: <FaHeadphones className="text-xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-27">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="w-10 h-10 bg-[#FF7D5E] rounded-full flex items-center justify-center text-white font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#FF7D5E] to-[#5E2BFF] text-white p-6 rounded-xl mb-6">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
            <p className="opacity-90">
              Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <p
                      className={`text-sm mt-2 ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                    >
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className="p-3 bg-[#5E2BFF] bg-opacity-10 rounded-lg text-[#5E2BFF]">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders and Popular Products */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Recent Orders</h3>
                <a href="#" className="text-[#5E2BFF] text-sm font-medium">
                  View All
                </a>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 font-medium">{order.id}</td>
                        <td className="py-4">{order.customer}</td>
                        <td className="py-4 text-gray-500">{order.date}</td>
                        <td className="py-4 font-medium">{order.amount}</td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Popular Products */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Popular Products</h3>
                <a href="#" className="text-[#5E2BFF] text-sm font-medium">
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {popularProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-[#5E2BFF] bg-opacity-10 rounded-lg text-[#5E2BFF] mr-4">
                      {product.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-gray-500 text-sm">
                        {product.sales} sales
                      </p>
                    </div>
                    <div className="text-[#5E2BFF]">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sales Chart Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold mb-6">Sales Overview</h3>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-400">
                Sales Chart Visualization
              </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start">
                    <div className="p-2 bg-[#5E2BFF] bg-opacity-10 rounded-lg text-[#5E2BFF] mr-4">
                      <FiUsers className="text-lg" />
                    </div>
                    <div>
                      <p className="font-medium">New customer registered</p>
                      <p className="text-gray-500 text-sm">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
