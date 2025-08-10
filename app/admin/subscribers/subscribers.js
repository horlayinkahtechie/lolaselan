"use client";
import { useState, useEffect } from "react";
import {
  FiSearch,
  FiMail,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import supabase from "@/app/lib/supabase";
import AdminSideBar from "@/app/_components/adminSideBar";
import toast from "react-hot-toast";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const subscribersPerPage = 10;
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch subscribers from Supabase
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("subscribers")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setSubscribers(data || []);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, [supabase]);

  // Filter subscribers based on search term
  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastSubscriber = currentPage * subscribersPerPage;
  const indexOfFirstSubscriber = indexOfLastSubscriber - subscribersPerPage;
  const currentSubscribers = filteredSubscribers.slice(
    indexOfFirstSubscriber,
    indexOfLastSubscriber
  );
  const totalPages = Math.ceil(filteredSubscribers.length / subscribersPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Open delete modal
  const openDeleteModal = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setShowDeleteModal(true);
  };

  const handleDeleteSubscriber = async () => {
    try {
      const { count, error } = await supabase
        .from("subscribers")
        .delete()
        .eq("email", selectedSubscriber.email)
        .select("*", { count: "exact" });

      if (error) throw error;

      if (count === 0) {
        throw new Error("No subscribers found with that email");
      }

      setSubscribers(
        subscribers.filter((sub) => sub.email !== selectedSubscriber.email)
      );
      toast.success(`Subscriber deleted successfully!`);
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(`Deletion failed: ${error.message}`);
    }
  };

  // Export subscribers to CSV
  const exportToCSV = () => {
    const headers = ["ID", "Email", "Has Account", "Subscribed Date"];
    const csvContent = [
      headers.join(","),
      ...filteredSubscribers.map((sub) =>
        [
          sub.sub_id,
          `"${sub.email}"`,
          sub.hasAnAccount ? "TRUE" : "FALSE",
          formatDate(sub.created_at),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `subscribers_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pt-38">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#5E2BFF] text-white shadow-lg z-10">
        <AdminSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Subscribers</h1>
              <p className="text-gray-600">
                Manage your email subscribers list
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 border hover:bg-[#5E2BFF] hover:text-white cursor-pointer border-[#5E2BFF] text-[#5E2BFF] rounded-lg  transition"
              >
                Export to CSV
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscribers by email..."
                className="w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-pulse flex flex-col space-y-4">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-gray-500 text-sm">
                        <th className="px-6 py-3">Subscriber ID</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Account Status</th>
                        <th className="px-6 py-3">Subscribed On</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentSubscribers.length > 0 ? (
                        currentSubscribers.map((subscriber) => (
                          <tr
                            key={subscriber.sub_id}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 font-mono text-sm text-gray-600">
                              {subscriber.sub_id}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <FiMail className="mr-2 text-gray-400" />
                                {subscriber.email}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {subscriber.hasAnAccount ? (
                                <div className="flex items-center text-green-600">
                                  <FiUser className="mr-1" />
                                  Registered User
                                </div>
                              ) : (
                                <div className="flex items-center text-blue-600">
                                  <FiMail className="mr-1" />
                                  Email Only
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <FiClock className="mr-2 text-gray-400" />
                                {formatDate(subscriber.created_at)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => openDeleteModal(subscriber)}
                                className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-red-100"
                              >
                                <FiTrash2 />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            {searchTerm
                              ? "No matching subscribers found"
                              : "No subscribers yet"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filteredSubscribers.length > subscribersPerPage && (
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
                          currentPage < totalPages
                            ? currentPage + 1
                            : totalPages
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSubscriber && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Remove Subscriber</h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <FiXCircle className="text-xl" />
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-700">
                  Are you sure you want to remove{" "}
                  <span className="font-semibold">
                    {selectedSubscriber.email}
                  </span>{" "}
                  from your subscribers list?
                </p>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiClock className="mr-2" />
                    Subscribed on: {formatDate(selectedSubscriber.created_at)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    {selectedSubscriber.hasAnAccount ? (
                      <>
                        <FiUser className="mr-2" />
                        This subscriber has an account
                      </>
                    ) : (
                      <>
                        <FiMail className="mr-2" />
                        Email-only subscriber
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSubscriber}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove Subscriber
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
