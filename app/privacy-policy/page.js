import PrivacyPolicy from "./privacyPolicy";

export const metadata = {
  title: "Privacy Policy - Lolaselan",
  description:
    "Read Lolaselan's Privacy Policy to understand how we collect, use, and protect your personal information while shopping for African fashion online.",
  keywords: [
    "Privacy Policy",
    "Data Protection",
    "Lolaselan Privacy",
    "African fashion store privacy",
    "Customer data safety",
  ],
  openGraph: {
    title: "Privacy Policy - Lolaselan",
    description:
      "Learn how Lolaselan protects your personal data and ensures safe transactions while you shop for our African fashion collections.",
    url: "https://shoplolaselan.uk/privacy-policy",
    siteName: "Lolaselan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Lolaselan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Lolaselan",
    description:
      "Discover how Lolaselan ensures your privacy and protects your data while shopping our African fashion collections.",
    images: ["/lolaselan.jpg"],
  },
};

export default function Page() {
  return <PrivacyPolicy />;
}
