import Bubu from "./bubu";

export const metadata = {
  title: "Bubu Collection - African Fashion | Lolaselan",
  description:
    "Shop elegant Bubu outfits made with high-quality African fabrics. Perfect for all occasions, blending tradition with modern style.",
  keywords: [
    "Bubu",
    "African Bubu dress",
    "African fashion",
    "Adire Bubu",
    "Women's Bubu outfit",
    "Traditional African wear",
  ],
  openGraph: {
    title: "Bubu Collection - African Fashion",
    description:
      "Discover our beautiful Bubu collection made from authentic African fabrics. Stylish, comfortable, and perfect for every event.",
    url: "https://shoplolaselan.uk/collections/bubu",
    siteName: "YourStoreName",
    images: [
      {
        url: "https://shoplolaselan.uk/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "African Bubu outfit collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return <Bubu />;
}
