"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { FiMail } from "react-icons/fi";

const NewsletterModal = ({
  isOpen: initialIsOpen = false,
  onClose: originalOnClose,
}) => {
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(initialIsOpen);

  // Check if modal should be shown on home page load/reload
  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/") {
      const lastShown = localStorage.getItem("newsletterModalLastShown");
      const hasSubscribed = localStorage.getItem("hasSubscribed");

      // Show modal if:
      // 1. It's the home page
      // 2. User hasn't subscribed before
      // 3. Either:
      //    - Never shown before
      //    - Or not shown in the last 24 hours
      if (
        !hasSubscribed &&
        (!lastShown ||
          Date.now() - new Date(lastShown).getTime() > 24 * 60 * 60 * 1000)
      ) {
        setShowModal(true);
      }
    }
  }, [pathname]);

  const handleClose = () => {
    // Remember when modal was closed
    localStorage.setItem("newsletterModalLastShown", new Date().toISOString());
    setShowModal(false);
    originalOnClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      // 2. Check for existing subscription
      const { data: existingSubscriber } = await supabase
        .from("subscribers")
        .select("*")
        .eq("email", email)
        .single();

      if (existingSubscriber) {
        toast("You're already subscribed!", { icon: "✉️" });
        localStorage.setItem("hasSubscribed", "true");
        handleClose();
        return;
      }

      // 3. Check if email has an account
      const { data: userAccount } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", email)
        .single();

      // 4. Generate unique subscriber ID
      const generateSubId = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let result = "SUB-";
        for (let i = 0; i < 6; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };

      // 5. Insert new subscriber
      const { error } = await supabase.from("subscribers").insert([
        {
          sub_id: generateSubId(),
          email,
          hasAnAccount: !!userAccount,
          created_at: new Date().toISOString(),
          source: "website_modal",
        },
      ]);

      if (error) throw error;

      // 6. Success handling
      toast.success("Thank you for subscribing!");
      localStorage.setItem("hasSubscribed", "true");
      setEmail("");
      handleClose();
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Subscription failed. Please try again later.");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row animate-fade-in">
        {/* Image Column */}
        <div className="hidden md:block md:w-1/2 bg-amber-900 relative">
          <Image
            src="https://i.pinimg.com/736x/78/e2/cd/78e2cdc01f0a63dac69dfddec689984a.jpg"
            alt="African women's fashion newsletter"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-amber-900 bg-opacity-30 flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">
                Join Our Community
              </h3>
              <p className="text-amber-200 text-xl font-medium">
                Get 10% Off Your First Order
              </p>
              <p className="text-white mt-4">
                Plus exclusive access to new collections
              </p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-amber-900">
                Stay Updated
              </h2>
              <p className="text-sm text-amber-700">
                Discover the latest in African fashion
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:bg-[#7B2D26] hover:text-white p-1 rounded-full  transition"
              aria-label="Close newsletter modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Subscribe to receive exclusive offers, styling tips, and early
            access to our newest collections inspired by African heritage.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 pl-10"
                  placeholder="your@email.com"
                />
                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7B2D26] hover:bg-amber-800 text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FiMail className="inline" />
              Subscribe Now
            </button>

            <p className="text-xs text-gray-500 text-center">
              We respect your privacy. Unsubscribe at any time. By subscribing,
              you agree to our{" "}
              <a href="/privacy" className="text-amber-700 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
