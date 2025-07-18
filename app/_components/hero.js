"use client";
import { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section className="relative h-screen max-h-[900px] min-h-[600px] bg-gradient-to-br from-[#FAEDCD] to-[#FEFAE0] overflow-hidden flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#D4A373] opacity-20 animate-float"></div>
        <div className="absolute -left-40 bottom-0 w-96 h-96 rounded-full bg-[#6C584C] opacity-10 animate-float animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-60 lg:mt-0 relative z-10 flex flex-col md:flex-row items-center">
        {/* Text content */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-8 animate-on-scroll">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-gray-800 mb-4">
            Elegant <span className="text-[#D4A373]">African</span> Fashion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
            Discover premium African-inspired clothing that celebrates culture
            with contemporary style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-[#D4A373] hover:bg-[#C19260] text-white rounded-full font-medium transition-all hover:scale-105 shadow-lg">
              Shop Collection
            </button>
            <button className="px-8 py-3 border-2 border-[#6C584C] text-[#6C584C] hover:bg-[#6C584C] hover:text-white rounded-full font-medium transition-all">
              Explore Styles
            </button>
          </div>
        </div>

        {/* Image placeholder */}
        <div className="w-full md:w-1/2 animate-on-scroll animation-delay-200">
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-2xl bg-gradient-to-r from-[#D4A373] to-[#6C584C] flex items-center justify-center text-white text-xl font-bold">
            Featured Collection Image
          </div>
        </div>
      </div>
    </section>
  );
}
