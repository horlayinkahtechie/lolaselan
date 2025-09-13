"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Buy({ product }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  //Random orderID
  const generateOrderId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderId = "";
    for (let i = 0; i < 8; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  };

  const handleBuyNow = async () => {
    if (!session || !session.user?.email) {
      toast.error("Please log in first to place an order.");
      return;
    }
    setLoading(true);

    try {
      const params = new URLSearchParams({
        order_id: generateOrderId(),
        id: product.id,
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
