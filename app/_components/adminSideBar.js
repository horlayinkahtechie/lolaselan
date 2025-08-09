import Link from "next/link";
import {
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiActivity,
  FiPackage,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";

export default function AdminSideBar() {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-[#5E2BFF] text-white p-4 hidden md:block mt-27">
      <div className="flex items-center space-x-2 p-4 mb-3">
        <h1 className="text-xl font-bold">Lolaselan</h1>
      </div>

      <nav className="pb-10">
        <Link
          href="/admin/dashboard"
          className="flex items-center space-x-3 p-3 hover:bg-black hover:text-white bg-white text-black bg-opacity-10 rounded-lg mb-2"
        >
          <FiActivity className="text-lg" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center space-x-3 p-3 hover:bg-opacity-10 rounded-lg mb-2"
        >
          <FiShoppingBag className="text-lg" />
          <span>Products</span>
        </Link>
        <Link
          href="/admin/customers"
          className="flex items-center space-x-3 p-3  hover:bg-opacity-10 rounded-lg mb-2"
        >
          <FiUsers className="text-lg" />
          <span>Customers</span>
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center space-x-3 p-3 hover:bg-opacity-10 rounded-lg mb-2"
        >
          <FiPackage className="text-lg" />
          <span>Orders</span>
        </Link>
        <Link
          href="/admin/analytics"
          className="flex items-center space-x-3 p-3 hover:bg-opacity-10 rounded-lg mb-2"
        >
          <FiBarChart2 className="text-lg" />
          <span>Analytics</span>
        </Link>
        <Link
          href="#"
          className="flex items-center space-x-3 p-3 hover:bg-opacity-10 rounded-lg mb-2"
        >
          <FiSettings className="text-lg" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}
