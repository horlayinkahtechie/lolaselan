"use client";
import { useState, useEffect } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiLock,
  FiTruck,
  FiAlertCircle,
  FiCreditCard,
  FiShoppingBag,
} from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import SizeGuide from "../_components/sizeguide";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const searchParams = useSearchParams();

  // Product data from URL params
  const order_id = searchParams.get("order_id") || "";
  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";
  const price = searchParams.get("price") || "";
  const size = searchParams.get("size") || "";
  const gender = searchParams.get("gender") || "";
  const fabric = searchParams.get("fabric") || "";
  const isNew = searchParams.get("isNew") || "";
  const image = searchParams.get("image");
  const product_description = searchParams.get("product_description") || "";
  const care_instruction = searchParams.get("care_instruction");

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

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
    selectedSize: "",
    quantity: 1,
  });

  // Form errors
  const [formErrors, setFormErrors] = useState({});

  // Validate form
  const validateDeliveryForm = () => {
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

    if (!formData.selectedSize) {
      errors.selectedSize = "Size is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  useEffect(() => {
    if (showCheckoutForm) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showCheckoutForm]);

  // Handle shipping method change
  const handleShippingChange = (method) => {
    const selectedOption = shippingOptions.find((opt) => opt.id === method);
    setFormData((prev) => ({
      ...prev,
      shippingMethod: method,
      shipping: selectedOption.price,
    }));
  };

  // Handle buy now
  const handleBuyNow = async () => {
    if (!session || !session.user?.email) {
      toast.error("Please sign in to place an order");
      return;
    }

    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (!validateDeliveryForm()) {
      setActiveStep(1);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: id,
          order_id: order_id,
          email: session.user.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postCode,
          country: formData.country,
          size: formData.selectedSize,
          quantity: formData.quantity,
          shippingMethod: formData.shippingMethod,
          productPrice: price,
          totalProductPrice: total.toFixed(2),
          name: name,
          image: image,
          shippingPrice: formData.shipping,
          phoneNo: formData.phoneNo,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to complete checkout: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const numericPrice = parseFloat(price) || 0;
  const numericQuantity = parseInt(formData.quantity) || 1;
  const numericShipping = parseFloat(formData.shipping) || 0;
  const subtotal = numericPrice * numericQuantity;
  const fixedSubTotal = subtotal.toFixed(2);
  const total = subtotal + numericShipping;
  const fixedTotal = total.toFixed(2);

  // Available sizes and quantities
  const sizes = size.split(",").map((s) => s.trim());
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 pt-40 pb-40">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to proceed with your checkout
          </p>
          <Link
            href="/user/login"
            className="inline-flex items-center px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!showCheckoutForm) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-40">
        {/* Product Preview Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Details */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h1 className="text-2xl font-bold mb-4">{name}</h1>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Product image`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-gray-700 whitespace-pre-line">
                      {product_description}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Care instruction
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line">
                      {care_instruction}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium">{category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fabric</p>
                        <p className="font-medium">{fabric}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium">{gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Condition</p>
                        <p className="font-medium">New</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <SizeGuide />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}

          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8 pb-24 lg:pb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FiShoppingBag className="mr-2" />
                Order Summary
              </h2>

              <div className="flex items-start mb-6">
                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mr-4">
                  <Image
                    src={image}
                    alt={`Product image `}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{name}</h3>
                  <p className="text-amber-600 font-semibold">
                    £{numericPrice}
                  </p>
                  {isNew === "true" && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                      New Arrival
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">£{fixedSubTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    To be calculated in checkout
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                  <span className="font-bold">Estimated Total</span>
                  <span className="font-bold text-lg text-amber-600">
                    £{fixedSubTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* ✅ Fixed button only on mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
              <button
                onClick={() => {
                  setShowCheckoutForm(true);
                  window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 Add this
                }}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                <FiShoppingBag className="mr-2" />
                Proceed to Checkout
              </button>
            </div>

            {/* ✅ Normal button for desktop */}
            <button
              onClick={() => setShowCheckoutForm(true)}
              className="hidden lg:flex w-full mt-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors items-center justify-center"
            >
              <FiShoppingBag className="mr-2" />
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-40">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Process */}
        <div className="lg:w-2/3">
          <button
            onClick={() => setShowCheckoutForm(false)}
            className="flex items-center text-amber-600 hover:text-amber-700 mb-6"
          >
            <FiArrowLeft className="mr-2" /> Back to Product Details
          </button>

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
                        <FiAlertCircle className="mr-1" />{" "}
                        {formErrors.firstName}
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
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                        formErrors.country ? "border-red-500" : ""
                      }`}
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                    </select>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size *
                    </label>
                    <select
                      name="selectedSize"
                      value={formData.selectedSize}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500 ${
                        formErrors.selectedSize ? "border-red-500" : ""
                      }`}
                      required
                    >
                      <option value="">Select Size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    {formErrors.selectedSize && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <FiAlertCircle className="mr-1" />{" "}
                        {formErrors.selectedSize}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
                    >
                      {quantities.map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => validateDeliveryForm() && setActiveStep(2)}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
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
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
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
                        href="/terms-of-service"
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
                  onClick={handleBuyNow}
                  disabled={!agreeToTerms || loading}
                  className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${
                    !agreeToTerms || loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  {loading ? "Processing..." : `Pay £${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <FiShoppingBag className="mr-2" />
              Order Summary
            </h2>

            <div className="flex items-start mb-6">
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mr-4">
                <Image
                  src={image}
                  alt={`Product image`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{name}</h3>
                <p className="text-amber-600 font-semibold">£{numericPrice}</p>
                {isNew === "true" && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                    New Arrival
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">£{fixedSubTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingOptions.find((o) => o.id === formData.shippingMethod)
                    ?.name || "Shipping"}
                  : £{numericShipping.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg text-amber-600">
                  £{fixedTotal}
                </span>
              </div>
            </div>

            <div className="pt-4 text-xs text-gray-500">
              <p>Free returns within 7 days</p>
              <p>
                Estimated delivery:{" "}
                {formData.shippingMethod === "next-day"
                  ? "Next business day"
                  : "2-4 business days"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
