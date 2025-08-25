"use client";

import { FiHeart, FiX } from "react-icons/fi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AddToWishList({
  id,
  name,
  category,
  price,
  sizes = ["S", "M", "L", "XL"], // available sizes
  gender,
  fabric,
  isNew,
  image,
}) {
  const [added, setAdded] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const generateWishlistId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderId = "";
    for (let i = 0; i < 8; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  };

  const handleConfirmAdd = async () => {
    if (!session?.user?.email) {
      toast.error("Please log in to add to wishlist.");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size.");
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
        size: selectedSize,
        gender,
        fabric,
        isNew,
        image: image,
      },
    ]);

    toast.dismiss(loadingToast);

    if (error) {
      toast.error("Failed to add to wishlist.");
      console.error("Supabase Error:", error.message);
    } else {
      setAdded(true);
      toast.success("Added to wishlist!");
      setShowModal(false);
      setSelectedSize("");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Heart Button */}
      <button
        onClick={() => setShowModal(true)}
        className="absolute top-2 cursor-pointer right-2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <FiHeart
          className={`${
            added ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
        />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Content */}
          <div
            className={`
              bg-white shadow-lg z-50 transform transition-transform
              w-full sm:w-80
              fixed
              ${loading ? "pointer-events-none opacity-70" : ""}
              sm:right-0 sm:top-0 sm:h-full
              sm:translate-x-0
              bottom-0 sm:rounded-none
              rounded-t-2xl
              h-[35vh] sm:h-full
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Choose Size</h2>
              <button onClick={() => setShowModal(false)}>
                <FiX className="text-gray-500 hover:text-gray-700" size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === sz
                        ? "bg-[#7B2D26] text-white border-[#7B2D26]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <Link
                href="/size-guidelines"
                target="_blank"
                className="underline text-[#7B2D26] mb-5"
              >
                View size guidelines
              </Link>

              <button
                onClick={handleConfirmAdd}
                disabled={loading}
                className="w-full bg-[#7B2D26] text-white py-2 mt-5 rounded-lg hover:bg-[#5a1e19] transition disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
