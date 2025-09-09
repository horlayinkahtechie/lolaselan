"use client";
import {
  FaExclamationTriangle,
  FaCreditCard,
  FaShoppingBag,
} from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";

export default function OrderDeclined() {
  return (
    <>
      <Head>
        <title>Payment Declined | LolasÈlan</title>
        <meta name="description" content="Your payment was not processed" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 lg:pt-35 pt-35">
        <div className="max-w-3xl mx-auto">
          {/* Declined Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
            {/* Decorative header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 h-2"></div>

            {/* Main content */}
            <div className="p-8 sm:p-10">
              <div className="flex flex-col items-center text-center">
                {/* Warning icon */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                    <FaExclamationTriangle className="text-red-600 text-4xl animate-pulse" />
                  </div>
                  <div className="absolute -inset-2 border-2 border-red-200 rounded-full opacity-75"></div>
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
                  Payment Declined
                </h1>

                <p className="text-lg text-gray-600 max-w-md mb-6">
                  We couldn&apos;t process your payment for order #12345. Please
                  try again or use a different payment method.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                  <Link href="/collections/all" className="flex-1">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                      Try Ordering Again
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </Link>
                  <Link href="/collections/all" className="flex-1">
                    <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-all duration-300 flex items-center justify-center">
                      <FaShoppingBag className="mr-2 text-amber-600" />
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                Need help?{" "}
                <Link
                  href="/contactus"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Contact support
                </Link>{" "}
                or call +44 7401 439 257
              </p>
            </div>
          </div>

          {/* Payment methods reminder */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-amber-100 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Other Payment Options
                </h3>
                <p className="mt-1 text-gray-600">
                  We accept PayPal, Apple Pay, and Google Pay. Your items remain
                  reserved for 30 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
