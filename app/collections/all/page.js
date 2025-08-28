import AllProducts from "./all";

export const metadata = {
  title:
    "African Clothing Collections | Adire, Bubu, Ankara, Aso Oke | LolasÈlan",
  description:
    "Discover authentic African fashion collections including Adire two-piece, Bubu gowns, Ankara pants, and Aso Oke skirts. Shop premium fabrics with modern styles at YourBrand.",
  keywords: [
    "African clothes",
    "Adire two piece",
    "Bubu gown",
    "Ankara pants",
    "Aso Oke skirts",
    "African fashion",
    "traditional African wear",
    "African outfits online",
  ],
  openGraph: {
    title:
      "African Clothing Collections | Adire, Bubu, Ankara, Aso Oke | LolasÈlan",
    description:
      "Shop premium African clothing collections featuring Adire, Bubu, Ankara, and Aso Oke styles. Authentic fabrics, modern designs, and affordable prices.",
    url: "https://shoplolaselan.uk/collections",
    siteName: "YourBrand",
    images: [
      {
        url: "https://shoplolaselan.uk/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "African fashion collections - Adire, Bubu, Ankara, Aso Oke",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "African Clothing Collections | Adire, Bubu, Ankara, Aso Oke | LolasÈlan",
    description:
      "Shop authentic African fashion collections | Adire two-piece, Bubu, Ankara pants, and Aso Oke skirts. Premium fabrics, unique styles, affordable prices.",
    images: ["https://shoplolaselan.uk/lolaselan.jpg"],
  },
};

export default function Page() {
  return <AllProducts />;
}
