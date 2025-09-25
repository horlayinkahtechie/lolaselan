"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  FiShoppingBag,
  FiTrash2,
  FiArrowRight,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { HiOutlineEmojiSad } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {data: session} = useSession();
  
  useEffect(() => {
    // Check if user is authenticated (you'll need to implement this based on your auth system)
    const checkAuth = async () => {
      try {
        // This is a placeholder - replace with your actual auth check
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  const total = cartItems
    .reduce(
      (sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1),
      0
    )
    .toFixed(2);

  // Fetch cart items from appropriate source
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      
      try {
        if (isAuthenticated) {
      
          
          if (!session?.user?.email) {
            setCartItems([]);
            setLoading(false);
            return;
          }

          const { data: cartData, error: cartError } = await supabase
            .from("cart")
            .select("*")
            .eq("email", session.user.email);

          if (cartError) {
            throw cartError;
          }

          if (!cartData || cartData.length === 0) {
            setCartItems([]);
            setLoading(false);
            return;
          }

          // Get product IDs from cart items
          const productIds = cartData
            .map((item) => item.product_id)
            .filter(Boolean);

          if (productIds.length === 0) {
            setCartItems([]);
            setLoading(false);
            return;
          }

          // Fetch complete product data
          const { data: productData, error: productError } = await supabase
            .from("products")
            .select("*")
            .in("id", productIds);

          if (productError) {
            throw productError;
          }

          // Merge cart items with product data
          const mergedItems = cartData.map((cartItem) => {
            const product = productData.find((p) => p.id === cartItem.product_id);
            return {
              ...cartItem,
              ...product,
              quantity: cartItem.quantity || 1,
              images: product?.images || [product?.image].filter(Boolean) || [],
            };
          });

          setCartItems(mergedItems);
        } else {
          // Fetch from localStorage for unauthenticated users
          const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
          
          if (storedCart.length === 0) {
            setCartItems([]);
            setLoading(false);
            return;
          }

          // Get product IDs from cart items
          const productIds = storedCart
            .map((item) => item.product_id)
            .filter(Boolean);

          if (productIds.length === 0) {
            setCartItems([]);
            setLoading(false);
            return;
          }

          // Fetch complete product data
          const { data: productData, error: productError } = await supabase
            .from("products")
            .select("*")
            .in("id", productIds);

          if (productError) {
            throw productError;
          }

          // Merge cart items with product data
          const mergedItems = storedCart.map((cartItem) => {
            const product = productData.find((p) => p.id === cartItem.product_id);
            return {
              ...cartItem,
              ...product,
              quantity: cartItem.quantity || 1,
              images: product?.images || [product?.image].filter(Boolean) || [],
            };
          });

          setCartItems(mergedItems);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [isAuthenticated]);

  const checkOut = () => {
    router.push("/cart/checkout", {
      state: { source: "cart" },
    });
  };

  const updateQuantity = async (cart_id, newQuantity) => {
    if (newQuantity < 1) return;

    const toastId = toast.loading("Updating quantity...");

    try {
      if (isAuthenticated) {
        // Update in database for authenticated users
        const { error } = await supabase
          .from("cart")
          .update({ quantity: newQuantity })
          .eq("cart_id", cart_id);

        if (error) throw error;
      } else {
        // Update in localStorage for unauthenticated users
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = storedCart.map(item => 
          item.cart_id === cart_id ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.cart_id === cart_id ? { ...item, quantity: newQuantity } : item
        )
      );

      toast.success("Quantity updated", { id: toastId });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update quantity", { id: toastId });
    }
  };

  const handleRemove = async (cart_id) => {
    const toastId = toast.loading("Removing item...");
    
    try {
      if (isAuthenticated) {
        // Remove from database for authenticated users
        const { error } = await supabase
          .from("cart")
          .delete()
          .eq("cart_id", cart_id);

        if (error) throw error;
      } else {
        // Remove from localStorage for unauthenticated users
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = storedCart.filter(item => item.cart_id !== cart_id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }

      toast.success("Item removed from cart.", { id: toastId });
      setCartItems((prev) => prev.filter((item) => item.cart_id !== cart_id));
      if (selectedItem?.cart_id === cart_id) {
        setSelectedItem(null);
      }
    } catch (error) {
      toast.error("Failed to remove item.", { id: toastId });
      console.error("Remove error:", error);
    }
  };

  const incrementQuantity = (cart_id) => {
    const item = cartItems.find((item) => item.cart_id === cart_id);
    if (item) {
      updateQuantity(cart_id, item.quantity + 1);
    }
  };

  const decrementQuantity = (cart_id) => {
    const item = cartItems.find((item) => item.cart_id === cart_id);
    if (item && item.quantity > 1) {
      updateQuantity(cart_id, item.quantity - 1);
    }
  };

  const openProductModal = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeProductModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedItem.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedItem.images.length - 1 : prev - 1
    );
  };

  // Skeleton loader for cart items
  const CartSkeleton = () => (
    <div className="p-4 flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-sm mt-4 animate-pulse">
      <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg"></div>
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  // Skeleton loader for order summary
  const SummarySkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
      </div>
      <div className="mt-6 h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-40">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {[1, 2].map((_, i) => (
              <CartSkeleton key={i} />
            ))}
          </div>
          <div className="lg:w-1/3">
            <SummarySkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-40 pb-15">
      {/* Product Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 relative">
              <button
                onClick={closeProductModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="relative">
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={selectedItem.images[currentImageIndex]}
                      alt={selectedItem.orderName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {selectedItem.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <FiChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <FiChevronRight size={20} />
                      </button>
                    </>
                  )}

                  <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
                    {selectedItem.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden border-2 ${currentImageIndex === index ? "border-amber-500" : "border-transparent"}`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedItem.orderName}
                  </h2>
                  <p className="text-amber-600 text-xl font-bold mb-4">
                    £{parseFloat(selectedItem.price).toFixed(2)}
                  </p>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-gray-700">
                      {selectedItem.product_description ||
                        "No description available"}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Care instruction</h3>
                    <p className="text-gray-700">
                      {selectedItem.care_instruction ||
                        "No instruction available"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium capitalize">
                        {selectedItem.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Size</p>
                      <p className="font-medium">{selectedItem.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fabric</p>
                      <p className="font-medium capitalize">
                        {selectedItem.fabric}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium capitalize">
                        {selectedItem.gender}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Condition</p>
                      <p className="font-medium">New</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrementQuantity(selectedItem.cart_id)}
                        className="w-10 h-10 flex items-center justify-center border rounded-md hover:bg-gray-100 disabled:opacity-50"
                        disabled={selectedItem.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-10 text-center">
                        {selectedItem.quantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(selectedItem.cart_id)}
                        className="w-10 h-10 flex items-center justify-center border rounded-md hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(selectedItem.cart_id)}
                      className="flex items-center text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Your Cart (
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </h1>
            <Link
              href="/collections/all"
              className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
            >
              Continue Shopping <FiArrowRight className="ml-1" />
            </Link>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <HiOutlineEmojiSad className="mx-auto text-4xl text-gray-400 mb-4" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Browse our collections to find something you love
              </p>
              <Link
                href="/collections/all"
                className="inline-flex items-center px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                <FiShoppingBag className="mr-2" /> Shop Now
              </Link>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.cart_id}
                  className="p-4 flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-sm mt-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => openProductModal(item)}
                >
                  <div className="w-full sm:w-32 h-32 relative flex-shrink-0">
                    <Image
                      src={item.image[0]}
                      alt={item.orderName}
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 640px) 100vw, 128px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.orderName}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {item.category}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(item.cart_id);
                        }}
                        className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Size:</span>{" "}
                        <span className="font-medium">{item.size}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Fabric:</span>{" "}
                        <span className="font-medium capitalize">
                          {item.fabric}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Gender:</span>{" "}
                        <span className="font-medium capitalize">
                          {item.gender}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            decrementQuantity(item.cart_id);
                          }}
                          className="w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md hover:bg-gray-100 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            incrementQuantity(item.cart_id);
                          }}
                          className="w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-bold text-amber-600">
                        £{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        {cartItems.length > 0 && (
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8 md:relative">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 pb-20">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span className="font-medium">£{total}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-amber-600">
                    £{total}
                  </span>
                </div>
              </div>

              <div className="md:static fixed bottom-0 left-0 w-full px-6 pb-6 bg-white z-40 shadow-[0_-2px_6px_rgba(0,0,0,0.05)]">
                <button
                  className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                  onClick={() => checkOut()}
                >
                  Proceed to Checkout
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">
                  or{" "}
                  <Link
                    href="/collections/all"
                    className="text-amber-600 hover:text-amber-700"
                  >
                    continue shopping
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}