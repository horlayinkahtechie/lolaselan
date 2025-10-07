"use client";
import { useState, useEffect } from "react";
import {
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiActivity,
  FiPackage,
  FiSettings,
  FiBarChart2,
  FiSearch,
  FiChevronRight,
  FiTruck,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import supabase from "@/app/lib/supabase";
import AdminSideBar from "@/app/_components/adminSideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [ordersData, setOrdersData] = useState([]);
  const [totalProductsData, setTotalProducts] = useState([]);
  const [totalUsersData, setTotalUsersData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersChange, setOrdersChange] = useState("Loading...");
  const [revenueChange, setRevenueChange] = useState("Loading...");
  const [usersChange, setUsersChange] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [session, status, router]);

  useEffect(() => {
  const fetchAllData = async () => {
    try {
      setLoading(true);

      const now = new Date();
      const currentMonthOrder = now.getMonth();
      const currentYearOrder = now.getFullYear();

      // Calculate previous month (handle year change if needed)
      const prevMonthOrders =
        currentMonthOrder === 0 ? 11 : currentMonthOrder - 1;
      const prevYearOrders =
        currentMonthOrder === 0 ? currentYearOrder - 1 : currentYearOrder;

      const [
        { data: orders, error: ordersError },
        { data: allProducts, error: allProductsError },
        { data: allUsers, error: allUsersError },
        { data: currentMonthOrders, error: currentMonthOrdersError },
        { data: previousMonthOrders, error: previousMonthOrdersError },
        { data: currentMonthUsers, error: currentMonthUsersError },
        { data: previousMonthUsers, error: previousMonthUsersError },
        { data: currentMonthRevenue, error: currentMonthRevenueError },
        { data: previousMonthRevenue, error: previousMonthRevenueError },
        { data: allOrders, error: allOrdersError },
      ] = await Promise.all([
        supabase
          .from("orders")
          .select("*")
          .eq("status", "paid") // Only paid orders for recent orders list
          .order("created_at", { ascending: false }),
        supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase.from("users").select("*"),
        supabase
          .from("orders")
          .select("*")
          .eq("status", "paid") // Only paid orders for current month
          .gte(
            "created_at",
            new Date(currentYearOrder, currentMonthOrder, 1).toISOString()
          )
          .lt(
            "created_at",
            new Date(currentYearOrder, currentMonthOrder + 1, 1).toISOString()
          ),
        supabase
          .from("orders")
          .select("*")
          .eq("status", "paid") // Only paid orders for previous month
          .gte(
            "created_at",
            new Date(prevYearOrders, prevMonthOrders, 1).toISOString()
          )
          .lt(
            "created_at",
            new Date(prevYearOrders, prevMonthOrders + 1, 1).toISOString()
          ),
        supabase
          .from("users")
          .select("*")
          .gte(
            "created_at",
            new Date(currentYearOrder, currentMonthOrder, 1).toISOString()
          )
          .lt(
            "created_at",
            new Date(currentYearOrder, currentMonthOrder + 1, 1).toISOString()
          ),
        supabase
          .from("users")
          .select("*")
          .gte(
            "created_at",
            new Date(prevYearOrders, prevMonthOrders, 1).toISOString()
          )
          .lt(
            "created_at",
            new Date(prevYearOrders, prevMonthOrders + 1, 1).toISOString()
          ),
        supabase
          .from("orders")
          .select("productPrice")
          .eq("status", "paid") // Only paid orders for current month revenue
          .gte(
            "created_at",
            new Date(currentYearOrder, currentMonthOrder, 1).toISOString()
          )
          .lt(
            "created_at",
            new Date(currentYearOrder, currentMonthOrder + 1, 1).toISOString()
          ),
        supabase
          .from("orders")
          .select("productPrice")
          .eq("status", "paid") // Only paid orders for previous month revenue
          .gte(
            "created_at",
            new Date(prevYearOrders, prevMonthOrders, 1).toISOString()
          )
          .lt(
            "created_at",
            new Date(prevYearOrders, prevMonthOrders + 1, 1).toISOString()
          ),
        supabase
          .from("orders")
          .select("productPrice")
          .eq("status", "paid"), // Only paid orders for total revenue
      ]);

      if (
        ordersError ||
        allProductsError ||
        allUsersError ||
        currentMonthOrdersError ||
        previousMonthOrdersError ||
        currentMonthUsersError ||
        previousMonthUsersError ||
        currentMonthRevenueError ||
        previousMonthRevenueError ||
        allOrdersError
      ) {
        throw new Error(
          ordersError?.message ||
            allProductsError?.message ||
            allUsersError?.message ||
            currentMonthOrdersError?.message ||
            previousMonthOrdersError?.message ||
            currentMonthUsersError?.message ||
            previousMonthUsersError?.message ||
            currentMonthRevenueError?.message ||
            previousMonthRevenueError?.message ||
            allOrdersError?.message
        );
      }

      setOrdersData(orders || []);
      setTotalProducts(allProducts || []);
      setTotalUsersData(allUsers || []);

      // Calculate total revenue (only from paid orders)
      const revenueTotal =
        allOrders?.reduce(
          (sum, order) => sum + Number(order.productPrice || 0),
          0
        ) || 0;
      setTotalRevenue(revenueTotal);

      // Calculate orders change (only paid orders)
      const currentOrderCount = currentMonthOrders?.length || 0;
      const prevOrderCount = previousMonthOrders?.length || 0;
      const OrderDifference = currentOrderCount - prevOrderCount;

      let changeText = "";
      if (OrderDifference > 0) {
        changeText = `+${OrderDifference} this month`;
      } else if (OrderDifference < 0) {
        changeText = `${OrderDifference} this month`;
      } else {
        changeText = "No change";
      }

      setOrdersChange(changeText);

      // Calculate users change
      const currentUserCount = currentMonthUsers?.length || 0;
      const prevUserCount = previousMonthUsers?.length || 0;
      const UserDifference = currentUserCount - prevUserCount;

      let userChangeText = "";
      if (UserDifference > 0) {
        userChangeText = `+${UserDifference} this month`;
      } else if (UserDifference < 0) {
        userChangeText = `${UserDifference} this month`;
      } else {
        userChangeText = "No change";
      }

      setUsersChange(userChangeText);

      // Calculate revenue changes (only from paid orders)
      const currentMonthRevenueTotal =
        currentMonthRevenue?.reduce(
          (sum, order) => sum + Number(order.productPrice || 0),
          0
        ) || 0;

      const previousMonthRevenueTotal =
        previousMonthRevenue?.reduce(
          (sum, order) => sum + Number(order.productPrice || 0),
          0
        ) || 0;

      let revenueChangeText = "No change";
      if (previousMonthRevenueTotal > 0) {
        const percentageChange =
          ((currentMonthRevenueTotal - previousMonthRevenueTotal) /
            previousMonthRevenueTotal) *
          100;

        if (percentageChange > 0) {
          revenueChangeText = `+${percentageChange.toFixed(
            1
          )}% from last month`;
        } else if (percentageChange < 0) {
          revenueChangeText = `${percentageChange.toFixed(
            1
          )}% from last month`;
        }
      } else if (currentMonthRevenueTotal > 0) {
        revenueChangeText = "+100% (new revenue)";
      }

      setRevenueChange(revenueChangeText);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchAllData();
}, []);

 useEffect(() => {
  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("status", "paid")
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error) {
        setRecentOrders(orders);
      } else {
        setRecentOrders([]);
      }
    } catch (err) {
      console.error("Something went wrong", err);
    } finally {
      setLoading(false);
    }
  };
  fetchRecentOrders();
}, []);

  return (
    <>
      <AdminSideBar />
      <div className="min-h-screen bg-gray-50 lg:pt-27 pt-48">
        <div className="md:ml-64">
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
                  <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-[#FF7D5E] rounded-full flex items-center justify-center text-white font-bold">
                  AD
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5E2BFF]"></div>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-[#FF7D5E] to-[#5E2BFF] text-white p-6 rounded-xl mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome back, Admin!
                  </h2>
                  <p className="opacity-90">
                    Here&apos;s what&apos;s happening with your store today.
                  </p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* Total Revenue */}

                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-sm">Total Revenue</p>
                        <h3 className="text-2xl font-bold mt-1">
                          £{totalRevenue.toFixed(2)}
                        </h3>
                        <p
                          className={`text-sm mt-1 ${
                            revenueChange.includes("+")
                              ? "text-green-500"
                              : revenueChange.includes("-")
                                ? "text-red-500"
                                : "text-gray-500"
                          }`}
                        >
                          {revenueChange}
                        </p>
                      </div>
                      <div className="p-3 bg-[#5E2BFF] bg-opacity-10 rounded-lg text-white">
                        <FiDollarSign className="text-2xl" />
                      </div>
                    </div>
                  </div>

                  {/* Total Orders */}
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-sm">Total Orders</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {ordersData.length}
                        </h3>
                        <p
                          className={`text-sm mt-1 ${
                            ordersChange.includes("+")
                              ? "text-green-500"
                              : ordersChange.includes("-")
                                ? "text-red-500"
                                : "text-gray-500"
                          }`}
                        >
                          {ordersChange}
                        </p>
                      </div>
                      <div className="p-3 bg-[#5E2BFF] bg-opacity-10 rounded-lg text-white">
                        <FiShoppingBag className="text-2xl" />
                      </div>
                    </div>
                  </div>

                  {/* Total Products */}
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-sm">Total Products</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {totalProductsData.length}
                        </h3>
                      </div>
                      <div className="p-3 bg-[#5E2BFF] bg-opacity-10 rounded-lg text-white">
                        <FiPackage className="text-2xl" />
                      </div>
                    </div>
                  </div>

                  {/* Total Users */}
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {totalUsersData.length}
                        </h3>
                        <p
                          className={`text-sm mt-1 ${
                            usersChange.includes("+")
                              ? "text-green-500"
                              : usersChange.includes("-")
                                ? "text-red-500"
                                : "text-gray-500"
                          }`}
                        >
                          {usersChange}
                        </p>
                      </div>
                      <div className="p-3 bg-[#5E2BFF] bg-opacity-10 rounded-lg text-white">
                        <FiUsers className="text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders and Popular Products */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Recent Orders */}
                  <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold">Recent Orders</h3>
                      <a
                        href="/admin/orders"
                        className="text-[#5E2BFF] text-sm font-medium flex items-center"
                      >
                        View All <FiChevronRight className="ml-1" />
                      </a>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-500 text-sm border-b">
                            <th className="pb-3">Order ID</th>
                            <th className="pb-3">Customer Name</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3">Payment Status</th>
                            <th className="pb-3">Delivery status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-4 font-medium">
                                {order.order_id}
                              </td>
                              <td className="py-4">
                                {order.firstName} {order.lastName}
                              </td>
                              <td className="py-4 text-gray-500">
                                {new Date(
                                  order.created_at
                                ).toLocaleDateString()}
                              </td>
                              <td className="py-4 font-medium">
                                ${order.productPrice}
                              </td>
                              <td className="py-4">
                                <span
                                  className={`px-4 py-1 rounded-full text-[11.5px] uppercase ${
                                    order.status === "pending"
                                      ? "bg-red-300 text-red-800"
                                      : order.status === "paid"
                                        ? "bg-green-300 text-green-800"
                                        : "bg-yellow-300 text-yellow-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-4">
                                <span
                                  className={`px-4 py-1 rounded-full text-[11.5px] uppercase flex items-center justify-center ${
                                    order.delivery_status === "processing"
                                      ? "bg-red-300 text-red-800"
                                      : order.delivery_status === "shipping"
                                        ? "bg-yellow-300 text-yellow-800"
                                        : order.delivery_status === "delivered"
                                          ? "bg-green-300 text-green-800"
                                          : order.delivery_status === "returned"
                                            ? "bg-yellow-300 text-yellow-800"
                                            : "bg-yellow-300 text-yellow-800"
                                  }`}
                                >
                                  {order.delivery_status === "processing" && (
                                    <FiClock className="mr-1" />
                                  )}
                                  {order.delivery_status === "shipping" && (
                                    <FiTruck className="mr-1" />
                                  )}
                                  {order.delivery_status === "delivered" && (
                                    <FiCheckCircle className="mr-1" />
                                  )}
                                  {order.delivery_status === "returned" && (
                                    <FiCheckCircle className="mr-1" />
                                  )}
                                  {order.delivery_status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
