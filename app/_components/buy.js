"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Buy({ product }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleBuyNow = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        size: product.size,
        gender: product.gender,
        fabric: product.fabric,
        isNew: product.isNew,
        image: product.image,
      });

      router.push(`/checkout?${params.toString()}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={handleBuyNow}
        disabled={loading}
        className={`border border-primary text-primary hover:bg-black cursor-pointer hover:text-white py-2 px-3 rounded text-sm transition-colors ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Buying...
          </div>
        ) : (
          "Buy Now"
        )}
      </button>
    </>
  );
}
