"use client";
import { useState, useEffect } from "react";
import AddToCart from "@/app/_components/addToCart";
import AddToFavorite from "@/app/_components/addToFavorite";
import Buy from "@/app/_components/buy";
import Image from "next/image";
import {
  FiHeart,
  FiLayers,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import supabase from "@/app/lib/supabase";

export default function AdireTwoPiece() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdireTwoPieces = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .ilike("id", "%TWOPIECE%")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching Two Pieces:", err);
        setError("Failed to load Two Pieces");
      } finally {
        setLoading(false);
      }
    };

    fetchAdireTwoPieces();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-5 pt-30">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4">
            <div className="aspect-square bg-gray-200 animate-pulse rounded"></div>
            <div className="mt-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="p-5 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center lg:pt-50 lg:p-5 pt-35 p-2">
        <FiZap className="mr-2 text-black" /> Two Piece
      </h2>
      {products.length === 0 ? (
        <div className="p-5 text-center text-gray-500">
          No Two Piece products found. Please Check back later.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:pt-10 lg:pb-20 lg:p-5 pb-10 p-2 pt-5">
          {products.map((product) => (
            <div key={product.id} className="p-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                  <Image
                    src={product.image[0]}
                    fill
                    alt={product.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Status Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-2 items-start">
                    {product.isNew && (
                      <div className="bg-primary text-white bg-[#7B2D26] text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </div>
                    )}
                    {product.status === "available" && (
                      <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        AVAILABLE
                      </div>
                    )}
                    {product.status === "pre-order" && (
                      <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        PRE-ORDER
                      </div>
                    )}
                    {product.status === "out of stock" && (
                      <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        OUT OF STOCK
                      </div>
                    )}
                  </div>

                  <AddToFavorite
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    size={product.size}
                    gender={product.gender}
                    fabric={product.fabric}
                    isNew={product.isNew}
                    image={product.image}
                  />
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <span className="font-bold text-primary">
                      £{product.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {product.category}
                  </p>

                  {/* Product Meta */}
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center">
                      <FiLayers className="mr-1" />{" "}
                      {Array.isArray(product.size)
                        ? product.size.join(", ")
                        : product.size}
                    </span>
                    <span className="flex items-center">
                      <FiUsers className="mr-1" /> {product.gender}
                    </span>
                    <span className="flex items-center">
                      <FiTag className="mr-1" /> {product.fabric}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {product.status === "out of stock" ? (
                      <>
                        <button
                          disabled
                          className="w-full py-2 rounded-lg bg-gray-300 text-gray-600 font-semibold cursor-not-allowed"
                        >
                          Add to cart
                        </button>
                        <button
                          disabled
                          className="w-full py-2 rounded-lg bg-gray-300 text-gray-600 font-semibold cursor-not-allowed"
                        >
                          Buy now
                        </button>
                      </>
                    ) : (
                      <>
                        <AddToCart
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          size={product.size}
                          gender={product.gender}
                          fabric={product.fabric}
                          isNew={product.isNew}
                          image={product.image}
                        />
                        <Buy product={product} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
