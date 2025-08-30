"use client";
import { useRef } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";

export default function FeaturedCollections() {
  const scrollContainerRef = useRef(null);
  const collections = [
    {
      title: "Ankara pants",
      image:
        "https://i.pinimg.com/736x/a1/98/6c/a1986c697e8ad173c4591df9dac2deae.jpg",
      link: "/collections/ankara-pants",
    },
    {
      title: "Adire two piece",
      image:
        "https://i.pinimg.com/1200x/1f/79/68/1f79682c09b6e53f8869a24d1f7ec710.jpg",
      link: "/collections/adire-two-piece",
    },

    {
      title: "Bubu",
      image:
        "https://i.pinimg.com/1200x/8b/7d/70/8b7d701835f4a5b1bd3d883a1ac1b520.jpg",
      link: "/collections/bubu",
    },
    {
      title: "Aso oke skirt",
      image:
        "https://i.pinimg.com/736x/a7/2f/71/a72f714d7fe36fafac72a61ee1c769f1.jpg",
      link: "/collections/aso-oke-skirts",
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">
          Our Signature Collections
        </h2>

        {/* Scrollable Container for All Devices */}
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
              scrollPadding: "0 20%",
              scrollSnapType: "x mandatory",
            }}
          >
            {collections.map((collection, index) => (
              <div
                key={index}
                className={`flex-shrink-0 ${
                  // Responsive widths
                  index === collections.length - 1 ? "pr-4" : "" // Add padding to last item
                } ${
                  // Different widths for different breakpoints
                  "w-[80vw] md:w-[45vw] lg:w-[30vw] xl:w-[23vw]"
                } px-2 snap-start`}
              >
                <Link href={collection.link}>
                  <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="aspect-[4/5] bg-gray-100 relative flex items-center justify-center overflow-hidden">
                      <Image
                        src={collection.image}
                        fill // This makes the image fill the container
                        alt={collection.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <h3 className="absolute bottom-6 left-6 text-2xl font-playfair text-white group-hover:text-primary transition-colors z-10">
                        {collection.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {collections.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-primary transition-colors"
              aria-label={`Go to collection ${index + 1}`}
              onClick={() => {
                scrollContainerRef.current?.scrollTo({
                  left: index * (window.innerWidth * 0.8),
                  behavior: "smooth",
                });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
