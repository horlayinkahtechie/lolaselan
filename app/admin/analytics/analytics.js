"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import supabase from "@/app/lib/supabase";
import AdminSidebar from "@/app/_components/adminSideBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AnalyticsPage() {
  const [revenueData, setRevenueData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [session, status, router]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      setLoading(true);

      // Get paid orders revenue
      const { data: paidOrders, error: paidError } = await supabase
        .from("orders")
        .select("productPrice, created_at")
        .eq("status", "paid");

      if (paidError) throw paidError;

      // Calculate revenue per month
      const revenueMap = {};
      paidOrders.forEach((order) => {
        const month = new Date(order.created_at).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        revenueMap[month] = (revenueMap[month] || 0) + order.productPrice;
      });

      // Get total orders per month (all statuses)
      const { data: allOrders, error: allError } = await supabase
        .from("orders")
        .select("created_at");

      if (allError) throw allError;

      const ordersMap = {};
      allOrders.forEach((order) => {
        const month = new Date(order.created_at).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        ordersMap[month] = (ordersMap[month] || 0) + 1;
      });

      // Convert to array format for Recharts
      setRevenueData(
        Object.entries(revenueMap).map(([month, value]) => ({
          month,
          revenue: value,
        }))
      );
      setOrdersData(
        Object.entries(ordersMap).map(([month, count]) => ({
          month,
          orders: count,
        }))
      );

      // Totals
      setTotalRevenue(
        paidOrders.reduce((sum, order) => sum + order.productPrice, 0)
      );
      setTotalOrders(allOrders.length);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-10">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 pt-20 md:pt-24 ml-0 md:ml-64">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Analytics Dashboard
        </h1>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card
            title="Total Revenue"
            value={`€${totalRevenue.toLocaleString()}`}
            loading={loading}
          />
          <Card
            title="Total Orders"
            value={totalOrders.toLocaleString()}
            loading={loading}
          />
          {/* Add more cards as needed */}
        </div>

        {/* Charts */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Monthly Revenue"
              data={revenueData}
              dataKey="revenue"
              barColor="#3B82F6"
              loading={loading}
            />
            <ChartCard
              title="Monthly Orders"
              data={ordersData}
              dataKey="orders"
              barColor="#10B981"
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, value, loading }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      {loading ? (
        <div className="h-8 bg-gray-200 rounded mt-2 animate-pulse"></div>
      ) : (
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      )}
    </div>
  );
}

function ChartCard({ title, data, dataKey, barColor, loading }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {loading ? (
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fill: "#6b7280" }} tickMargin={10} />
            <YAxis tick={{ fill: "#6b7280" }} tickMargin={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey={dataKey} fill={barColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
