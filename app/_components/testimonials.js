"use client";
import { useState, useEffect, useRef } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "The Ankara dress fits perfectly and the fabric is amazing!",
      author: "Amina K.",
      role: "Loyal Customer",
    },
    {
      quote: "I get compliments every time I wear my Lolaselan wrap!",
      author: "Ngozi O.",
      role: "Frequent Shopper",
    },
    {
      quote: "Excellent craftsmanship and authentic African designs.",
      author: "Kwame B.",
      role: "First-time Buyer",
    },
    {
      quote: "The customer service is as beautiful as the clothing.",
      author: "Fatou D.",
      role: "VIP Client",
    },
    {
      quote: "Worth every penny - the quality is exceptional.",
      author: "Tunde A.",
      role: "Satisfied Customer",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000); // Change slide every 4 seconds
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollRef.current);
    };

    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);

    startAutoScroll();
    return () => {
      stopAutoScroll();
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", startAutoScroll);
    };
  }, [testimonials.length]);

  // Scroll to current index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollToIndex = () => {
      const card = container.children[currentIndex];
      if (card) {
        container.scrollTo({
          left: card.offsetLeft - container.offsetWidth * 0.1, // Center with 10% padding
          behavior: "smooth",
        });
      }
    };

    scrollToIndex();
  }, [currentIndex]);

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">
          What Our Customers Say
        </h2>

        {/* Desktop: Static grid */}
        <div className="hidden md:grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">
                &quot;{testimonial.quote}&quot;
              </p>
              <p className="font-semibold text-primary">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>

        {/* Mobile: Auto-scrolling carousel */}
        <div className="md:hidden relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-snap-x scroll-snap-mandatory pb-6 -mx-4 px-4 scrollbar-hide"
            style={{
              scrollPadding: "0 20%", // Creates peek effect
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-[80vw] px-2">
                <div className="bg-white p-8 rounded-lg shadow-md h-full">
                  <p className="text-gray-600 italic mb-4">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <p className="font-semibold text-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
