import FAQPage from "./faqs";

export const metadata = {
  title: "Frequently Asked Questions - LolasÈlan",
  description:
    "Find answers to the most common questions about LolasÈlan's African fashion store, orders, shipping, returns, and more.",
  keywords: [
    "FAQ",
    "Frequently Asked Questions",
    "LolasÈlan help",
    "Shipping questions",
    "Returns and refunds",
    "African fashion store",
  ],
  openGraph: {
    title: "Frequently Asked Questions - LolasÈlan",
    description:
      "Explore our FAQs to quickly find answers about orders, shipping, returns, and LolasÈlan's African fashion collections.",
    url: "https://shoplolaselan.uk/faqs",
    siteName: "LolasÈlan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "LolasÈlan FAQ",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions - LolasÈlan",
    description:
      "Check out LolasÈlan's FAQs page for answers to common questions about orders, shipping, and our African fashion products.",
    images: ["/lolaselan.jpg"],
  },
};

export default function page() {
  return <FAQPage />;
}
