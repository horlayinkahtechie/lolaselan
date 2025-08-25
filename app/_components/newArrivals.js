"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  FiShoppingCart,
  FiHeart,
  FiZap,
  FiUsers,
  FiLayers,
  FiTag,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Image from "next/image";
import Buy from "./buy";
import AddToCart from "./addToCart";
import AddToFavorite from "./addToFavorite";
import supabase from "@/app/lib/supabase";

export default function NewArrivals() {
  const scrollContainerRef = useRef(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("isNew", true);

        if (error) throw error;

        const shuffled = data.sort(() => 0.5 - Math.random());
        setNewArrivals(shuffled.slice(0, 8));
      } catch (err) {
        console.error("Error fetching new arrivals:", err);
        setError("Failed to load new arrivals");
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center">
              <FiZap className="mr-2 text-primary" /> New Arrivals
            </h2>
          </div>
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] px-2"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center">
              <FiZap className="mr-2 text-primary" /> New Arrivals
            </h2>
          </div>
          <div className="text-center py-8 text-gray-500">{error}</div>
        </div>
      </section>
    );
  }

  if (newArrivals.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center">
              <FiZap className="mr-2 text-primary" /> New Arrivals
            </h2>
          </div>
          <div className="text-center py-8 text-gray-500">
            No new arrivals at the moment. Check back soon!
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center">
            <FiZap className="mr-2 text-primary" /> New Arrivals
          </h2>
          <Link
            href="/collections/new-arrivals"
            className="flex items-center text-primary hover:underline"
          >
            View All <FiArrowRight className="ml-1" />
          </Link>
        </div>

        {/* Scrollable Products - Mobile & Desktop */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollPadding: "0 20%", // Creates peek effect
              scrollSnapType: "x mandatory",
            }}
          >
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] px-2 snap-start"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                    <Image
                      src={product.image[0]}
                      fill
                      alt="Product image"
                      priority
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
                        <FiLayers className="mr-1" /> {product.size}
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
        </div>

        {/* Scroll indicators (mobile) */}
        <div className="flex justify-center mt-4 md:hidden space-x-2">
          {newArrivals.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
          ))}
        </div>
      </div>
    </section>
  );
}
