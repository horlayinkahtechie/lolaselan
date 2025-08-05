import { FiLock, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function PaymentMethodSection({
  loading,
  agreeToTerms,
  setAgreeToTerms,
  subscribe,
  setSubscribe,
  handleBuyNow,
  setActiveStep,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold text-[#7B2D26] mb-6">
        Payment Method
      </h2>

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
          className={`px-6 py-3 rounded-lg cursor-pointer font-medium transition-colors flex items-center ${
            agreeToTerms
              ? "bg-[#7B2D26] hover:bg-[#5A1E1A] text-[#FFD8BE]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <FiLock className="mr-2" />
          {loading ? "Redirecting..." : "Redirect to payment"}
        </button>
      </div>
    </div>
  );
}
