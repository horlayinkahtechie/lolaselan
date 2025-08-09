"use client";
import { useState, useEffect } from "react";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiMail,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import supabase from "@/app/lib/supabase";
import AdminSideBar from "@/app/_components/adminSideBar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [supabase]);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("users")
        .update(editForm)
        .eq("user_id", selectedUser.user_id);

      if (error) throw error;

      // Update local state
      setUsers(
        users.map((user) =>
          user.user_id === selectedUser.user_id
            ? { ...user, ...editForm }
            : user
        )
      );

      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("user_id", selectedUser.user_id);

      if (error) throw error;

      // Update local state
      setUsers(users.filter((user) => user.user_id !== selectedUser.user_id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
              Users Management
            </h1>
            <p className="text-gray-600">Manage all registered users</p>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Users Table */}
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
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Joined</th>
                        <th className="px-6 py-3">Verified</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                          <tr key={user.user_id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
                                  <FiUser />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {user.name || "N/A"}
                                  </p>
                                  <p className="text-gray-500 text-xs">
                                    ID: {user.user_id}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center text-gray-700">
                                <FiMail className="mr-2 text-gray-400" />
                                {user.email}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                  user.role === "admin"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {user.role || "user"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center text-gray-700">
                                <FiCalendar className="mr-2 text-gray-400" />
                                {formatDate(user.created_at)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {user.email_verified ? (
                                <div className="flex items-center text-green-600">
                                  <FiCheckCircle className="mr-1" />
                                  Verified
                                </div>
                              ) : (
                                <div className="flex items-center text-yellow-600">
                                  <FiXCircle className="mr-1" />
                                  Pending
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openEditModal(user)}
                                  className="p-2 text-gray-500 hover:text-[#5E2BFF] rounded-lg hover:bg-purple-100"
                                >
                                  <FiEdit2 />
                                </button>
                                <button
                                  onClick={() => openDeleteModal(user)}
                                  className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-red-100"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filteredUsers.length > usersPerPage && (
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

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit User</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <FiXCircle className="text-xl" />
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                      required
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#5E2BFF] text-white rounded-lg hover:bg-[#4a1fd1]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Delete User</h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <FiXCircle className="text-xl" />
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-700">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">
                    {selectedUser.name || selectedUser.email}
                  </span>
                  ?
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
