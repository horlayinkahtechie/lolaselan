"use client";

import { FiShoppingCart, FiX, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import useCartStore from "../lib/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function AddToCart({
  id,
  name,
  category,
  price,
  size: availableSizes = [],
  gender,
  fabric,
  isNew,
  image,
}) {
  const [added, setAdded] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const incrementCart = useCartStore((state) => state.incrementCart);

  // Convert sizes to array if it's a single string
  const sizesArray =
    typeof availableSizes === "string"
      ? [availableSizes]
      : Array.isArray(availableSizes)
      ? availableSizes
      : [];

  const generateCartId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderId = "";
    for (let i = 0; i < 8; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  };

  const handleAddToCart = async () => {
    if (!session?.user?.email) {
      toast.error("Please log in to add to cart.");
      return;
    }

    const cart_id = generateCartId;
    if (!selectedSize && sizesArray.length > 0) {
      toast.error("Please select a size.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Adding to cart...");

    try {
      const { error } = await supabase.from("cart").insert([
        {
          email: session.user.email,
          product_id: id,
          orderName: name,
          category,
          price,
          size: selectedSize || sizesArray[0] || null,
          gender,
          fabric,
          isNew,
          image,
          cart_id,
        },
      ]);

      if (error) throw error;

      setAdded(true);
      toast.success("Added to cart!");
      incrementCart();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to add to cart.");
      console.error("Error adding to cart:", error.message);
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
  };

  // Animation variants
  const modalVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  const mobileModalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center cursor-pointer justify-center bg-[#7B2D26] hover:bg-primary-dark text-white py-2 px-3 rounded text-sm transition-colors"
        title="Add to cart"
      >
        <FiShoppingCart className="mr-2" /> Add to cart
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: 0.0001 }}
              className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
              onClick={closeModal}
            />

            {/* Modal - Desktop (Right Side) */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ type: "spring", damping: 25 }}
              className="hidden md:block fixed right-0 top-0 h-full w-1/4 bg-white z-50 shadow-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Select Size</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close size selection"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="mb-6 flex-grow">
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full flex items-center justify-between py-2 px-3 border border-gray-300 rounded-md text-left hover:border-gray-400 transition-colors"
                    >
                      {selectedSize || "Select a size"}
                      <FiChevronDown
                        className={`transition-transform ${
                          isDropdownOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {sizesArray.map((size) => (
                          <button
                            key={size}
                            onClick={() => {
                              setSelectedSize(size);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full text-left py-2 px-3 hover:bg-gray-100 transition-colors"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={closeModal}
                    className="flex-1 cursor-pointer py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={
                      (!selectedSize && sizesArray.length > 0) || loading
                    }
                    className={`flex-1 py-2 px-4 rounded-md text-white transition-colors cursor-pointer ${
                      (!selectedSize && sizesArray.length > 0) || loading
                        ? "bg-[#904038] cursor-not-allowed"
                        : "bg-[#7B2D26] hover:bg-[#5a1e19]"
                    }`}
                  >
                    {loading ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Modal - Mobile (Bottom) */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileModalVariants}
              transition={{ type: "spring", damping: 25 }}
              className="md:hidden h-70 fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 z-50 shadow-lg max-h-[70vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Select Size</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close size selection"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between py-2 px-3 border border-gray-300 rounded-md text-left hover:border-gray-400 transition-colors"
                  >
                    {selectedSize || "Select a size"}
                    <FiChevronDown
                      className={`transition-transform ${
                        isDropdownOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {sizesArray.map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setSelectedSize(size);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left py-2 px-3 hover:bg-gray-100 transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 cursor-pointer py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={(!selectedSize && sizesArray.length > 0) || loading}
                  className={`flex-1 py-2 px-4 rounded-md text-white transition-colors cursor-pointer ${
                    (!selectedSize && sizesArray.length > 0) || loading
                      ? "bg-[#904038] cursor-not-allowed"
                      : "bg-[#7B2D26] hover:bg-[#5a1e19]"
                  }`}
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
