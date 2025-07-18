"use client";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiFacebook,
} from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiYoutube } from "react-icons/fi";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our African fashion collections? Reach out to
            us and we&apos;ll respond as quickly as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <FiMail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Email Us</h3>
                <p className="text-gray-600">hello@lolaselan.com</p>
                <p className="text-gray-600">support@lolaselan.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <FiPhone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Call Us</h3>
                <p className="text-gray-600">+44 123 456 7890</p>
                <p className="text-gray-600">Mon-Fri: 9am-5pm GMT</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <FiMapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Visit Us</h3>
                <p className="text-gray-600">123 Fashion Avenue</p>
                <p className="text-gray-600">London, UK</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-white p-3 rounded-full shadow-sm hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={`Follow on Instagram`}
                >
                  <FiInstagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="bg-white p-3 rounded-full shadow-sm hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={`Follow on X`}
                >
                  <FiTwitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="bg-white p-3 rounded-full shadow-sm hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={`Follow on YouTube`}
                >
                  <FiYoutube className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="bg-white p-3 rounded-full shadow-sm hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={`Follow on Facebook`}
                >
                  <FiFacebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <FiSend className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We&apos;ll get back to you within
                  24 hours.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-6">
                  Send us a message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`pl-10 block w-full rounded-md border ${
                          errors.name ? "border-red-300" : "border-gray-300"
                        } shadow-sm focus:ring-primary focus:border-primary`}
                        placeholder="Jane Doe"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`pl-10 block w-full rounded-md border ${
                          errors.email ? "border-red-300" : "border-gray-300"
                        } shadow-sm focus:ring-primary focus:border-primary`}
                        placeholder="jane@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3">
                        <FiMessageSquare className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`pl-10 block w-full rounded-md border ${
                          errors.message ? "border-red-300" : "border-gray-300"
                        } shadow-sm focus:ring-primary focus:border-primary`}
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                        isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend className="mr-2" /> Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
