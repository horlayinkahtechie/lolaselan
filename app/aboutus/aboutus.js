"use client";
import { FiUsers, FiAward, FiMapPin, FiHeart } from "react-icons/fi";

export default function AboutPage() {
  return (
    <>
      <section className="relative h-125 bg-gradient-to-r from-[#7B2D26] to-[#9C3E2D] flex items-center justify-center text-center">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#FFD8BE] mb-4">
            Our Story
          </h1>
          <p className="text-xl text-[#FFE9D9] max-w-2xl mx-auto">
            Celebrating African heritage through contemporary fashion
          </p>
        </div>
      </section>
      <main className="pt-24 pb-16">
        {/* Hero Section */}

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-playfair font-bold text-[#5C2018] mb-6">
                  Who We Are
                </h2>
                <p className="text-gray-700 mb-6">
                  Founded in 2025, LolasÈlan is a premium African fashion brand
                  that bridges traditional craftsmanship with modern design.
                  We&apos;re passionate about showcasing the rich textile
                  heritage of Africa while creating wearable art for the global
                  citizen.
                </p>
                <p className="text-gray-700">
                  Our pieces are handcrafted by skilled artisans across Africa,
                  using ethically sourced materials and sustainable practices.
                </p>
              </div>
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Founder&apos;s Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-[#FAEDCD]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-center text-[#5C2018] mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FiHeart className="w-8 h-8 text-[#9C3E2D]" />,
                  title: "Authenticity",
                  description:
                    "True to African heritage in every stitch and pattern",
                },
                {
                  icon: <FiUsers className="w-8 h-8 text-[#9C3E2D]" />,
                  title: "Community",
                  description: "Supporting artisan communities across Africa",
                },
                {
                  icon: <FiAward className="w-8 h-8 text-[#9C3E2D]" />,
                  title: "Quality",
                  description: "Exceptional craftsmanship in every garment",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-sm text-center"
                >
                  <div className="flex justify-center text-4xl mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#5C2018] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-center text-[#5C2018] mb-12">
              Meet The Team
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Lola Selan",
                  role: "Founder & Creative Director",
                  image: "/team-lola.jpg",
                },
                {
                  name: "Alao Abdulsalam",
                  role: "Developer",
                  image: "/team-amina.jpg",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 h-64 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-400">Team Member Photo</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#5C2018]">
                    {member.name}
                  </h3>
                  <p className="text-[#9C3E2D]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
