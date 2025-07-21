"use client";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

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
      <main className="pt-24 pb-16 bg-white">
        {/* Contact Info & Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-playfair font-bold text-[#5C2018] mb-6">
                  Get In Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#FFD8BE] p-3 rounded-full text-[#7B2D26]">
                      <FiMail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Email Us</h3>
                      <p className="text-gray-600">hello@lolaselan.com</p>
                      <p className="text-gray-600">support@lolaselan.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#FFD8BE] p-3 rounded-full text-[#7B2D26]">
                      <FiPhone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Call Us</h3>
                      <p className="text-gray-600">+44 123 456 7890</p>
                      <p className="text-gray-600">Mon-Fri: 9am-5pm GMT</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#FFD8BE] p-3 rounded-full text-[#7B2D26]">
                      <FiMapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Visit Us</h3>
                      <p className="text-gray-600">123 Fashion Avenue</p>
                      <p className="text-gray-600">London, UK</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[#FAEDCD] p-8 rounded-lg">
                <h3 className="text-2xl font-playfair font-bold text-[#5C2018] mb-6">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#9C3E2D] focus:border-[#9C3E2D]"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#9C3E2D] focus:border-[#9C3E2D]"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#9C3E2D] focus:border-[#9C3E2D]"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center bg-[#9C3E2D] hover:bg-[#7B2D26] text-white py-3 px-6 rounded-md font-medium transition-colors"
                  >
                    <FiSend className="mr-2" /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

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
