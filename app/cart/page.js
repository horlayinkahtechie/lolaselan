import Cart from "./cart";

export const metadata = {
  title: "Shopping Cart - Lolaselan",
  description:
    "View your selected items in the Lolaselan shopping cart. Easily update quantities, remove products, and proceed to secure checkout.",
  keywords: [
    "Shopping Cart",
    "Lolaselan Cart",
    "Online Shopping",
    "Checkout",
    "African Fashion",
  ],
  openGraph: {
    title: "Shopping Cart - Lolaselan",
    description:
      "Manage your selected items and prepare for checkout on Lolaselan. Convenient and secure shopping experience.",
    url: "https://shoplolaselan.uk/cart",
    siteName: "Lolaselan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "Lolaselan Shopping Cart",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopping Cart - Lolaselan",
    description:
      "Manage your selected items and prepare for checkout on Lolaselan. Convenient and secure shopping experience.",
    images: ["/lolaselan.jpg"],
  },
};

export default function Page() {
  return <Cart />;
}
