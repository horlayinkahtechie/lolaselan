"use client";
import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { FaTshirt, FaShoePrints } from "react-icons/fa";
import AdminSideBar from "@/app/_components/adminSideBar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import supabase from "@/app/lib/supabase";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Products() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    id: "",
    price: "",
    size: [],
    gender: "",
    fabric: "",
    status: "available",
    isNew: false,
    image: [],
    product_description: "",
    care_instruction: "",
  });

  // Form state for edit product
  const [editProduct, setEditProduct] = useState({
    name: "",
    id: "",
    price: "",
    size: [],
    gender: "",
    fabric: "",
    status: "available",
    isNew: false,
    image: [],
    product_description: "",
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle size selection
  const handleSizeChange = (e, formType) => {
    const { value, checked } = e.target;
    if (formType === "add") {
      setNewProduct((prev) => ({
        ...prev,
        size: checked
          ? [...prev.size, value]
          : prev.size.filter((size) => size !== value),
      }));
    } else {
      setEditProduct((prev) => ({
        ...prev,
        size: checked
          ? [...prev.size, value]
          : prev.size.filter((size) => size !== value),
      }));
    }
  };

  // Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productToAdd = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        image: newProduct.image.length > 0 ? newProduct.image : uploadedUrls,
      };

      const { data, error } = await supabase
        .from("products")
        .insert([productToAdd])
        .select();

      if (error) throw error;

      setProducts([data[0], ...products]);
      setNewProduct({
        name: "",
        price: "",
        size: [],
        gender: "",
        fabric: "",
        status: "available",
        isNew: false,
        image: [],
        product_description: "",
        care_instruction: "",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Edit product
  const handleEditProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productToUpdate = {
        ...editProduct,
        price: parseFloat(editProduct.price),
        image: editProduct.image.length > 0 ? editProduct.image : uploadedUrls,
      };

      const { error } = await supabase
        .from("products")
        .update(productToUpdate)
        .eq("id", currentProduct.id);

      if (error) throw error;

      setProducts(
        products.map((product) =>
          product.id === currentProduct.id ? productToUpdate : product
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      setProducts(products.filter((product) => product.id !== productId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Update product status
  const updateProductStatus = async (productId, newStatus) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ status: newStatus })
        .eq("id", productId);

      if (error) throw error;

      setProducts(
        products.map((product) =>
          product.id === productId ? { ...product, status: newStatus } : product
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Open edit modal and set current product
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setEditProduct({
      ...product,
      price: product.price.toString(),
    });
    setShowEditModal(true);
  };

  // Open delete modal and set current product
  const openDeleteModal = (product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  // Get category icon
  const getCategoryIcon = (gender) => {
    switch (gender) {
      case "Male":
        return <FaTshirt className="text-blue-500" />;
      case "Female":
        return <FaTshirt className="text-pink-500" />;
      case "Unisex":
        return <FaTshirt className="text-purple-500" />;
      default:
        return <FaTshirt className="text-gray-500" />;
    }
  };

  const handleImageUpload = async (e, formType) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      toast.error("You can upload a maximum of 4 images");
      return;
    }

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from("product-bucket")
          .upload(fileName, file);

        if (error) throw error;

        // Get public URL
        const { data: publicUrl } = supabase.storage
          .from("product-bucket")
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl.publicUrl);
      }

      if (formType === "add") {
        const newImages = [...newProduct.image, ...uploadedUrls].slice(0, 4);
        setNewProduct((prev) => ({
          ...prev,
          image: newImages,
        }));
      } else {
        const newImages = [...editProduct.image, ...uploadedUrls].slice(0, 4);
        setEditProduct((prev) => ({
          ...prev,
          image: newImages,
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    }
  };

  // Remove an image from the array
  const removeImage = (index, formType) => {
    if (formType === "add") {
      setNewProduct((prev) => ({
        ...prev,
        image: prev.image.filter((_, i) => i !== index), // ✅ use image
      }));
    } else {
      setEditProduct((prev) => ({
        ...prev,
        image: prev.image.filter((_, i) => i !== index), // ✅ use image
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 pt-28">
        <div className="fixed inset-y-0 left-0 w-64 bg-[#5E2BFF] text-white shadow-lg z-10">
          <AdminSideBar />
        </div>
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5E2BFF]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 pt-28">
      {/* Fixed Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#5E2BFF] text-white shadow-lg z-10">
        <AdminSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header and Add Product Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Products</h1>
              <p className="text-gray-600">Manage your African wear products</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 border border-[#5E2BFF] text-[#5E2BFF] hover:text-white px-6 py-3 rounded-lg hover:bg-[#5E2BFF] transition mt-4 md:mt-0"
            >
              <FiPlus className="text-lg" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name or ID..."
                  className="w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white">
                  <option>All Genders</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Unisex</option>
                </select>
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white">
                  <option>All Status</option>
                  <option>available</option>
                  <option>out of stock</option>
                  <option>pre-order</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <div className="h-48 bg-gray-100 relative overflow-hidden">
                      {product.image && product.image.length > 0 ? (
                        <Image
                          width={100}
                          height={100}
                          src={product.image[0]}
                          alt={product.name}
                          priority
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FaTshirt className="text-4xl" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 bg-white bg-opacity-80 rounded-full text-gray-700 hover:text-[#5E2BFF] hover:bg-opacity-100 transition"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 bg-white bg-opacity-80 rounded-full text-gray-700 hover:text-red-500 hover:bg-opacity-100 transition"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      <span
                        className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs ${
                          product.status === "available"
                            ? "bg-green-100 text-green-800"
                            : product.status === "out of stock"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status}
                      </span>
                      {product.isNew && (
                        <span className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          New Arrival
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{product.name}</h3>
                          <p className="text-gray-500 text-sm">
                            ID: {product.id}
                          </p>
                        </div>
                        <span className="font-bold text-[#5E2BFF]">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(product.gender)}
                          <span className="text-sm text-gray-600">
                            {product.gender}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {product.size.map((size) => (
                            <span
                              key={size}
                              className="px-2 py-1 bg-gray-100 rounded text-xs"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Fabric: {product.fabric}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              updateProductStatus(product.id, "available")
                            }
                            className={`text-xs px-2 py-1 rounded ${
                              product.status === "available"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800 hover:bg-green-50"
                            }`}
                          >
                            Available
                          </button>
                          <button
                            onClick={() =>
                              updateProductStatus(product.id, "out of stock")
                            }
                            className={`text-xs px-2 py-1 rounded ${
                              product.status === "out of stock"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800 hover:bg-red-50"
                            }`}
                          >
                            Out of Stock
                          </button>
                          <button
                            onClick={() =>
                              updateProductStatus(product.id, "pre-order")
                            }
                            className={`text-xs px-2 py-1 rounded ${
                              product.status === "pre-order"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800 hover:bg-yellow-50"
                            }`}
                          >
                            Pre-order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {filteredProducts.length > productsPerPage && (
                <div className="flex items-center justify-between px-6 py-4 bg-white rounded-xl shadow-sm">
                  <button
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    disabled={currentPage === 1}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    <FiChevronLeft />
                    <span>Previous</span>
                  </button>
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === number ? "bg-[#5E2BFF] text-white" : "text-gray-700 hover:bg-gray-100"}`}
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
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    <span>Next</span>
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Add New Product</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              <form onSubmit={handleAddProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.id}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          id: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Description
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border h-28 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.product_description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          product_description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Care instruction
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border h-28 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.care_instruction}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          care_instruction: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.gender}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          gender: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fabric
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.fabric}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          fabric: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.status}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          status: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="available">Available</option>
                      <option value="pre-order">Pre-order</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mark as New Arrival
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newProduct.isNew}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            isNew: e.target.checked,
                          })
                        }
                        className="h-5 w-5 rounded border-gray-300 text-[#5E2BFF] focus:ring-[#5E2BFF]"
                      />
                      <span className="ml-2 text-gray-700">
                        {newProduct.isNew ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <label key={size} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value={size}
                            checked={newProduct.size.includes(size)}
                            onChange={(e) => handleSizeChange(e, "add")}
                            className="h-5 w-5 rounded border-gray-300 text-[#5E2BFF] focus:ring-[#5E2BFF]"
                          />
                          <span className="ml-2 text-gray-700">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Images (Max 3)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center w-full">
                        {/* Display uploaded images */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {newProduct.image.map((img, index) => (
                            <div key={index} className="relative">
                              <Image
                                src={img}
                                width={100}
                                height={100}
                                alt={`Preview ${index}`}
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index, "add")}
                                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                              >
                                <FiX size={12} />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Upload area (only show if less than images) */}

                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label
                            htmlFor="add"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#5E2BFF] hover:text-[#4a1fd1] focus-within:outline-none"
                          >
                            {newProduct.image.length < 4 && (
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, "add")}
                              />
                            )}
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB each (max 4 images)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-8">
                  {loading ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        disabled
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#5E2BFF] text-white rounded-lg hover:bg-[#4a1fd1] transition"
                      >
                        Adding Product...
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#5E2BFF] text-white rounded-lg hover:bg-[#4a1fd1] transition"
                      >
                        Add Product
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Edit Product</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              <form onSubmit={handleEditProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                      value={currentProduct.id}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editProduct.name}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editProduct.price}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          price: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editProduct.gender}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          gender: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Description
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editProduct.product_description}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          product_description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fabric
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editProduct.fabric}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          fabric: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editProduct.status}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          status: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="available">Available</option>
                      <option value="out of stock">Out of Stock</option>
                      <option value="pre-order">Pre-order</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mark as New Arrival
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editProduct.isNew}
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            isNew: e.target.checked,
                          })
                        }
                        className="h-5 w-5 rounded border-gray-300 text-[#5E2BFF] focus:ring-[#5E2BFF]"
                      />
                      <span className="ml-2 text-gray-700">
                        {editProduct.isNew ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <label key={size} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value={size}
                            checked={editProduct.size.includes(size)}
                            onChange={(e) => handleSizeChange(e, "edit")}
                            className="h-5 w-5 rounded border-gray-300 text-[#5E2BFF] focus:ring-[#5E2BFF]"
                          />
                          <span className="ml-2 text-gray-700">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        {editProduct.image.map((img, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={img}
                              width={100}
                              height={100}
                              alt={`Preview ${index}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index, "edit")}
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                            >
                              <FiX size={12} />
                            </button>
                          </div>
                        ))}

                        {editProduct.image.length < 4 && (
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "edit")}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-8">
                  {loading ? (
                    <>
                      <button
                        type="button"
                        disabled
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#5E2BFF] text-white rounded-lg hover:bg-[#4a1fd1] transition"
                      >
                        Saving Changes...
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#5E2BFF] text-white rounded-lg hover:bg-[#4a1fd1] transition"
                      >
                        Save Changes
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
