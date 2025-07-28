"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import Image from "next/image";
import toast from "react-hot-toast";
import { FiShoppingBag, FiTrash2, FiArrowRight } from "react-icons/fi";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { RiLoader4Line } from "react-icons/ri";
import Link from "next/link";

export default function CartPage() {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([0]);
  const [loading, setLoading] = useState(true);

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1),
    0
  );

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!session?.user?.email) return;

      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("email", session.user.email);

      if (error) {
        toast.error("Failed to load cart.");
        console.error("Fetch error:", error);
      } else {
        // Initialize quantity if not present
        const itemsWithQuantity = data.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCartItems(itemsWithQuantity);
      }
      setLoading(false);
    };

    fetchCartItems();
  }, [session]);

  // Update quantity in database and state
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    const toastId = toast.loading("Updating quantity...");

    try {
      // Update in database
      const { error } = await supabase
        .from("cart")
        .update({ quantity: newQuantity })
        .eq("id", id);

      if (error) throw error;

      // Update in state
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );

      toast.success("Quantity updated", { id: toastId });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update quantity", { id: toastId });
    }
  };

  // Remove item from cart
  const handleRemove = async (id) => {
    const toastId = toast.loading("Removing item...");
    const { error } = await supabase.from("cart").delete().eq("id", id);

    if (error) {
      toast.error("Failed to remove item.", { id: toastId });
    } else {
      toast.success("Item removed from cart.", { id: toastId });
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Increment quantity
  const incrementQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  // Decrement quantity
  const decrementQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <RiLoader4Line className="animate-spin text-3xl text-amber-600 mb-4" />
        <p className="text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <FiShoppingBag className="text-4xl text-gray-400 mb-4" />
        <h2 className="text-xl font-medium mb-2">
          Your shopping cart is empty
        </h2>
        <p className="text-gray-600 mb-6">Please log in to view your cart</p>
        <Link
          href="/auth/signin"
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-40 pb-15">
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
            // <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-sm mt-4"
                >
                  <div className="w-full sm:w-32 h-32 relative flex-shrink-0">
                    <Image
                      src={item.image}
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
                        onClick={() => handleRemove(item.id)}
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
                          onClick={() => decrementQuantity(item.id)}
                          className="w-8 h-8 cursor-pointer flex items-center justify-center border rounded-md hover:bg-gray-100 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
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
            // </div>
          )}
        </div>

        {/* Order Summary Section */}
        {cartItems.length > 0 && (
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
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
              <button
                className="w-full mt-6 py-3 px-4 cursor-pointer bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                onClick={() => toast.success("Proceeding to checkout")}
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
        )}
      </div>
    </div>
  );
}
