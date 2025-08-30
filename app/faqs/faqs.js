"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState({
    category: null,
    index: null,
  });

  const toggleAccordion = (category, index) => {
    setActiveIndex((prev) => ({
      category,
      index: prev.category === category && prev.index === index ? null : index,
    }));
  };

  const isActive = (category, index) => {
    return activeIndex.category === category && activeIndex.index === index;
  };

  const ordersAndPaymentFaqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse our collection, select your items, add them to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your order. You can also Buy now if you only want to buy one item, that way you don't need to Add to cart.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Klarna. All transactions are securely processed.",
    },
    {
      question: "Can I cancel or change my order after placing it?",
      answer:
        "We begin processing orders as soon as possible, so we're unable to guarantee changes or cancellations once your order is placed. If you need help, please contact us at contact@shoplolaselan.uk as soon as possible, and we'll do our best to assist.",
    },
  ];

  const shippingFaqs = [
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide! International shipping rates and delivery times vary by country and will be calculated at checkout. Please note: International orders may be subject to customs duties, taxes, and import fees, which are the responsibility of the buyer. These charges are determined by your country's customs office and are not included in the purchase or shipping cost",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping: 2-4 working days on orders processed before 12pm GMT. Next Day shipping typically take 1-2 working days on orders processed before 12pm GMT, depending on the destination and customs processing times. USA & Canada: 5-7 working days on orders processed before 12pm GMT ",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website.",
    },
  ];

  const returnAndExchanges = [
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we do offer refunds given that the refund is initiated within 14 days.",
    },
    {
      question: "How do I return an Item?",
      answer:
        "For return requests, contact us via email at contact@shoplolaselan.uk within 14 days of receiving your order. Returned items must be in their original condition; unworn, unwashed, and with all tags attached. All returns will undergo a thorough inspection before a brand voucher is issued. Please note: The buyer is responsible for the return shipping cost. ",
    },
    {
      question: "Can I exchange an item for a different color?",
      answer:
        "Exchanges depend on availability. If you'd like to request one, please contact us via email at contact@shoplolaselan.uk within 14 days of receiving your item. If the item is in stock, we'll help you exchange it, otherwise, we'll issue a brand voucher. ",
    },
    {
      question: "What if I received a faulty or incorrect item?",
      answer:
        "We're really sorry! Please contact us right away with your order number and a photo of the issue, and we'll make it right as quickly as possible",
    },
  ];

  const sizesAndPreOrder = [
    {
      question: "How do I know what size to order?",
      answer:
        "Please refer to our Size Guide for detailed measurements and fit information.",
    },
    {
      question: "What if my size is not available?",
      answer:
        "We understand how important sizing is! Some sizes may be temporarily out of stock as we're launching in small, carefully managed batches. But the good news: you can still pre-order any item that's sold out in your size. We'll have it made just for you and shipped out, please allow up to 14 working days for your pre-order to be delivered to you.",
    },
    {
      question: "How do I know what's in stock or what's on pre-order?",
      answer:
        "You will see Available if it's in stock and Pre-order if it is on pre-order.",
    },
  ];

  const contactFaq = [
    {
      question: "How can I contact customer service?",
      answer:
        "Our customer service team is available 24/7 via email at contact@shoplolaselan.uk",
    },
  ];

  const renderFaqSection = (category, faqs, title) => (
    <div className="space-y-4 mt-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      {faqs.map((faq, index) => (
        <div
          key={`${category}-${index}`}
          className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
        >
          <button
            className={`w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none ${
              isActive(category, index)
                ? "bg-[#5E2BFF] text-white"
                : "text-gray-900"
            }`}
            onClick={() => toggleAccordion(category, index)}
          >
            <span className="font-medium text-lg">{faq.question}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isActive(category, index)
                  ? "transform rotate-180 text-white"
                  : "text-gray-500"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`px-6 overflow-hidden transition-all duration-300 ${
              isActive(category, index) ? "max-h-96 py-4" : "max-h-0 py-0"
            }`}
          >
            <p className="text-gray-600 pb-4">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-27">
      <Head>
        <title>FAQs - LolasÈlan</title>
        <meta
          name="description"
          content="Frequently asked questions about our products and services"
        />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16 lg:py-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping,
            returns, and more.
          </p>
        </div>

        {renderFaqSection("orders", ordersAndPaymentFaqs, "Orders & Payments")}
        {renderFaqSection("shipping", shippingFaqs, "Shipping")}
        {renderFaqSection("returns", returnAndExchanges, "Return & Exchanges")}
        {renderFaqSection("sizes", sizesAndPreOrder, "Sizes & Preorder")}
        {renderFaqSection("contact", contactFaq, "Contact")}

        <div className="mt-16 bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Message{" "}
            <b>contact@shoplolaselan.uk</b> team is happy to help with any
            questions you may have.
          </p>
          <Link
            href="/contactus"
            className="px-6 py-3 bg-[#5E2BFF] text-white rounded-lg hover:bg-[#4a1fd1] transition-colors duration-200 font-medium"
          >
            Contact Support
          </Link>
        </div>
      </main>
    </div>
  );
}
