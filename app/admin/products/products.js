"use client";
import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { FaTshirt, FaShoePrints } from "react-icons/fa";
import AdminSideBar from "@/app/_components/adminSideBar";

export default function Products() {
  // Dummy product data
  const initialProducts = [
    {
      product_id: "AFW001",
      product_name: "Ankara Maxi Dress",
      price: 59.99,
      sizes: ["S", "M", "L", "XL"],
      category: "Dresses",
      stock: 45,
      status: "Active",
      image: "/images/ankara-dress.jpg",
    },
    {
      product_id: "AFW002",
      product_name: "Kente Print Scarf",
      price: 24.99,
      sizes: ["One Size"],
      category: "Accessories",
      stock: 38,
      status: "Active",
      image: "/images/kente-scarf.jpg",
    },
    {
      product_id: "AFW003",
      product_name: "Dashiki Two-Piece",
      price: 75.5,
      sizes: ["S", "M", "L"],
      category: "Sets",
      stock: 32,
      status: "Active",
      image: "/images/dashiki-set.jpg",
    },
    {
      product_id: "AFW004",
      product_name: "Beaded Waist Belt",
      price: 18.99,
      sizes: ["S", "M", "L"],
      category: "Accessories",
      stock: 28,
      status: "Active",
      image: "/images/beaded-belt.jpg",
    },
    {
      product_id: "AFW005",
      product_name: "Adire Wrap Skirt",
      price: 42.99,
      sizes: ["S", "M", "L"],
      category: "Skirts",
      stock: 0,
      status: "Out of Stock",
      image: "/images/adire-skirt.jpg",
    },
    {
      product_id: "AFW006",
      product_name: "African Print Headwrap",
      price: 15.99,
      sizes: ["One Size"],
      category: "Accessories",
      stock: 56,
      status: "Active",
      image: "/images/headwrap.jpg",
    },
    {
      product_id: "AFW007",
      product_name: "Buba and Iro Set",
      price: 89.99,
      sizes: ["S", "M", "L", "XL"],
      category: "Sets",
      stock: 22,
      status: "Active",
      image: "/images/buba-iro.jpg",
    },
    {
      product_id: "AFW008",
      product_name: "African Print Sandals",
      price: 35.5,
      sizes: ["6", "7", "8", "9"],
      category: "Footwear",
      stock: 18,
      status: "Low Stock",
      image: "/images/african-sandals.jpg",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    price: "",
    sizes: [],
    category: "",
    stock: "",
    status: "Active",
    image: "",
  });

  // Form state for edit product
  const [editProduct, setEditProduct] = useState({
    product_name: "",
    price: "",
    sizes: [],
    category: "",
    stock: "",
    status: "Active",
    image: "",
  });

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle size selection
  const handleSizeChange = (e, formType) => {
    const { value, checked } = e.target;
    if (formType === "add") {
      setNewProduct((prev) => ({
        ...prev,
        sizes: checked
          ? [...prev.sizes, value]
          : prev.sizes.filter((size) => size !== value),
      }));
    } else {
      setEditProduct((prev) => ({
        ...prev,
        sizes: checked
          ? [...prev.sizes, value]
          : prev.sizes.filter((size) => size !== value),
      }));
    }
  };

  // Add new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newId = `AFW${String(products.length + 1).padStart(3, "0")}`;
    const productToAdd = {
      ...newProduct,
      product_id: newId,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
    };
    setProducts([...products, productToAdd]);
    setNewProduct({
      product_name: "",
      price: "",
      sizes: [],
      category: "",
      stock: "",
      status: "Active",
      image: "",
    });
    setShowAddModal(false);
  };

  // Edit product
  const handleEditProduct = (e) => {
    e.preventDefault();
    setProducts(
      products.map((product) =>
        product.product_id === currentProduct.product_id ? editProduct : product
      )
    );
    setShowEditModal(false);
  };

  // Delete product
  const handleDeleteProduct = () => {
    setProducts(
      products.filter(
        (product) => product.product_id !== currentProduct.product_id
      )
    );
    setShowDeleteModal(false);
  };

  // Open edit modal and set current product
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setEditProduct({
      ...product,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setShowEditModal(true);
  };

  // Open delete modal and set current product
  const openDeleteModal = (product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Dresses":
        return <FaTshirt className="text-purple-600" />;
      case "Accessories":
        return <FaTshirt className="text-orange-500" />;
      case "Footwear":
        return <FaShoePrints className="text-blue-500" />;
      case "Sets":
        return <FaTshirt className="text-green-500" />;
      case "Skirts":
        return <FaShoePrints className="text-pink-500" />;
      default:
        return <FaTshirt className="text-gray-500" />;
    }
  };

  // Handle image upload
  const handleImageUpload = (e, formType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (formType === "add") {
          setNewProduct({ ...newProduct, image: reader.result });
        } else {
          setEditProduct({ ...editProduct, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
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
                  <option>All Categories</option>
                  <option>Dresses</option>
                  <option>Sets</option>
                  <option>Skirts</option>
                  <option>Accessories</option>
                  <option>Footwear</option>
                </select>
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Out of Stock</option>
                  <option>Low Stock</option>
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
                    key={product.product_id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <div className="h-48 bg-gray-100 relative overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.product_name}
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
                          onClick={() => openDeleteModal(product)}
                          className="p-2 bg-white bg-opacity-80 rounded-full text-gray-700 hover:text-red-500 hover:bg-opacity-100 transition"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      <span
                        className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : product.status === "Out of Stock"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">
                            {product.product_name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {product.product_id}
                          </p>
                        </div>
                        <span className="font-bold text-[#5E2BFF]">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(product.category)}
                          <span className="text-sm text-gray-600">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {product.sizes.map((size) => (
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
                          Stock: {product.stock}
                        </span>
                        <button className="text-sm text-[#5E2BFF] hover:underline">
                          View Details
                        </button>
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
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="px-6 py-2 bg-[#5E2BFF] text-white rounded-lg hover:bg-[#4a1fd1] transition"
                >
                  Reset Filters
                </button>
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
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.product_name}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          product_name: e.target.value,
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
                      Category
                    </label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Dresses">Dresses</option>
                      <option value="Sets">Sets</option>
                      <option value="Skirts">Skirts</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Footwear">Footwear</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, stock: e.target.value })
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
                        setNewProduct({ ...newProduct, status: e.target.value })
                      }
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Low Stock">Low Stock</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {["S", "M", "L", "XL", "One Size"].map((size) => (
                        <label key={size} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value={size}
                            checked={newProduct.sizes.includes(size)}
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
                      Product Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        {newProduct.image ? (
                          <div className="relative">
                            <img
                              src={newProduct.image}
                              alt="Preview"
                              className="mx-auto h-32 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setNewProduct({ ...newProduct, image: "" })
                              }
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                            >
                              <FiX />
                            </button>
                          </div>
                        ) : (
                          <>
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
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-[#5E2BFF] hover:text-[#4a1fd1] focus-within:outline-none"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => handleImageUpload(e, "add")}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-8">
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
                      value={currentProduct.product_id}
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
                      value={editProduct.product_name}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          product_name: e.target.value,
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
                      Category
                    </label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editProduct.category}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          category: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="Dresses">Dresses</option>
                      <option value="Sets">Sets</option>
                      <option value="Skirts">Skirts</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Footwear">Footwear</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                      value={editProduct.stock}
                      onChange={(e) =>
                        setEditProduct({
                          ...editProduct,
                          stock: e.target.value,
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
                      <option value="Active">Active</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Low Stock">Low Stock</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {["S", "M", "L", "XL", "One Size"].map((size) => (
                        <label key={size} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value={size}
                            checked={editProduct.sizes.includes(size)}
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
                        {editProduct.image ? (
                          <div className="relative">
                            <img
                              src={editProduct.image}
                              alt="Preview"
                              className="mx-auto h-32 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setEditProduct({ ...editProduct, image: "" })
                              }
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                            >
                              <FiX />
                            </button>
                          </div>
                        ) : (
                          <>
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
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="edit-file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-[#5E2BFF] hover:text-[#4a1fd1] focus-within:outline-none"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="edit-file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => handleImageUpload(e, "edit")}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-8">
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
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Delete Product</h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-700">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">
                    {currentProduct.product_name}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
