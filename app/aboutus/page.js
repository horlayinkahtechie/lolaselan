import AboutPage from "./aboutus";

export const metadata = {
  title: "About Us - Lolaselan",
  description:
    "Learn more about Lolaselan, our mission, vision, and dedication to bringing authentic African fashion to the world. Discover our story and values.",
  keywords: [
    "About Lolaselan",
    "African fashion brand",
    "Our story",
    "African clothing",
    "Ethnic wear",
  ],
  openGraph: {
    title: "About Us - Lolaselan",
    description:
      "Discover Lolaselan's journey and commitment to authentic African fashion. Learn about our mission and vision.",
    url: "https://shoplolaselan.uk/aboutus",
    siteName: "Lolaselan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "About Lolaselan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Lolaselan",
    description:
      "Discover Lolaselan's journey and commitment to authentic African fashion. Learn about our mission and vision.",
    images: ["/lolaselan.jpg"],
  },
};

export default function AboutUs() {
  return <AboutPage />;
}
