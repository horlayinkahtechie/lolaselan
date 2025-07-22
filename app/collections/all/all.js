"use client";
import { useRef } from "react";
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

export default function AllProducts() {
  const scrollContainerRef = useRef(null);
  const newArrivals = [
    {
      id: 1,
      name: "Ankara Maxi Dress",
      category: "Dresses",
      price: "£89.99",
      size: "S-XXL",
      gender: "Women",
      fabric: "African Wax",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/78/e2/cd/78e2cdc01f0a63dac69dfddec689984a.jpg",
    },
    {
      id: 2,
      name: "Kente Print Shirt",
      category: "Tops",
      price: "£49.99",
      size: "M-XXXL",
      gender: "Unisex",
      fabric: "Cotton Blend",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/4d/ac/53/4dac537396c816aab49bf1e4cab1b3ad.jpg",
    },
    {
      id: 3,
      name: "Adire Wrap Skirt",
      category: "Bottoms",
      price: "£59.99",
      size: "S-XL",
      gender: "Women",
      fabric: "African Print",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/8a/f5/dd/8af5ddfbab8aaf49b7910bd3cc174890.jpg",
    },
    {
      id: 4,
      name: "Dashiki Tunic",
      category: "Tops",
      price: "£65.99",
      size: "XS-XXL",
      gender: "Men",
      fabric: "Handwoven Cotton",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/c5/ae/bf/c5aebf46bf446dba75b41f919f1700fb.jpg",
    },
    {
      id: 5,
      name: "Buba and Sokoto Set",
      category: "Sets",
      price: "£99.99",
      size: "M-XXL",
      gender: "Unisex",
      fabric: "Traditional Cotton",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/5c/11/e5/5c11e5ce1c31bf811cc90393a9d11432.jpg",
    },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="py-12 bg-gray-50 lg:pt-40">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-playfair font-bold flex items-center">
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
                        src={product.image}
                        fill
                        alt={product.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <FiHeart className="text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <span className="font-bold text-primary">
                          {product.price}
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
                        <button className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-2 px-3 rounded text-sm transition-colors">
                          <FiShoppingCart className="mr-2" /> Add
                        </button>
                        <button className="border border-primary text-primary hover:bg-black cursor-pointer hover:text-white py-2 px-3 rounded text-sm transition-colors">
                          Buy Now
                        </button>
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

      <section className="py-12 bg-gray-50 lg:pt-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-playfair font-bold flex items-center">
              <FiZap className="mr-2 text-primary" /> Adire two piece
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
                        src={product.image}
                        fill
                        alt={product.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <FiHeart className="text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <span className="font-bold text-primary">
                          {product.price}
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
                        <button className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-2 px-3 rounded text-sm transition-colors">
                          <FiShoppingCart className="mr-2" /> Add
                        </button>
                        <button className="border border-primary text-primary hover:bg-black cursor-pointer hover:text-white py-2 px-3 rounded text-sm transition-colors">
                          Buy Now
                        </button>
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

      <section className="py-12 bg-gray-50 lg:pt-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-playfair font-bold flex items-center">
              <FiZap className="mr-2 text-primary" /> Ankara Pants
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
                        src={product.image}
                        fill
                        alt={product.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <FiHeart className="text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <span className="font-bold text-primary">
                          {product.price}
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
                        <button className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-2 px-3 rounded text-sm transition-colors">
                          <FiShoppingCart className="mr-2" /> Add
                        </button>
                        <button className="border border-primary text-primary hover:bg-black cursor-pointer hover:text-white py-2 px-3 rounded text-sm transition-colors">
                          Buy Now
                        </button>
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

      <section className="py-12 bg-gray-50 lg:pt-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-playfair font-bold flex items-center">
              <FiZap className="mr-2 text-primary" /> Aso oke skirts
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
                        src={product.image}
                        fill
                        alt={product.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <FiHeart className="text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <span className="font-bold text-primary">
                          {product.price}
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
                        <button className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-2 px-3 rounded text-sm transition-colors">
                          <FiShoppingCart className="mr-2" /> Add
                        </button>
                        <button className="border border-primary text-primary hover:bg-black cursor-pointer hover:text-white py-2 px-3 rounded text-sm transition-colors">
                          Buy Now
                        </button>
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

      <section className="py-12 bg-gray-50 lg:pt-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-playfair font-bold flex items-center">
              <FiZap className="mr-2 text-primary" /> Bubu
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
                        src={product.image}
                        fill
                        alt={product.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <FiHeart className="text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <span className="font-bold text-primary">
                          {product.price}
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
                        <button className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-2 px-3 rounded text-sm transition-colors">
                          <FiShoppingCart className="mr-2" /> Add
                        </button>
                        <button className="border border-primary text-primary hover:bg-black cursor-pointer hover:text-white py-2 px-3 rounded text-sm transition-colors">
                          Buy Now
                        </button>
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
    </>
  );
}
