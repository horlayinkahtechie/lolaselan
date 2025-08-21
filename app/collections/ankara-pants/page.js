import AnkaraPants from "./ankarapants";

export const metadata = {
  title: "Ankara Pants - Bold & Unique Styles | Lolaselan",
  description:
    "Step out in style with our Ankara pants collection. Bold prints, unique designs, and high-quality tailoring.",
  openGraph: {
    title: "Ankara Pants - Bold & Unique Styles | Lolaselan",
    description:
      "Shop vibrant Ankara pants for fashion-forward looks. Perfect for events, casual wear, and making bold statements.",
    url: "https://shoplolaselan.uk/collections/ankarapants",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "Ankara Pants",
      },
    ],
  },
};

export default function Page() {
  return <AnkaraPants />;
}
