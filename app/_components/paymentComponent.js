import { useState } from "react";
import { FiLock, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const paymentTabs = [
  { id: "card", label: "Card Payment" },
  { id: "paypal", label: "PayPal" },
  { id: "googlepay", label: "Google Pay" },
  { id: "applepay", label: "Apple Pay" },
];

export default function PaymentMethodSection({
  loading,
  agreeToTerms,
  setAgreeToTerms,
  subscribe,
  setSubscribe,
  handleBuyNow,
  setActiveStep,
}) {
  const [selectedTab, setSelectedTab] = useState("card");

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-[#7B2D26] mb-6">
        Payment Method
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {paymentTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedTab === tab.id
                ? "bg-[#7B2D26] text-white border-[#7B2D26]"
                : "bg-white text-[#7B2D26] border-[#FFD8BE]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[#FFF5F0] rounded-lg p-4 border border-[#FFD8BE] mb-6 transition-all">
        {selectedTab === "card" && (
          <div>
            <p className="text-sm text-[#7B2D26] mb-2">
              Enter your card details:
            </p>
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Card Number"
                className="border border-[#FFD8BE] rounded px-3 py-2 w-full text-sm focus:outline-[#7B2D26]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="border border-[#FFD8BE] rounded px-3 py-2 text-sm focus:outline-[#7B2D26]"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="border border-[#FFD8BE] rounded px-3 py-2 text-sm focus:outline-[#7B2D26]"
                />
              </div>
            </div>
          </div>
        )}

        {selectedTab === "paypal" && (
          <div className="text-sm text-[#7B2D26]">
            You’ll be redirected to PayPal to complete your payment.
          </div>
        )}

        {selectedTab === "googlepay" && (
          <div className="text-sm text-[#7B2D26]">
            Google Pay supported devices will see a secure popup to complete
            this order.
          </div>
        )}

        {selectedTab === "applepay" && (
          <div className="text-sm text-[#7B2D26]">
            Apple Pay is available on Safari with compatible devices.
          </div>
        )}
      </div>

      {/* Subscribe */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="subscribe"
          checked={subscribe}
          onChange={(e) => setSubscribe(e.target.checked)}
          className="mr-2 h-4 w-4 text-[#7B2D26] border-[#FFD8BE] rounded focus:ring-[#7B2D26]"
        />
        <label htmlFor="subscribe" className="text-sm text-[#7B2D26]">
          Subscribe to our newsletter for exclusive offers
        </label>
      </div>

      {/* Terms */}
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
          <Link href="/terms-of-service" target="_blank" className="underline">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" target="_blank" className="underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setActiveStep(2)}
          className="flex items-center cursor-pointer text-[#7B2D26] hover:text-[#5A1E1A]"
        >
          <FiArrowLeft className="mr-2" /> Return to shipping
        </button>
        <button
          disabled={!agreeToTerms || loading}
          onClick={handleBuyNow}
          className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
            agreeToTerms
              ? "bg-[#7B2D26] hover:bg-[#5A1E1A] text-[#FFD8BE]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FiLock className="mr-2" />
          {loading ? "Sending Order..." : "Complete Order"}
        </button>
      </div>
    </div>
  );
}
