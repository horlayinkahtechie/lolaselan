"use client";
import React from "react";

export default function ReturnsExchanges() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6 pt-35 pb-10">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Returns & Exchanges
        </h1>
        <p className="text-gray-600 mb-8">
          We want you to love your purchase! If you&apos;re not completely
          satisfied, our return and exchange policy makes it easy to shop with
          confidence.
        </p>

        {/* Policy Section */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Return Policy
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Items must be returned within 7 days of delivery.</li>
              <li>
                Products must be unused, unworn, and in original packaging.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Exchange Policy
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                Exchanges are available for different sizes or colors of the
                same product.
              </li>
              <li>
                Exchanges must be requested within 7 days of receiving your
                order.
              </li>
              <li>
                If your desired size or color is unavailable, we&apos;ll process
                a refund instead.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              How to Request a Return/Exchange
            </h2>
            <ol className="list-decimal pl-6 text-gray-600 space-y-2">
              <p>
                Send a mail to <b>contact@shoplolaselan.uk</b> requesting refund
                for a product.
              </p>
            </ol>
          </section>
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-gray-100 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Need Help?
          </h3>
          <p className="text-gray-600">
            Contact our support team at{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:underline"
            >
              contact@shoplolaselan.uk
            </a>{" "}
            or call <span className="font-medium">+44 7401 439 257</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
