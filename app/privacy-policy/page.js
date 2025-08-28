import PrivacyPolicy from "./privacyPolicy";

export const metadata = {
  title: "Privacy Policy - LolasÈlan",
  description:
    "Read LolasÈlan's Privacy Policy to understand how we collect, use, and protect your personal information while shopping for African fashion online.",
  keywords: [
    "Privacy Policy",
    "Data Protection",
    "LolasÈlan Privacy",
    "African fashion store privacy",
    "Customer data safety",
  ],
  openGraph: {
    title: "Privacy Policy - LolasÈlan",
    description:
      "Learn how LolasÈlan protects your personal data and ensures safe transactions while you shop for our African fashion collections.",
    url: "https://shoplolaselan.uk/privacy-policy",
    siteName: "LolasÈlan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - LolasÈlan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - LolasÈlan",
    description:
      "Discover how LolasÈlan ensures your privacy and protects your data while shopping our African fashion collections.",
    images: ["/lolaselan.jpg"],
  },
};

export default function Page() {
  return <PrivacyPolicy />;
}
