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
import Buy from "@/app/_components/buy";
import AddToCart from "@/app/_components/addToCart";
import AddToFavorite from "@/app/_components/addToFavorite";

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

  const AdireTwoPiece = [
    {
      id: "ADIRETWOPIECES1",
      name: "Adire Kimono Set",
      category: "Dresses",
      price: "£89.99",
      size: "S-XXL",
      gender: "Women",
      fabric: "African Wax",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/c3/77/1e/c3771ebb3b93a903ca4a4147a484e3c7.jpg",
    },
    {
      id: "ADIRETWOPIECES2",
      name: "Adire Crop Top & Pants",
      category: "Tops",
      price: "£49.99",
      size: "M-XXXL",
      gender: "Unisex",
      fabric: "Cotton Blend",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/82/ed/97/82ed97af33e03e7258b35561fadcca49.jpg",
    },
    {
      id: "ADIRETWOPIECES3",
      name: "Adire Blouse & Wrapper",
      category: "Bottoms",
      price: "£59.99",
      size: "S-XL",
      gender: "Women",
      fabric: "African Print",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/49/21/2b/49212b6a02c10e12e6e0e986cdab94bb.jpg",
    },
    {
      id: "ADIRETWOPIECES4",
      name: "Adire Shirt & Trousers",
      category: "Tops",
      price: "£65.99",
      size: "XS-XXL",
      gender: "Men",
      fabric: "Handwoven Cotton",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/76/03/23/760323e284118c10191b5fc02c3c4258.jpg",
    },
    {
      id: "ADIRETWOPIECES5",
      name: "Adire Kaftan & Pants",
      category: "Sets",
      price: "£99.99",
      size: "M-XXL",
      gender: "Unisex",
      fabric: "Traditional Cotton",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/64/aa/10/64aa10d24b12f9a4657235b4d2a71215.jpg",
    },
  ];

  const AnkaraPants = [
    {
      id: "ANKARAPANTS1",
      name: "Ankara Palazzo Trousers",
      category: "Dresses",
      price: "£89.99",
      size: "S-XXL",
      gender: "Women",
      fabric: "African Wax",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/b3/7e/f3/b37ef3b83e5e90ca4ce8b679bc18b74a.jpg",
    },
    {
      id: "ANKARAPANTS2",
      name: "Ankara Jogger Pants",
      category: "Tops",
      price: "£49.99",
      size: "M-XXXL",
      gender: "Unisex",
      fabric: "Cotton Blend",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/bb/5a/09/bb5a0913ce1404e2a59caf62270451cd.jpg",
    },
    {
      id: "ANKARAPANTS3",
      name: "Ankara Harem Pants",
      category: "Bottoms",
      price: "£59.99",
      size: "S-XL",
      gender: "Women",
      fabric: "African Print",
      isNew: false,
      image:
        "https://i.pinimg.com/736x/28/4b/58/284b58c96d7b7a76cfdab83ddfe5d684.jpg",
    },
    {
      id: "ANKARAPANTS4",
      name: "Ankara Slim-Fit Trousers",
      category: "Tops",
      price: "£65.99",
      size: "XS-XXL",
      gender: "Men",
      fabric: "Handwoven Cotton",
      isNew: false,
      image:
        "https://i.pinimg.com/1200x/3f/e3/e7/3fe3e74bd2ee3226713a35bb7d11c474.jpg",
    },
    {
      id: "ANKARAPANTS5",
      name: "Ankara Cargo Pants",
      category: "Sets",
      price: "£99.99",
      size: "M-XXL",
      gender: "Unisex",
      fabric: "Traditional Cotton",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/cd/61/0e/cd610e7cdb98197ead5a0f833a3de8c4.jpg",
    },
  ];

  const asoOkeskirt = [
    {
      id: "ASOOKESKIRT1",
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
      id: "ASOOKESKIRT2",
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
      id: "ASOOKESKIRT3",
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
      id: "ASOOKESKIRT4",
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
      id: "ASOOKESKIRT5",
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

  const bubu = [
    {
      id: "BUBU1",
      name: "Classic Bubu Gown",
      category: "Dresses",
      price: "£89.99",
      size: "S-XXL",
      gender: "Women",
      fabric: "African Wax",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/e0/13/fb/e013fbbe4a19429f2e6a7990c157c12f.jpg",
    },
    {
      id: "BUBU2",
      name: "Modern Bubu Kaftan",
      category: "Tops",
      price: "£49.99",
      size: "M-XXXL",
      gender: "Unisex",
      fabric: "Cotton Blend",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/cc/9d/46/cc9d461520fc2e107f5c0e45746c028e.jpg",
    },
    {
      id: "BUBU3",
      name: "Embroidered Bubu Dress",
      category: "Bottoms",
      price: "£59.99",
      size: "S-XL",
      gender: "Women",
      fabric: "African Print",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/b8/7d/dd/b87dddc68edd2f88e2a318d1b124d649.jpg",
    },
    {
      id: "BUBU4",
      name: "Chiffon Bubu Gown",
      category: "Tops",
      price: "£65.99",
      size: "XS-XXL",
      gender: "Men",
      fabric: "Handwoven Cotton",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/ab/bc/3d/abbc3d29b2d4558139fad75df92c322a.jpg",
    },
    {
      id: "BUBU5",
      name: "Silk Bubu Outfit",
      category: "Sets",
      price: "£99.99",
      size: "M-XXL",
      gender: "Unisex",
      fabric: "Traditional Cotton",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/ac/8e/eb/ac8eeb20f54517854c95759485e958b2.jpg",
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
      <section className="py-12 bg-gray-50 lg:pt-40 pt-40">
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
                        src={product.image}
                        fill
                        alt={product.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-white bg-[#7B2D26]  text-xs font-bold px-2 py-1 rounded-full">
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
                        <AddToCart
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
                        <Buy product={product} />
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
            <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center">
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
              {AdireTwoPiece.map((product) => (
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
                        alt={product.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-white bg-[#7B2D26]  text-xs font-bold px-2 py-1 rounded-full">
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
                        <AddToCart
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
                        <Buy product={product} />
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
            <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center">
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
              {AnkaraPants.map((product) => (
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
                        alt={product.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-white bg-[#7B2D26]  text-xs font-bold px-2 py-1 rounded-full">
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
                        <AddToCart
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
                        <Buy product={product} />
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
            <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center">
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
              {asoOkeskirt.map((product) => (
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
                        alt={product.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-white bg-[#7B2D26]  text-xs font-bold px-2 py-1 rounded-full">
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
                        <AddToCart
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
                        <Buy product={product} />
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
            <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center">
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
              {bubu.map((product) => (
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
                        alt={product.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-primary text-white bg-[#7B2D26]  text-xs font-bold px-2 py-1 rounded-full">
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
                        <AddToCart
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
                        <Buy product={product} />
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
