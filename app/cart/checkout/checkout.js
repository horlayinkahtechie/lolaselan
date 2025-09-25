"use client";
import { useEffect, useState, useCallback } from "react";
import supabase from "@/app/lib/supabase";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiCreditCard,
  FiTruck,
  FiLock,
  FiAlertCircle,
  FiCheck,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const CheckoutPage = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(1);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const {data: session} = useSession();

  // Shipping options
  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 3.99,
      description: "2-4 working days",
      icon: <FiTruck className="text-amber-600" />,
    },
    {
      id: "next-day",
      name: "Next Day Delivery",
      price: 4.99,
      description: "Next working day",
      icon: <FiTruck className="text-amber-600" />,
    },
  ];

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    phoneNo: "",
    shipping: shippingOptions[0].price,
    shippingMethod: shippingOptions[0].id,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check authentication status
    const checkAuth = async () => {
      try {
        
        setIsAuthenticated(!!session);
        if (session?.user?.email) {
          setUserEmail(session.user.email);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  // Form errors
  const [formErrors, setFormErrors] = useState({});

  // Memoized validation function
  const validateDeliveryForm = useCallback(() => {
    const errors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
      isValid = false;
    }

    if (!formData.postCode.trim()) {
      errors.postCode = "Post code is required";
      isValid = false;
    }

    if (!formData.country) {
      errors.country = "Country is required";
      isValid = false;
    }

    if (!formData.phoneNo.trim()) {
      errors.phoneNo = "Phone number is required";
      isValid = false;
    } else if (!/^[\d\s+-]+$/.test(formData.phoneNo)) {
      errors.phoneNo = "Invalid phone number";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }, [formData]);

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

          setCartItems(cartData || []);
        } else {
          // Fetch from localStorage for unauthenticated users
          const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
          setCartItems(storedCart);
        }
      } catch (error) {
        console.error("Error fetching cart:", error.message);
        toast.error("Failed to load your cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [isAuthenticated]);

  // Calculate totals with proper type checking
  const subtotal = cartItems.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^0-9.-]/g, ""))
        : Number(item.price);
    const quantity = Number(item.quantity) || 1;
    return sum + (isNaN(price) ? 0 : price) * quantity;
  }, 0);

  const shipping =
    typeof formData.shipping === "number"
      ? formData.shipping
      : parseFloat(formData.shipping) || 0;
  const total = (subtotal + shipping).toFixed(2);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle shipping method change
  const handleShippingChange = (method) => {
    const selectedOption = shippingOptions.find((opt) => opt.id === method);
    setFormData((prev) => ({
      ...prev,
      shippingMethod: method,
      shipping: selectedOption.price,
    }));
  };

  // Proceed to payment step
  const proceedToPayment = (e) => {
    e.preventDefault();
    if (validateDeliveryForm()) {
      setActiveStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (!validateDeliveryForm()) {
      setActiveStep(1);
      return;
    }

    setLoading(true);
    try {
      // Get email for order - use authenticated user's email or form email
      const orderEmail = isAuthenticated ? userEmail : formData.email;

      // Create order records
      const orderRecords = cartItems.map((item) => {
        const price =
          typeof item.price === "string"
            ? parseFloat(item.price.replace(/[^0-9.-]/g, ""))
            : Number(item.price);
        const quantity = Number(item.quantity) || 1;
        const numericShipping = Number(shipping);

        return {
          order_id: item.cart_id || `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          email: orderEmail,
          status: "pending",
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postCode,
          country: formData.country,
          phoneNo: formData.phoneNo,
          shippingMethod: formData.shippingMethod,
          shippingPrice: numericShipping,
          paymentMethod: "Stripe",
          productPrice: price,
          totalToBePaid: (price * quantity + numericShipping).toFixed(2),
          name: item.orderName || item.name || "Unknown Product",
          image: Array.isArray(item.image) ? item.image : [item.image],
          quantity: quantity,
          size: item.size || "N/A",
        };
      });

      // Create payment session
      const res = await fetch("/api/cart-checkout-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: orderRecords,
          email: orderEmail,
          shippingPrice: Number(shipping),
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Clear cart after successful payment initiation
      if (!isAuthenticated) {
          localStorage.removeItem('cart');
      } 

      // Redirect to checkout
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (stripeError) throw stripeError;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to complete checkout: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 pt-40 pb-40">
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
              onClick={() => validateDeliveryForm() && setActiveStep(2)}
              className={`flex-1 py-4 border-b-2 text-center font-medium ${
                activeStep === 2
                  ? "border-amber-600 text-amber-600"
                  : "border-gray-200 text-gray-500"
              }`}
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
                {/* Email field for unauthenticated users */}
                {!isAuthenticated && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                        formErrors.email ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <FiAlertCircle className="mr-1" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                        formErrors.firstName ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <FiAlertCircle className="mr-1" /> {formErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                        formErrors.lastName ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <FiAlertCircle className="mr-1" /> {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                      formErrors.address ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {formErrors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="mr-1" /> {formErrors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                        formErrors.city ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.city && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <FiAlertCircle className="mr-1" /> {formErrors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Post Code *
                    </label>
                    <input
                      type="text"
                      name="postCode"
                      value={formData.postCode}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                        formErrors.postCode ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.postCode && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <FiAlertCircle className="mr-1" /> {formErrors.postCode}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                        formErrors.country ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {formErrors.country && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <FiAlertCircle className="mr-1" /> {formErrors.country}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                      formErrors.phoneNo ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {formErrors.phoneNo && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="mr-1" /> {formErrors.phoneNo}
                    </p>
                  )}
                </div>

                {/* Shipping Method Section */}
                <div className="pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Shipping Method *
                  </h4>
                  <div className="space-y-3">
                    {shippingOptions.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleShippingChange(option.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.shippingMethod === option.id
                            ? "border-amber-500 bg-amber-50"
                            : "border-gray-200 hover:border-amber-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                formData.shippingMethod === option.id
                                  ? "bg-amber-500 border-amber-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {formData.shippingMethod === option.id && (
                                <FiCheck className="text-white text-xs" />
                              )}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">
                                {option.name}
                              </h5>
                              <p className="text-sm text-gray-500">
                                {option.description}
                              </p>
                            </div>
                          </div>
                          <span className="font-medium text-gray-800">
                            £{option.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={proceedToPayment}
                    className={`w-full py-3 text-white font-medium rounded-lg transition-colors bg-amber-600 hover:bg-amber-700`}
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

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="subscribe"
                      name="subscribe"
                      type="checkbox"
                      checked={subscribeNewsletter}
                      onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                      className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded"
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
                      I agree to the terms and conditions *
                    </label>
                    <p className="text-gray-500">
                      <Link
                        href="/terms"
                        className="text-amber-600 hover:text-amber-700"
                        target="_blank"
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
                  onClick={handleSubmit}
                  disabled={!agreeTerms || loading}
                  className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${
                    !agreeTerms || loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  {loading ? "Processing..." : `Pay £${total}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h3 className="text-lg font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.map((item) => {
                const price =
                  typeof item.price === "string"
                    ? parseFloat(item.price.replace(/[^0-9.-]/g, ""))
                    : Number(item.price);
                const quantity = Number(item.quantity) || 1;

                return (
                  <div key={item.cart_id || item.id} className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={item.image[0]}
                        alt={item.orderName || item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.orderName || item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.size && `Size: ${item.size}`}
                      </p>
                      <p className="text-sm text-gray-500">Qty: {quantity}</p>
                    </div>
                    <p className="font-medium">
                      £{(price * quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingOptions.find((o) => o.id === formData.shippingMethod)
                    ?.name || "Shipping"}
                  : £{shipping.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg text-amber-600">
                  £{total}
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

