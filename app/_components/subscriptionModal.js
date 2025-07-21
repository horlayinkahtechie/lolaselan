"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const NewsletterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    console.log("Subscribed:", email);
    onClose();
  };

  if (!isOpen) return null;

  return (
    // In your modal component
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Image Column - Hidden on mobile */}
        <div className="hidden md:block md:w-1/2 bg-amber-900 relative">
          <Image
            src="https://i.pinimg.com/736x/78/e2/cd/78e2cdc01f0a63dac69dfddec689984a.jpg"
            alt="Newsletter Promotion Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-amber-900 bg-opacity-30 flex items-center justify-center p-6">
            <h3 className="text-3xl font-bold text-white text-center">
              Join Our Community
              <br />
              <span className="text-amber-200">
                Get 10% Off Your First Order
              </span>
            </h3>
          </div>
        </div>

        {/* Form Column */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-amber-900">Stay Updated</h2>
            <button
              onClick={onClose}
              className="text-red-700  hover:bg-[#7B2D26] p-1 hover:text-white rounded-4xl"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            styling tips.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7B2D26] hover:bg-amber-800 text-white py-3 px-4 rounded-md font-medium transition-colors"
            >
              Subscribe Now
            </button>

            <p className="text-xs text-gray-500 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
