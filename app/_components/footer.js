import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "New Arrivals", href: "/collections/new-arrivals" },
        { name: "Bubu", href: "/collections/bubu" },
        { name: "Collections", href: "/collections/collections" },
        { name: "Adire two pieces", href: "/collections/adire-two-piece" },
        { name: "Aso Oke", href: "/collections/aso-oke-skirts" },
        { name: "Pants", href: "/collections/pants" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Story", href: "/aboutus" },
        { name: "Developers", href: "https://abdulsalamalao.com" },
      ],
    },
    {
      title: "Help",
      links: [
        { name: "Contact Us", href: "/contactus" },
        { name: "Shipping Info", href: "/shipping-info" },
        { name: "Returns & Exchanges", href: "/return-and-exchanges" },
        { name: "Size Guide", href: "/size-guidelines" },
        { name: "FAQs", href: "/faqs" },
      ],
    },
  ];
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Check if email is valid
      if (!email || !email.includes("@")) {
        toast.error("Please enter a valid email address");
        return;
      }

      // 2. Check if user already exists in subscribers
      const { data: existingSubscriber, error: subError } = await supabase
        .from("subscribers")
        .select("*")
        .eq("email", email)
        .single();

      if (existingSubscriber) {
        toast.info("You are already subscribed!");
        return;
      }

      // 3. Check if email has an account in users table
      const { data: userAccount, error: userError } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", email)
        .single();

      const hasAnAccount = !!userAccount;

      // 4. Generate unique subscriber ID
      const generateSubId = () => {
        const prefix = "SUB";
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const timestamp = Date.now().toString().slice(-4);
        return `${prefix}-${randomNum}-${timestamp}`;
      };

      const sub_id = generateSubId();

      // 5. Insert into subscribers table
      const { error: insertError } = await supabase.from("subscribers").insert([
        {
          sub_id,
          email,
          hasAnAccount,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;

      // 6. Success handling
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error(`Subscription failed: ${error.message}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section - Newsletter & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Stay Connected
            </h3>
            <p className="text-gray-300 mb-6">
              Subscribe to get updates on new arrivals, special offers, and
              styling inspiration.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 rounded border-1 text-white border-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-3 cursor-pointer rounded font-medium transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-lg font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section - Contact & Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="flex items-center space-x-3">
              <FiPhone />
              <p>+44 7401 439 257</p>
            </div>
            <div className="flex items-center space-x-3">
              <FiMail />
              <p>contact@shoplolaselan.uk</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                {
                  icon: FiInstagram,
                  name: "Instagram",
                  link: "https://www.instagram.com/lolaselan?igsh=MXRpamw3bHFnMmY5eA%3D%3D&utm_source=qr",
                },

                {
                  icon: FaTiktok,
                  name: "TikTok",
                  link: "https://www.tiktok.com/@lolaselan?_t=ZN-8yxc22lltuA&_r=1",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  aria-label={social.name}
                  className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-3">We Accept</h4>
              <div className="flex flex-wrap gap-3">
                {["Visa", "Mastercard", "PayPal", "Klarna"].map((method) => (
                  <div
                    key={method}
                    className="bg-gray-800 px-3 py-2 rounded text-sm"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} LolasÈlan. All rights reserved.
            Designed and Developed by{" "}
            <span>
              <Link href="https://abdulsalamalao.com" className="underline">
                Abdul-salam
              </Link>
            </span>
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies-policy"
              className="hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
