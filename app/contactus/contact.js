"use client";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import ContactSection from "../_components/contactus";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-125 bg-gradient-to-r from-[#7B2D26] to-[#9C3E2D] flex items-center justify-center text-center">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#FFD8BE] mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-[#FFE9D9] max-w-2xl mx-auto">
            We&apos;d love to hear from you
          </p>
        </div>
      </section>
      <main className=" pb-16 bg-white">
        {/* Contact Info & Form */}
        <ContactSection />

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-center text-[#5C2018] mb-12">
              Find Our Store
            </h2>
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Map Embed</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
