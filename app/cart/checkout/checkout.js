"use client";
import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabase";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiCreditCard, FiTruck, FiLock } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [activeStep, setActiveStep] = useState(1);
  const [sizes, setSizes] = useState({}); // { productId: size }
  const [quantities, setQuantities] = useState({}); // { productId: quantity }
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    const fetchSessionAndCart = async () => {
      setLoading(true);

      if (!session) {
        toast.error("Please sign in to checkout");
        return;
      }

      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("email", session.user.email);

      if (error) {
        console.error("Error fetching cart:", error.message);
        toast.error("Failed to load your cart");
      } else {
        setCartItems(data || []);
        // Initialize sizes and quantities
        const initialSizes = {};
        const initialQuantities = {};
        data.forEach((item) => {
          initialSizes[item.id] = item.size || "";
          initialQuantities[item.id] = item.quantity || 1;
        });
        setSizes(initialSizes);
        setQuantities(initialQuantities);
      }

      setLoading(false);
    };

    fetchSessionAndCart();
  }, [session]);

  const handleSizeChange = (productId, size) => {
    setSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuantityChange = (productId, quantity) => {
    const num = parseInt(quantity);
    if (!isNaN(num) && num > 0) {
      setQuantities((prev) => ({ ...prev, [productId]: num }));
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 1),
    0
  );
  const shipping = 4.99;
  const total = subtotal + shipping;

  const canProceedToPayment = () => {
    // Check if all items have a size selected
    return Object.values(sizes).every((size) => size !== "");
  };

  const canCompletePayment = () => {
    return agreeTerms && canProceedToPayment();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to proceed with your checkout
          </p>
          <Link
            href="/auth/signin"
            className="inline-flex items-center px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Add some beautiful African fashion pieces to your cart first
          </p>
          <Link
            href="/collections/all"
            className="inline-flex items-center px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-50">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Process */}
        <div className="lg:w-2/3">
          <Link
            href="/cart"
            className="flex items-center text-amber-600 hover:text-amber-700 mb-6"
          >
            <FiArrowLeft className="mr-2" /> Back to Cart
          </Link>

          {/* Progress Steps */}
          <div className="flex mb-8">
            <button
              onClick={() => setActiveStep(1)}
              className={`flex-1 py-4 border-b-2 text-center font-medium ${
                activeStep === 1
                  ? "border-amber-600 text-amber-600"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FiTruck /> Delivery
              </div>
            </button>
            <button
              onClick={() => setActiveStep(2)}
              className={`flex-1 py-4 border-b-2 text-center font-medium ${
                activeStep === 2
                  ? "border-amber-600 text-amber-600"
                  : "border-gray-200 text-gray-500"
              }`}
              disabled={!canProceedToPayment()}
            >
              <div className="flex items-center justify-center gap-2">
                <FiCreditCard /> Payment
              </div>
            </button>
          </div>

          {/* Delivery Form */}
          {activeStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-bold mb-6">Delivery Information</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Post Code
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      required
                    >
                      <option value="">Select Country</option>
                      <option>United Kingdom</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>

                {/* Size and Quantity for each product */}
                <div className="space-y-4 pt-4">
                  <h4 className="font-medium text-gray-900">Your Items</h4>
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-t pt-4">
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.productName}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Size
                              </label>
                              <select
                                value={sizes[item.id] || ""}
                                onChange={(e) =>
                                  handleSizeChange(item.id, e.target.value)
                                }
                                className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                required
                              >
                                <option value="">Select Size</option>
                                <option value="S">Small (S)</option>
                                <option value="M">Medium (M)</option>
                                <option value="L">Large (L)</option>
                                <option value="XL">Extra Large (XL)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={quantities[item.id] || 1}
                                onChange={(e) =>
                                  handleQuantityChange(item.id, e.target.value)
                                }
                                className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <p className="font-medium">
                          £
                          {(item.price * (quantities[item.id] || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${
                      canProceedToPayment()
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!canProceedToPayment()}
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Payment Form */}
          {activeStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="text-lg font-bold mb-6">Payment Method</h3>

              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:border-amber-500 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      id="card"
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                      defaultChecked
                    />
                    <label
                      htmlFor="card"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Credit/Debit Card
                    </label>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:border-amber-500 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      id="paypal"
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                    />
                    <label
                      htmlFor="paypal"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      PayPal
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="subscribe"
                      name="subscribe"
                      type="checkbox"
                      checked={subscribeNewsletter}
                      onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                      className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="subscribe"
                      className="font-medium text-gray-700"
                    >
                      Subscribe to our newsletter
                    </label>
                    <p className="text-gray-500">
                      Get updates on new arrivals, special offers and more
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-medium text-gray-700"
                    >
                      I agree to the terms and conditions
                    </label>
                    <p className="text-gray-500">
                      <Link
                        href="/terms"
                        className="text-amber-600 hover:text-amber-700"
                      >
                        Read terms
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center text-sm text-gray-500">
                <FiLock className="mr-2 text-amber-600" />
                Your payment is securely encrypted
              </div>

              <div className="pt-6">
                <button
                  className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${
                    canCompletePayment()
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!canCompletePayment()}
                >
                  Pay £{total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h3 className="text-lg font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {item.productName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {sizes[item.id] && `Size: ${sizes[item.id]}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {quantities[item.id] || 1}
                    </p>
                  </div>
                  <p className="font-medium">
                    £{(item.price * (quantities[item.id] || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">£{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg text-amber-600">
                  £{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
