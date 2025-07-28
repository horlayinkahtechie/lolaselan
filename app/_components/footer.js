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

export default function Footer() {
  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "New Arrivals", href: "/collections/new-arrivals" },
        { name: "Best Sellers", href: "/collections/bestsellers" },
        { name: "Dresses", href: "/collections/dresses" },
        { name: "Tops", href: "/collections/tops" },
        { name: "Bottoms", href: "/collections/bottoms" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Story", href: "/aboutus" },
        { name: "Designers", href: "/designers" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Help",
      links: [
        { name: "Contact Us", href: "/contactus" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns & Exchanges", href: "/returns" },
        { name: "Size Guide", href: "/size-guide" },
        { name: "FAQs", href: "/faqs" },
      ],
    },
  ];

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
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
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
            <div className="flex items-start space-x-3">
              <FiMapPin className="mt-1 flex-shrink-0" />
              <p>123 Fashion Avenue, London, UK</p>
            </div>
            <div className="flex items-center space-x-3">
              <FiPhone />
              <p>+44 123 456 7890</p>
            </div>
            <div className="flex items-center space-x-3">
              <FiMail />
              <p>hello@lolaselan.com</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                { icon: FiInstagram, name: "Instagram" },
                { icon: FiFacebook, name: "Facebook" },
                { icon: FiTwitter, name: "Twitter" },
                { icon: FiYoutube, name: "YouTube" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
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
            &copy; {new Date().getFullYear()} Lolaselan. All rights reserved.
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
