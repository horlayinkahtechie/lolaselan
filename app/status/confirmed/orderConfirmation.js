"use client";
import { FaThumbsUp } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function OrderConfirmation() {
  const searchParams = useSearchParams();

  const order_Id = searchParams.get("order_id");

  return (
    <>
      <Head>
        <title>Order Confirmed | Lolaselan</title>
        <meta
          name="description"
          content="Your order has been successfully placed"
        />
      </Head>

      <Suspense>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-35">
          <div className="max-w-3xl mx-auto">
            {/* Confirmation Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Decorative header */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2"></div>

              {/* Main content */}
              <div className="p-8 sm:p-10">
                <div className="flex flex-col items-center text-center">
                  {/* Animated checkmark */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                      <FaThumbsUp className="text-amber-600 text-4xl animate-bounce" />
                    </div>
                    <div className="absolute -inset-2 border-2 border-amber-200 rounded-full animate-ping opacity-75"></div>
                  </div>

                  <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
                    Order Confirmed!
                  </h1>

                  <p className="text-lg text-gray-600 max-w-md mb-8">
                    Thank you for your purchase! Your order no {order_Id} has
                    been placed successfully. We&apos;ve sent a confirmation to
                    your email.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                    <Link href="/collections/all" className="flex-1">
                      <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                        Shop More Clothes
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </Link>
                    <Link href="/profile/orders" className="flex-1">
                      <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-all duration-300">
                        View Order Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer note */}
              <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-500">
                  Need help?{" "}
                  <a
                    href="#"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Contact support
                  </a>{" "}
                  or call (123) 456-7890
                </p>
              </div>
            </div>

            {/* Delivery estimate */}
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Delivery on the way
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Your order will arrive by{" "}
                    <span className="font-medium">To be calculated</span>.
                    We&apos;ll send tracking information when your items ship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
