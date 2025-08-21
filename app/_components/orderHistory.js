"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import supabase from "../lib/supabase";
import { FiPackage, FiCheckCircle, FiTruck, FiClock } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function OrderHistory() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const limit = 5; // 🔹 orders per page

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // ✅ Get total count
        const { count, error: countError } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("email", session.user.email);

        if (countError) throw countError;
        setTotalOrders(count || 0);

        // ✅ Paginated fetch
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("email", session.user.email)
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) throw error;

        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, page]);

  const totalPages = Math.ceil(totalOrders / limit);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
        <p className="text-gray-600 mt-1">
          {totalOrders} {totalOrders === 1 ? "order" : "orders"} placed
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FiPackage className="mx-auto text-4xl text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-600 mb-6">
            Your order history will appear here once you make a purchase
          </p>
          <Link
            href="/collections/all"
            className="inline-flex items-center px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order No{" "}
                      <span className="font-bold">{order.order_id}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on{" "}
                      <span className="font-bold">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {order.status === "processing" ? (
                        <>
                          <FiClock className="inline mr-1" /> Processing
                        </>
                      ) : order.status === "paid" ? (
                        <>
                          <FiCheckCircle className="inline mr-1" /> Paid
                        </>
                      ) : (
                        <>
                          <FiClock className="inline mr-1" /> Processing
                        </>
                      )}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        order.delivery_status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.delivery_status === "shipping"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {order.delivery_status === "delivered" ? (
                        <>
                          <FiCheckCircle className="inline mr-1" /> Delivered
                        </>
                      ) : order.delivery_status === "shipping" ? (
                        <>
                          <FiTruck className="inline mr-1" /> Shipping
                        </>
                      ) : order.delivery_status === "returned" ? (
                        <>
                          <FiCheckCircle className="inline mr-1" /> Returned
                        </>
                      ) : (
                        <>
                          <FiClock className="inline mr-1" /> Processing
                          Delivery
                        </>
                      )}
                    </span>
                    <span className="font-bold">£{order.productPrice}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={order.image}
                        alt={order.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {order.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Qty:{" "}
                        <span className="font-bold">
                          {order.quantity} • £{order.productPrice}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Size: <span className="font-bold">{order.size}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 🔹 Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
