"use client";

import { useState, useEffect } from "react";
import supabase from "@/app/lib/supabase";
import {
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import Image from "next/image";
import AdminSidebar from "@/app/_components/adminSideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminRefundsPage() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalRefunds, setTotalRefunds] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetchRefunds();
  }, [page]);

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [session, status, router]);

  const fetchRefunds = async () => {
    setLoading(true);
    try {
      // Get total count
      const { count, error: countError } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("refund_requested", true);

      if (countError) throw countError;
      setTotalRefunds(count || 0);

      // Paginated fetch
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("refund_requested", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      setRefunds(data || []);
    } catch (error) {
      console.error("Error fetching refunds:", error);
      toast.error("Failed to load refund requests");
    } finally {
      setLoading(false);
    }
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

  const updateRefundStatus = async (
    order_id,
    delivery_status,
    customerEmail
  ) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          delivery_status: delivery_status,
          refund_processed_at: new Date().toISOString(),
        })
        .eq("order_id", order_id);

      if (error) throw error;

      // Send email notification
      await sendRefundEmail(customerEmail, order_id, delivery_status);

      // Update local state
      setRefunds(
        refunds.map((refund) =>
          refund.order_id === order_id
            ? {
                ...refund,
                delivery_status: delivery_status,
                refund_processed_at: new Date().toISOString(),
              }
            : refund
        )
      );

      toast.success(`Refund marked as ${delivery_status}`);
    } catch (error) {
      console.error("Error updating refund status:", error);
      toast.error("Failed to update refund status");
    } finally {
      setUpdating(false);
    }
  };

  const filteredRefunds = refunds.filter((refund) => {
    const matchesSearch =
      refund.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || refund.delivery_status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(totalRefunds / limit);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div>
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 ml-0 p-6 pt-35">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Refund Requests
            </h1>
            <p className="text-gray-600 mt-1">
              {totalRefunds} refund request{totalRefunds !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by order ID, email, or product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFilter className="text-gray-400" />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="returned">Returned/Refunded</option>
                    <option value="declined refund">Refund Declined</option>
                  </select>
                </div>

                <button
                  onClick={fetchRefunds}
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                >
                  <FiRefreshCw className="mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {filteredRefunds.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FiDollarSign className="mx-auto text-4xl text-gray-300 mb-4" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                {refunds.length === 0
                  ? "No refund requests yet"
                  : "No matching refund requests"}
              </h2>
              <p className="text-gray-600">
                {refunds.length === 0
                  ? "Refund requests will appear here when customers submit them."
                  : "Try adjusting your search or filter criteria."}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {filteredRefunds.map((refund) => (
                  <div
                    key={refund.order_id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                  >
                    <div className="p-4 sm:p-6 border-b border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Order No{" "}
                            <span className="font-bold">{refund.order_id}</span>
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Customer:{" "}
                            <span className="font-bold">{refund.email}</span>
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Placed on{" "}
                            <span className="font-bold">
                              {new Date(refund.created_at).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </p>
                          {refund.refund_requested_at && (
                            <p className="text-sm text-amber-600 mt-1">
                              Refund requested on{" "}
                              <span className="font-bold">
                                {new Date(
                                  refund.refund_requested_at
                                ).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              refund.delivery_status === "returned"
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {refund.delivery_status === "returned" ? (
                              <>
                                <FiCheckCircle className="inline mr-1" />{" "}
                                Refunded
                              </>
                            ) : refund.delivery_status === "declined refund" ? (
                              <>
                                <FiCheckCircle className="inline mr-1" />{" "}
                                Declined
                              </>
                            ) : (
                              <>
                                <FiClock className="inline mr-1" /> Processing
                              </>
                            )}
                          </span>
                          <span className="font-bold">
                            £{refund.productPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="grid gap-4">
                        <div className="flex items-start gap-4">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                            {(() => {
                              let images = [];

                              if (Array.isArray(refund.image)) {
                                images = refund.image;
                              } else if (typeof refund.image === "string") {
                                try {
                                  images = JSON.parse(refund.image);
                                } catch (e) {
                                  console.error(
                                    "Invalid image format:",
                                    refund.image
                                  );
                                }
                              }

                              return images.length > 0 ? (
                                <Image
                                  src={images[0]}
                                  alt={refund.name}
                                  width={100}
                                  height={100}
                                  className="object-cover w-full h-full"
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
                              {refund.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Qty:{" "}
                              <span className="font-bold">
                                {refund.quantity} • £{refund.productPrice}
                              </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Size:{" "}
                              <span className="font-bold">{refund.size}</span>
                            </p>
                            <div className="mt-3 p-3 bg-gray-50 rounded-md">
                              <p className="text-sm font-medium text-gray-700">
                                Refund Reason:
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {refund.refund_reason}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Admin Actions */}
                      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            updateRefundStatus(
                              refund.order_id,
                              "declined refund",
                              refund.email
                            )
                          }
                          disabled={
                            updating ||
                            refund.delivery_status === "declined refund"
                          }
                          className={`px-4 py-2 text-sm font-medium rounded-md ${
                            refund.delivery_status === "declined refund"
                              ? "bg-red-100 text-red-800 cursor-not-allowed"
                              : "bg-red-100 hover:bg-red-200 text-red-800"
                          }`}
                        >
                          {refund.delivery_status === "declined refund"
                            ? "Refund Declined"
                            : "Mark as Declined"}
                        </button>

                        <button
                          onClick={() =>
                            updateRefundStatus(
                              refund.order_id,
                              "returned",
                              refund.email
                            )
                          }
                          disabled={
                            updating || refund.delivery_status === "returned"
                          }
                          className={`px-4 py-2 text-sm font-medium rounded-md ${
                            refund.delivery_status === "returned"
                              ? "bg-green-100 text-green-800 cursor-not-allowed"
                              : "bg-green-100 hover:bg-green-200 text-green-800"
                          }`}
                        >
                          {refund.delivery_status === "returned"
                            ? "Refund Completed"
                            : "Mark as Refunded"}
                        </button>
                      </div>

                      {refund.refund_processed_at && (
                        <div className="mt-4 text-xs text-gray-500">
                          Last updated:{" "}
                          {new Date(
                            refund.refund_processed_at
                          ).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="flex items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronLeft className="mr-1" /> Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="flex items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next <FiChevronRight className="ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
