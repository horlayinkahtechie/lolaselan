"use client";
import { useState } from "react";
import { FiArrowLeft, FiCheck, FiLock, FiTruck } from "react-icons/fi";
import { Cinzel_Decorative } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import supabase from "../lib/supabase";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();

  const order_id = searchParams.get("order_id") || "";
  const id = searchParams.get("id") || "";
  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";
  const price = searchParams.get("price") || "";
  const size = searchParams.get("size") || "";
  const gender = searchParams.get("gender") || "";
  const fabric = searchParams.get("fabric") || "";
  const isNew = searchParams.get("isNew") || "";
  const image = searchParams.get("image") || "";

  const [activeStep, setActiveStep] = useState(1);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Step one states
  const [subscribe, setSubscribe] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  //   Shipping States
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [shippingPrice, setShippingPrice] = useState(9.99);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  //   Order submission function
  const orderSubmit = async () => {
    if (!session || !session.user?.email) {
      alert("Please log in first to place an order.");
      return;
    }

    setLoading(true);

    const orderId = order_id;

    try {
      const { error: orderError } = await supabase.from("orders").insert([
        {
          product_id: id,
          order_id: orderId,
          email: session.user.email,
          firstName,
          lastName,
          address,
          city,
          postalCode,
          country,
          size: selectedSize,
          quantity,
          shippingMethod,
          paymentMethod,
          productPrice: price,
          totalProductPrice: roundedTotal,
        },
      ]);

      if (orderError) {
        console.error("Order insert error:", orderError);
        router.push("/status/declined");
        return;
      }

      router.push(`/status/confirmed?order_id=${orderId}`);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }

    console.log("order submitted");
  };

  // Sample cart data

  // Available sizes and quantities
  const sizes = [
    "XS (Extra Small)",
    "S (Small)",
    "M (Medium)",
    "L (Large)",
    "XL (Extra Large)",
    "XXL (Extra Extra Large)",
  ];
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Calculate order totals
  const numericPrice =
    parseFloat((price || "0").toString().replace(/[^0-9.]/g, "")) || 0;

  const numericQuantity = parseInt(quantity) || 1;
  const numericShipping = parseFloat(shippingPrice) || 0;

  // Calculate subtotal and total
  const subtotal = numericPrice * numericQuantity;
  const total = subtotal + numericShipping;

  // Round to 2 decimal places for display
  const roundedSubtotal = subtotal.toFixed(2);
  const roundedTotal = total.toFixed(2);

  return (
    <Suspense>
      <div className="min-h-screen bg-[#FFF5F0] py-12 px-4 sm:px-6 lg:px-8 lg:pt-35 pt-35">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className={`text-4xl font-bold text-[#7B2D26] ${cinzelDecorative.className} mb-4`}
            >
              Complete Your Purchase
            </h1>
            <p className="text-[#7B2D26]/80 max-w-lg mx-auto">
              Almost there! Just a few details to finalize your order of premium
              Lolaselan pieces.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-16 relative max-w-2xl mx-auto">
            {/* Background line connecting all steps */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#FFD8BE] -z-10">
              <div
                className={`h-full bg-[#7B2D26] transition-all duration-300 ${
                  activeStep === 1
                    ? "w-1/3"
                    : activeStep === 2
                    ? "w-2/3"
                    : "w-full"
                }`}
              ></div>
            </div>

            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center relative">
                {/* Step circle with number/check icon */}
                <button
                  onClick={() => setActiveStep(step)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= step
                      ? "bg-[#7B2D26] text-[#FFD8BE]"
                      : "bg-[#FFD8BE] text-[#7B2D26]"
                  } transition-colors relative z-10`}
                >
                  {activeStep > step ? <FiCheck size={18} /> : step}
                </button>
                {/* Step label */}
                <span
                  className={`mt-2 text-sm ${
                    activeStep >= step
                      ? "text-[#7B2D26] font-medium"
                      : "text-[#7B2D26]/60"
                  }`}
                >
                  {step === 1
                    ? "Information"
                    : step === 2
                    ? "Shipping"
                    : "Payment"}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Form */}
            <div className="lg:w-2/3">
              {activeStep === 1 && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold text-[#7B2D26] mt-8 mb-6">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#7B2D26] mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 border border-[#FFD8BE] rounded-lg focus:ring-2 focus:ring-[#7B2D26] focus:border-[#7B2D26]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#7B2D26] mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 border border-[#FFD8BE] rounded-lg focus:ring-2 focus:ring-[#7B2D26] focus:border-[#7B2D26]"
                        required
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-[#7B2D26] mt-8 mb-6">
                      Shipping Address
                    </h2>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#7B2D26] mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-3 border border-[#FFD8BE] rounded-lg focus:ring-2 focus:ring-[#7B2D26] focus:border-[#7B2D26]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#7B2D26] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 border border-[#FFD8BE] rounded-lg focus:ring-2 focus:ring-[#7B2D26] focus:border-[#7B2D26]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#7B2D26] mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-4 py-3 border border-[#FFD8BE] rounded-lg focus:ring-2 focus:ring-[#7B2D26] focus:border-[#7B2D26]"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#7B2D26] mb-1">
                        Country
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-4 py-3 border border-[#FFD8BE] rounded-lg focus:ring-2 focus:ring-[#7B2D26] focus:border-[#7B2D26]"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-[#7B2D26] mt-8 mb-6">
                    Product Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#7B2D26] mb-1">
                        Size
                      </label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full px-4 py-3 border border-[#FFD8BE] rounded-lg focus:ring-2 focus:ring-[#7B2D26] focus:border-[#7B2D26]"
                        required
                      >
                        <option value="">Select size</option>
                        {sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#7B2D26] mb-1">
                        Quantity
                      </label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-[#FFD8BE] rounded-lg focus:ring-2 focus:ring-[#7B2D26] focus:border-[#7B2D26]"
                        required
                      >
                        {quantities.map((qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button className="flex items-center cursor-pointer text-[#7B2D26] hover:text-[#5A1E1A]">
                      <FiArrowLeft className="mr-2" /> Return to cart
                    </button>
                    <button
                      onClick={() => {
                        // Validate required fields before proceeding
                        if (
                          firstName &&
                          lastName &&
                          address &&
                          city &&
                          postalCode &&
                          country &&
                          selectedSize &&
                          quantity
                        ) {
                          setActiveStep(2);
                        } else {
                          alert("Please fill in all required fields");
                        }
                      }}
                      className="bg-[#7B2D26] cursor-pointer hover:bg-[#5A1E1A] text-[#FFD8BE] px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold text-[#7B2D26] mb-6">
                    Shipping Method
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        id: "standard",
                        name: "Standard Shipping",
                        price: 9.99,
                        days: "3-5 business days",
                      },
                      {
                        id: "express",
                        name: "Express Shipping",
                        price: 19.99,
                        days: "1-2 business days",
                      },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                          shippingMethod === method.id
                            ? "border-[#7B2D26] bg-[#FFF5F0]"
                            : "border-[#FFD8BE] hover:border-[#7B2D26]"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={shippingMethod === method.id}
                            onChange={() => {
                              setShippingMethod(method.id);
                              setShippingPrice(method.price);
                            }}
                            className="h-4 w-4 text-[#7B2D26] border-[#FFD8BE] focus:ring-[#7B2D26] mr-3"
                          />
                          <FiTruck className="text-[#7B2D26] mr-3" size={20} />
                          <div>
                            <h3 className="font-medium text-[#7B2D26]">
                              {method.name}
                            </h3>
                            <p className="text-sm text-[#7B2D26]/80">
                              {method.days}
                            </p>
                          </div>
                        </div>
                        <span className="font-medium text-[#7B2D26]">
                          £{method.price.toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="flex items-center cursor-pointer text-[#7B2D26] hover:text-[#5A1E1A]"
                    >
                      <FiArrowLeft className="mr-2" /> Return to information
                    </button>
                    <button
                      onClick={() => {
                        // Validate required fields before proceeding
                        if (shippingMethod) {
                          setActiveStep(3);
                        } else {
                          alert("Please fill in all required fields");
                        }
                      }}
                      className="bg-[#7B2D26] cursor-pointer hover:bg-[#5A1E1A] text-[#FFD8BE] px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold text-[#7B2D26] mb-6">
                    Payment Method
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Paystack */}
                      <div
                        onClick={() => setPaymentMethod("paystack")}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-200 ${
                          paymentMethod === "paystack"
                            ? "border-[#7B2D26] bg-[#FFF5F0]"
                            : "border-[#FFD8BE]"
                        }`}
                      >
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/commons/3/30/Paystack_Logo.png"
                          alt="Paystack"
                          width={40}
                          height={40}
                          className="mr-3 object-contain"
                        />
                        <h3 className="font-medium text-[#7B2D26]">Paystack</h3>
                      </div>

                      {/* Stripe */}
                      <div
                        onClick={() => setPaymentMethod("stripe")}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-200 ${
                          paymentMethod === "stripe"
                            ? "border-[#7B2D26] bg-[#FFF5F0]"
                            : "border-[#FFD8BE]"
                        }`}
                      >
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Stripe_Logo%2C_revised_2016.svg"
                          alt="Stripe"
                          width={40}
                          height={40}
                          className="mr-3 object-contain"
                        />
                        <h3 className="font-medium text-[#7B2D26]">Stripe</h3>
                      </div>

                      {/* PayPal */}
                      <div
                        onClick={() => setPaymentMethod("paypal")}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-200 ${
                          paymentMethod === "paypal"
                            ? "border-[#7B2D26] bg-[#FFF5F0]"
                            : "border-[#FFD8BE]"
                        }`}
                      >
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                          alt="PayPal"
                          width={40}
                          height={40}
                          className="mr-3 object-contain"
                        />
                        <h3 className="font-medium text-[#7B2D26]">PayPal</h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="subscribe"
                      checked={subscribe}
                      onChange={(e) => setSubscribe(e.target.checked)}
                      className="mr-2 h-4 w-4 text-[#7B2D26] border-[#FFD8BE] rounded focus:ring-[#7B2D26]"
                    />
                    <label
                      htmlFor="subscribe"
                      className="text-sm text-[#7B2D26]"
                    >
                      Subscribe to our newsletter for exclusive offers
                    </label>
                  </div>
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mr-2 h-4 w-4 text-[#7B2D26] border-[#FFD8BE] rounded focus:ring-[#7B2D26]"
                    />
                    <label htmlFor="terms" className="text-sm text-[#7B2D26]">
                      I agree to the{" "}
                      <a href="#" className="underline">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="flex items-center cursor-pointer text-[#7B2D26] hover:text-[#5A1E1A]"
                    >
                      <FiArrowLeft className="mr-2" /> Return to shipping
                    </button>
                    <button
                      disabled={!agreeToTerms || loading}
                      onClick={() => orderSubmit()}
                      className={`px-6 py-3 rounded-lg cursor-pointer font-medium transition-colors ${
                        agreeToTerms
                          ? "bg-[#7B2D26] hover:bg-[#5A1E1A] text-[#FFD8BE]"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center">
                        <FiLock className="mr-2" />
                        {loading ? "Sending Order..." : "Complete Order"}
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-[#7B2D26] mb-6 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Order Summary
                </h2>

                {/* Product Card */}
                <div className="flex flex-col space-y-4 mb-6 p-4 bg-[#FFF5F0] rounded-lg">
                  <div className="flex items-start">
                    <div className="w-24 h-24 flex-shrink-0 bg-[#FFD8BE] rounded-lg overflow-hidden mr-4">
                      <Image
                        src={image}
                        alt={name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#7B2D26] text-lg">
                        {name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="text-[#7B2D26] font-semibold">
                          {price}
                        </span>
                        {isNew === "true" && (
                          <span className="ml-2 px-2 py-0.5 bg-[#7B2D26] text-[#FFD8BE] text-xs rounded-full">
                            New Arrival
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#7B2D26] mr-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[#7B2D26]/80">Category:</span>
                      <span className="ml-1 font-medium text-[#7B2D26]">
                        {category}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#7B2D26] mr-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[#7B2D26]/80">Gender:</span>
                      <span className="ml-1 font-medium text-[#7B2D26]">
                        {gender}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#7B2D26] mr-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-8h1V5h-1v2zm2 4h1V9h-1v2zm0 4h1v-2h-1v2zm-8 0h1v-2H7v2zm-2 0h1v-2H5v2zm-2-4h1V9H3v2zm2 0h1V9H5v2zm8-4h1V5h-1v2zm-2 0h1V5h-1v2zm-2 0h1V5H9v2zm-2 0h1V5H7v2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[#7B2D26]/80">
                        Sizes Available:
                      </span>
                      <span className="ml-1 font-medium text-[#7B2D26]">
                        {size}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#7B2D26] mr-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[#7B2D26]/80">Fabric:</span>
                      <span className="ml-1 font-medium text-[#7B2D26]">
                        {fabric}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Totals */}
                <div className="border-t border-[#FFD8BE] pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#7B2D26] flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Subtotal
                    </span>
                    <span className="text-[#7B2D26]">£{roundedSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7B2D26] flex items-center">
                      <FiTruck className="h-4 w-4 mr-1" />
                      Shipping
                    </span>
                    <span className="text-[#7B2D26]">£{shippingPrice}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#7B2D26] flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Quantity
                    </span>

                    <span className="text-sm text-[#7B2D26]/80 mt-1">
                      {quantity}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#7B2D26] flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Size
                    </span>

                    <span className="text-sm text-[#7B2D26]/80 mt-1">
                      {selectedSize}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-[#FFD8BE] mt-2">
                    <span className="text-[#7B2D26] flex items-center">
                      <FiLock className="h-4 w-4 mr-1" />
                      Total
                    </span>
                    <span className="text-[#7B2D26]">£{roundedTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
