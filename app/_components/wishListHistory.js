"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import supabase from "../lib/supabase";
import { FiPackage, FiChevronRight, FiChevronLeft, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function WishlistHistory() {
  const { data: session } = useSession();
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchWishlists = async () => {
      if (!session?.user?.email) {
        toast.error("Failed to load wishlists.");
        return;
      }

      setLoading(true);

      try {
        // First fetch wishlist
        const { data: wishlist, error: wishlistError } = await supabase
          .from("wishlist")
          .select("*")
          .eq("email", session.user.email)
          .order("created_at", { ascending: false });

        if (wishlistError) throw wishlistError;

        if (!wishlist || wishlist.length === 0) {
          setWishlists([]);
          return;
        }

        // Fetch related products
        const productIds = wishlist.map((w) => w.product_id);
        const { data: products, error: productsError } = await supabase
          .from("products")
          .select("id, product_description, care_instruction, image")
          .in("id", productIds);

        if (productsError) throw productsError;

        // Merge products into wishlist
        const merged = wishlist.map((w) => ({
          ...w,
          products: products.find((p) => p.id === w.product_id) || {},
        }));

        setWishlists(merged);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlists();
  }, [session]);

  const handleAddToCart = async (wishlistItem) => {
    try {
      const { error: cartError } = await supabase.from("cart").insert([
        {
          email: session.user.email,
          product_id: wishlistItem.product_id,
          orderName: wishlistItem.orderName,
          price: wishlistItem.price,
          image: wishlistItem.products?.image || [],
          quantity: 1,
          gender: wishlistItem.gender,
          fabric: wishlistItem.fabric,
          cart_id: wishlistItem.wishlist_id,
          isNew: true,
          size: wishlistItem.size,
        },
      ]);

      if (cartError) throw cartError;

      const { error: deleteError } = await supabase
        .from("wishlist")
        .delete()
        .eq("wishlist_id", wishlistItem.wishlist_id);

      if (deleteError) throw deleteError;

      setWishlists((prev) =>
        prev.filter((w) => w.wishlist_id !== wishlistItem.wishlist_id)
      );

      toast.success("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const openProductModal = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeProductModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (!selectedItem?.products?.image) return;
    setCurrentImageIndex((prev) =>
      prev === selectedItem.products.image.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedItem?.products?.image) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedItem.products.image.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Product Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 relative">
              <button
                onClick={closeProductModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="relative">
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={
                        selectedItem.products?.image?.[currentImageIndex] ||
                        "/placeholder.png"
                      }
                      alt={selectedItem.orderName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {selectedItem.products?.image?.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <FiChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      >
                        <FiChevronRight size={20} />
                      </button>

                      {/* Thumbnail carousel */}
                      <div className="flex gap-2 mt-3 overflow-x-auto">
                        {selectedItem.products.image.map((img, idx) => (
                          <div
                            key={idx}
                            className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer ${
                              idx === currentImageIndex
                                ? "ring-2 ring-amber-500"
                                : ""
                            }`}
                            onClick={() => setCurrentImageIndex(idx)}
                          >
                            <Image
                              src={img}
                              alt={`${selectedItem.orderName} thumbnail ${idx}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Product Details */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedItem.orderName}
                  </h2>
                  <p className="text-amber-600 text-xl font-bold mb-4">
                    £{parseFloat(selectedItem.price).toFixed(2)}
                  </p>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-gray-700">
                      {selectedItem.products?.product_description ||
                        "No description available"}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Care instruction</h3>
                    <p className="text-gray-700">
                      {selectedItem.products?.care_instruction ||
                        "No instruction available"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium capitalize">
                        {selectedItem.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Size</p>
                      <p className="font-medium">{selectedItem.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fabric</p>
                      <p className="font-medium capitalize">
                        {selectedItem.fabric}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium capitalize">
                        {selectedItem.gender}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist List */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your wishlists</h1>
        <p className="text-gray-600 mt-1">
          {wishlists.length} {wishlists.length === 1 ? "wishlist" : "wishlists"}{" "}
          saved
        </p>
      </div>

      {wishlists.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FiPackage className="mx-auto text-4xl text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No wishlists yet
          </h2>
          <p className="text-gray-600 mb-6">
            Your saved items will appear here.
          </p>
          <Link
            href="/collections/all"
            className="inline-flex items-center px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlists.map((order) => (
            <div
              key={order.wishlist_id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Wishlist ID{" "}
                      <span className="font-bold">{order.wishlist_id}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Added on{" "}
                      <span className="font-bold">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">£{order.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div
                  className="grid gap-4 cursor-pointer"
                  onClick={() => openProductModal(order)}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={order.products?.image?.[0] || "/placeholder.png"}
                        alt={order.orderName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {order.orderName}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleAddToCart(order)}
                    className="flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    Add to cart <FiChevronRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
