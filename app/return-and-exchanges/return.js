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
          At LolasÈlan, we are committed to ensuring that you love every piece
          you purchase. Each garment is crafted with care, and we want you to
          feel confident and comfortable in your orders.
        </p>

        {/* Policy Section */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Return Policy
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>We accept returns within 14 days of delivery.</li>
              <li>
                Item must be unused, unworn, unwashed and in original condition,
                with all tags and labels still attached.
              </li>
              <li>
                Returns that do not meet these conditions will not be accepted.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Exchange Policy
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                We currently offer exchanges for sizes only, subject to
                availability.
              </li>
              <li>
                If your desired size is unavailable, a return return and refund
                will be processed instead.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Non-refundable Items
            </h2>
            <p>
              For hygiene and sustainability reasons, the following items cannot
              be returned or exchanged:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Sales items or promotional purchase.</li>
              <li>Custom or made-to-order pieces refunds</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              How to Request a Return/Exchange
            </h2>
            <ol className="list-decimal pl-6 text-gray-600 space-y-2">
              <li>
                Click the link &apos;Request a return&apos; on your order
                confirmation email or go to your profile and click on the
                &apos;Request refund&apos; link.
              </li>
              <li>
                Select the reason your requesting a refund, then submit. Your
                refund will be processed and you will recieve a confirmation
                email.
              </li>
              <li>
                Keep proof of postage until your return has been confirmed.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Returns Shipping and Customs
            </h2>
            <p>
              You are responsible for covering the cost of return shipping.
              Original shipping charges are non-refundable. If this is not done
              correctly, any customs fees or import charges incurred will be
              deducted from your refund or may result in your return being
              refused.
            </p>
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
