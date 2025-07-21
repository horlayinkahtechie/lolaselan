"use client";
import { useEffect } from "react";

export default function CollectionHero() {
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
    <section className="relative h-screen max-h-[900px] min-h-[600px] w-full bg-gradient-to-br from-[#7B2D26] via-[#9C3E2D] to-[#C0552C] overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#9C3E2D] opacity-20 animate-float"></div>
        <div className="absolute -left-40 bottom-0 w-96 h-96 rounded-full bg-[#7B2D26] opacity-15 animate-float animation-delay-2000"></div>
      </div>

      <div className="container w-full mx-auto px-4 md:px-6 relative z-10">
        {/* Centered Text Content */}
        <div className="w-full flex flex-col items-center text-center animate-on-scroll">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-[#FFD8BE] mb-4">
            Check out our collections
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-9">
            <button className="px-8 py-3 bg-[#FFB38A] hover:bg-[#FF9E6D] text-[#5C2018] rounded-full font-medium transition-all hover:scale-105 shadow-lg">
              Explore collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
