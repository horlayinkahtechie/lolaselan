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
import Buy from "@/app/_components/buy";
import AddToCart from "@/app/_components/addToCart";
import AddToFavorite from "@/app/_components/addToFavorite";
import supabase from "@/app/lib/supabase";

export default function AllProducts() {
  const scrollContainerRef = useRef(null);
  const [products, setProducts] = useState({
    twoPiece: [],
    pants: [],
    dresses: [],
    bubu: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);

        // Fetch all product categories in parallel
        const [
          { data: twoPiece },
          { data: pants },
          { data: dresses },
          { data: bubu },
        ] = await Promise.all([
          supabase
            .from("products")
            .select("*")
            .ilike("id", "%TWOPIECES%")
            .order("created_at", { ascending: false }),

          supabase
            .from("products")
            .select("*")
            .ilike("id", "%PANT%")
            .order("created_at", { ascending: false }),
          supabase
            .from("products")
            .select("*")
            .ilike("id", "%DRESSES%")
            .order("created_at", { ascending: false }),
          supabase
            .from("products")
            .select("*")
            .ilike("id", "%BUBU%")
            .order("created_at", { ascending: false }),
        ]);

        setProducts({
          twoPiece: twoPiece || [],
          pants: pants || [],
          dresses: dresses || [],
          bubu: bubu || [],
        });
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const renderProductSection = (title, products, collectionName) => {
    if (loading) {
      return (
        <div className="flex space-x-4 overflow-hidden py-12">
          {[...Array(4)].map((_, i) => (
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
      );
    }

    if (error) {
      return <div className="py-12 text-center text-red-500">{error}</div>;
    }

    if (products.length === 0) {
      return (
        <div className="py-12 text-center text-gray-500">
          No {title.toLowerCase()} found
        </div>
      );
    }

    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center ">
              <FiZap className="mr-2 text-primary" /> {title}
            </h2>
            <Link
              href={`/collections/${collectionName}`}
              className="flex items-center text-primary hover:underline"
            >
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>
          {products.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No {title.toLowerCase()} found
            </div>
          ) : (
            <>
              <div className="relative">
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

                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
                  style={{
                    scrollPadding: "0 20%",
                    scrollSnapType: "x mandatory",
                  }}
                >
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] px-2 snap-start"
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                          <Image
                            src={product.image[0]}
                            fill
                            alt={product.name}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {product.isNew && (
                            <div className="absolute top-2 left-2 bg-primary text-white bg-[#7B2D26] text-xs font-bold px-2 py-1 rounded-full">
                              NEW
                            </div>
                          )}
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
              </div>

              <div className="flex justify-center mt-4 md:hidden space-x-2">
                {products.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-300"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    );
  };

  return (
    <>
      {renderProductSection("Two Piece", products.twoPiece, "two-piece")}
      {renderProductSection("Pants", products.pants, "pants")}
      {renderProductSection("Dresses", products.dresses, "dresses")}
      {renderProductSection("Bubu", products.bubu, "bubu")}
    </>
  );
}
