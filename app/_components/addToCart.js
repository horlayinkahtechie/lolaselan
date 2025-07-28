"use client";

import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import useCartStore from "../lib/cartStore";

export default function AddToCart({
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
  const incrementCart = useCartStore((state) => state.incrementCart);

  const handleAddToCart = async () => {
    if (!session?.user?.email) {
      toast.error("Please log in to add to cart.");
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading("Adding to cart...");

    const { error } = await supabase.from("cart").insert([
      {
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
      toast.error("Failed to add to cart.");
      console.error("Supabase Error:", error.message);
    } else {
      setAdded(true);
      toast.success("Added to cart!");
      incrementCart();
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <button
          className="flex items-center cursor-pointer justify-center bg-[#7B2D26] hover:bg-primary-dark text-white py-2 px-3 rounded text-sm transition-colors"
          title={added ? "Added to cart" : "Add to cart"}
        >
          <FiShoppingCart className="mr-2" /> Adding to cart...
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="flex items-center cursor-pointer justify-center bg-[#7B2D26] hover:bg-primary-dark text-white py-2 px-3 rounded text-sm transition-colors"
          title={added ? "Added to cart" : "Add to cart"}
        >
          <FiShoppingCart className="mr-2" /> Add to cart
        </button>
      )}
    </>
  );
}
