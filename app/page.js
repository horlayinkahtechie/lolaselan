import Index from "./_components/index";

export const metadata = {
  title: "Lolaselan | African Women Clothing Store",
  description:
    "Discover Lolaselan – your destination for elegant African women's clothing. Shop asoebi, ankara, lace, and modern African fashion designed to celebrate beauty and culture.",
  keywords: [
    "African clothing store",
    "African fashion",
    "women clothing",
    "asoebi dresses",
    "ankara styles",
    "lace gowns",
    "Lolaselan",
    "African outfits for women",
    "African fashion store",
    "African wear online",
    "African boutique",
    "African traditional wear",
    "Nigerian fashion",
    "African dresses",
    "African women's fashion brand",
    "Bubu",
    "Adire two piece",
  ],
  authors: [{ name: "Lolaselan", url: "https://shoplolaselan.uk" }],
  creator: "Lolaselan",
  publisher: "Lolaselan",
  metadataBase: new URL("https://shoplolaselan.uk"),
  openGraph: {
    title: "Lolaselan | African Women Clothing Store",
    description:
      "Shop stylish African clothing for women. Explore asoebi, ankara, bubu, adire two piece and custom African fashion at Lolaselan.",
    url: "https://shoplolaselan.uk",
    siteName: "Lolaselan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1000,
        height: 630,
        alt: "Lolaselan African Fashion Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lolaselan | African Women Clothing Store",
    description:
      "Elevate your wardrobe with African fashion. Shop asoebi, bubu, adire two piece, ankara, lace and more from Lolaselan.",
    images: ["/lolaselan.jpg"],
    // creator: "@lolaselan", // replace with your store’s Twitter handle if available
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxVideoPreview: -1,
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  },
  alternates: {
    canonical: "https://shoplolaselan.uk",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function Home() {
  return (
    <>
      <Index />
    </>
  );
}
