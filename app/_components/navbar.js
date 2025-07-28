"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cinzel_Decorative } from "next/font/google";
import { FiMail } from "react-icons/fi";
import NewsletterModal from "./subscriptionModal";
import { useSession } from "next-auth/react";
import CartCount from "./cartCount";

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  const clickShowModal = () => {
    setShowModal(true);
    console.log("Modal opened");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Shop", path: "/collections/all" },
    { name: "About", path: "/aboutus" },
    { name: "Contact", path: "/contactus" },
    {
      name: session ? "Logout" : "Login",
      path: session ? "/api/auth/signout" : "/user/login",
    },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all bg-[#7B2D26]  duration-300 ${
        scrolled ? "bg-[#7B2D26] shadow-md py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 p-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <span
              className={`text-2xl font-bold text-[#FFD8BE] ${cinzelDecorative.className}`}
            >
              LolasÈlan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-lg font-medium transition-colors cursor-pointer ${
                  router.pathname === link.path
                    ? "text-[#FFB38A] border-b-2 border-[#FFB38A]"
                    : "text-[#FFE9D9] hover:text-[#FFB38A]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Icons and Menu Button */}
          <div className="flex items-center space-x-4 md:space-x-0">
            {/* Mobile Cart and Profile (visible on mobile) */}
            <div className="md:hidden flex items-center space-x-4">
              <CartCount />

              <Link
                href="/user/profile"
                className="p-2 text-[#FFE9D9] hover:text-[#FFB38A] cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
              <button
                className="p-2 text-[#FFE9D9] hover:text-[#FFB38A] cursor-pointer"
                onClick={clickShowModal}
              >
                <FiMail className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[#FFE9D9] hover:text-[#FFB38A] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Desktop Cart and Profile (hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-4 ml-8">
              <CartCount />
              <Link
                href="/user/profile"
                className="p-2 text-[#FFE9D9] hover:text-[#FFB38A] cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
              <button
                className="p-2 text-[#FFE9D9] hover:text-[#FFB38A] cursor-pointer"
                onClick={clickShowModal}
              >
                <FiMail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <div
            className={`fixed inset-0 bg-[#7B2D26] z-40 transition-all duration-300 ease-in-out ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
            style={{
              top: scrolled ? "64px" : "80px",
              display: isOpen ? "block" : "none",
            }}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`text-2xl font-medium py-3 ${
                      router.pathname === link.path
                        ? "text-[#FFB38A]"
                        : "text-[#FFE9D9] hover:text-[#FFB38A]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <NewsletterModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </header>
  );
}
