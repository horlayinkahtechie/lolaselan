"use client";

import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";

export default function AddToWishList({
  id,
  name,
  category,
  price,
  size,
  gender,
  fabric,
  isNew,
  image,
}) {
  const [added, setAdded] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const generateWishlistId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderId = "";
    for (let i = 0; i < 8; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  };

  const handleAddToWishList = async () => {
    if (!session?.user?.email) {
      toast.error("Please log in to add to wishlist.");
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading("Adding to wishlist...");

    const { error } = await supabase.from("wishlist").insert([
      {
        wishlist_id: generateWishlistId(),
        email: session.user.email,
        product_id: id,
        orderName: name,
        category,
        price,
        size,
        gender,
        fabric,
        isNew,
        image,
      },
    ]);

    toast.dismiss(loadingToast);

    if (error) {
      toast.error("Failed to add to wishlist.");
      console.error("Supabase Error:", error.message);
    } else {
      setAdded(true);
      toast.success("Added to wishlist!");
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <button
          className="absolute top-2 cursor-pointer right-2 p-3 bg-white text-black rounded-full shadow-md cursor-not-allowed "
          title="Adding to wishlist"
          disabled
        >
          <svg
            className="animate-spin h-4 w-4 mr-2 text-black"
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
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </button>
      ) : (
        <button
          onClick={handleAddToWishList}
          className="absolute top-2 cursor-pointer right-2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          <FiHeart className="text-gray-600 hover:text-red-500" />
        </button>
      )}
    </>
  );
}
