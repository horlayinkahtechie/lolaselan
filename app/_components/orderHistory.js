"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import supabase from "../lib/supabase";
import {
  FiPackage,
  FiCheckCircle,
  FiTruck,
  FiClock,
  FiDollarSign,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function OrderHistory() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refundReason, setRefundReason] = useState("");
  const [isSubmittingRefund, setIsSubmittingRefund] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const limit = 5; // 🔹 orders per page

  useEffect(() => {
    // Check if user is authenticated
    setIsAuthenticated(!!session?.user?.email);
  }, [session]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      try {
        if (isAuthenticated && session?.user?.email) {
      
          const { count, error: countError } = await supabase
            .from("orders")
            .select("*", { count: "exact", head: true })
            .eq("email", session.user.email)
            .eq("status", "paid"); 

          if (countError) throw countError;
          setTotalOrders(count || 0);

          
          const from = (page - 1) * limit;
          const to = from + limit - 1;

          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("email", session.user.email)
            .eq("status", "paid")  
            .order("created_at", { ascending: false })
            .range(from, to);

          if (error) throw error;

          setOrders(data || []);
        } else {
          // ✅ Fetch from localStorage for unauthenticated users
          const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
          setTotalOrders(storedOrders.length);
          console.log(storedOrders)
          
          // Apply pagination
          const from = (page - 1) * limit;
          const to = from + limit;
          const paginatedOrders = storedOrders
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(from, to);
          
          setOrders(paginatedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, page, isAuthenticated]);

  const totalPages = Math.ceil(totalOrders / limit);

  const handleRefundRequest = (order) => {
    setSelectedOrder(order);
    setRefundModalOpen(true);
  };

  const sendRefundEmail = async (email, order_id, delivery_status) => {
    try {
      const response = await fetch("/api/send-refund-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          order_id,
          delivery_status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      console.log("Refund email sent successfully");
    } catch (error) {
      console.error("Error sending refund email:", error);
      // Don't show error to user as the refund status was updated successfully
    }
  };

  const submitRefundRequest = async () => {
    if (!refundReason) {
      toast.error("Please select a reason for your refund request");
      return;
    }

    setIsSubmittingRefund(true);

    try {
      if (isAuthenticated) {
        // Update order status in database for authenticated users
        const { error } = await supabase
          .from("orders")
          .update({
            refund_requested: true,
            refund_reason: refundReason,
            refund_requested_at: new Date().toISOString(),
            delivery_status: "processing refund", // Update delivery status
          })
          .eq("order_id", selectedOrder.order_id);

        if (error) throw error;

        // Send email notification using Resend
        await sendRefundEmail(
          selectedOrder.email,
          selectedOrder.order_id,
          "processing refund"
        );
      } else {
        // Update order status in localStorage for unauthenticated users
        const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = storedOrders.map(order => 
          order.order_id === selectedOrder.order_id
            ? {
                ...order,
                refund_requested: true,
                refund_reason: refundReason,
                refund_requested_at: new Date().toISOString(),
                delivery_status: "processing refund",
              }
            : order
        );
        
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        // For unauthenticated users, we can't send emails since we don't have their email
        toast.success("Refund request submitted! Please contact support with your order details.");
      }

      // Update local state
      setOrders(
        orders.map((order) =>
          order.order_id === selectedOrder.order_id
            ? {
                ...order,
                refund_requested: true,
                refund_reason: refundReason,
                refund_requested_at: new Date().toISOString(),
                delivery_status: "processing refund", // Update delivery status
              }
            : order
        )
      );

      toast.success("Refund request submitted successfully!");
      setRefundModalOpen(false);
      setRefundReason("");
    } catch (error) {
      console.error("Error submitting refund request:", error);
      toast.error("Failed to submit refund request");
    } finally {
      setIsSubmittingRefund(false);
    }
  };

  const isOrderEligibleForRefund = (orderDate) => {
    const orderDateTime = new Date(orderDate).getTime();
    const currentTime = new Date().getTime();
    const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000;

    return currentTime - orderDateTime <= fourteenDaysInMs;
  };

  // Check if order is delivered
  const isOrderDelivered = (order) => {
    return order.delivery_status === "delivered";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Refund Request Modal */}
      {refundModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Request Refund</h3>
              <button
                onClick={() => {
                  setRefundModalOpen(false);
                  setRefundReason("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Please select the reason for your refund request for order{" "}
                <strong>{selectedOrder?.order_id}</strong>:
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "Received wrong item",
                  "Item defective or not working",
                  "Item damaged during shipping",
                  "No longer needed",
                  "Better price available",
                  "Other",
                ].map((reason) => (
                  <div key={reason} className="flex items-center">
                    <input
                      type="radio"
                      id={reason}
                      name="refundReason"
                      value={reason}
                      checked={refundReason === reason}
                      onChange={() => setRefundReason(reason)}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                    />
                    <label
                      htmlFor={reason}
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      {reason}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setRefundModalOpen(false);
                    setRefundReason("");
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRefundRequest}
                  disabled={isSubmittingRefund || !refundReason}
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 disabled:cursor-not-allowed rounded-md"
                >
                  {isSubmittingRefund ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
        <p className="text-gray-600 mt-1">
          {totalOrders} {totalOrders === 1 ? "order" : "orders"} placed
        </p>
        {!isAuthenticated && (
          <p className="text-sm text-amber-600 mt-2">
            Viewing orders from this browser.{" "}
            <Link href="/user/login" className="underline">
              Sign in
            </Link>{" "}
            to see all your orders.
          </p>
        )}
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
          {orders.map((order) => {
            const isEligibleForRefund = isOrderEligibleForRefund(
              order.created_at
            );
            const hasRefundBeenRequested = order.refund_requested;
            const isDelivered = isOrderDelivered(order);

            return (
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
                              : order.delivery_status === "returned"
                                ? "bg-purple-100 text-purple-800"
                                : order.delivery_status === "processing refund"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.delivery_status === "declined refund"
                                    ? "bg-red-100 text-red-800"
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
                            <FiCheckCircle className="inline mr-1" /> Refunded
                          </>
                        ) : order.delivery_status === "processing refund" ? (
                          <>
                            <FiClock className="inline mr-1" /> Processing
                            Refund
                          </>
                        ) : order.delivery_status === "declined refund" ? (
                          <>
                            <FiX className="inline mr-1" /> Refund Declined
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
                        {(() => {
                          let images = [];

                          if (Array.isArray(order.image)) {
                            images = order.image;
                          } else if (typeof order.image === "string") {
                            try {
                              images = JSON.parse(order.image);
                            } catch (e) {
                              console.error(
                                "Invalid image format:",
                                order.image
                              );
                            }
                          }

                          return images.length > 0 ? (
                            <Image
                              src={images[0]}
                              alt={order.name}
                              fill
                              sizes="true"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                              No Image
                            </div>
                          );
                        })()}
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

                  {/* Refund Request Section - Only show if order is delivered */}
                  {isDelivered && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      {hasRefundBeenRequested ? (
                        <div className="flex items-center text-sm text-amber-700">
                          <FiDollarSign className="mr-2" />
                          Refund requested: {order.refund_reason}
                          <span className="ml-2 text-xs text-gray-500">
                            (
                            {new Date(
                              order.refund_requested_at
                            ).toLocaleDateString()}
                            )
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRefundRequest(order)}
                          disabled={!isEligibleForRefund}
                          className={`flex items-center text-sm ${
                            isEligibleForRefund
                              ? "text-amber-600 hover:text-amber-700"
                              : "text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <FiDollarSign className="mr-2" />
                          {isEligibleForRefund
                            ? "Request Refund"
                            : "Refund period expired (14 days)"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

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