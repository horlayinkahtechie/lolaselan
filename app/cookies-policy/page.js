import CookiesPolicy from "./cookies";

export const metadata = {
  title: "Cookies Policy - Lolaselan",
  description:
    "Learn about Lolaselan's Cookies Policy. Understand how we use cookies to enhance your browsing experience on our African fashion store.",
  keywords: [
    "Cookies Policy",
    "Lolaselan privacy",
    "Website cookies",
    "User data",
    "African fashion store",
  ],
  openGraph: {
    title: "Cookies Policy - Lolaselan",
    description:
      "Read our Cookies Policy to understand how Lolaselan uses cookies to improve your experience while browsing our African fashion collections.",
    url: "https://shoplolaselan.uk/cookies-policy",
    siteName: "Lolaselan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "Lolaselan Cookies Policy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookies Policy - Lolaselan",
    description:
      "Learn about Lolaselan's Cookies Policy and how cookies are used to enhance your experience on our African fashion store.",
    images: ["/lolaselan.jpg"],
  },
};

export default function Page() {
  return <CookiesPolicy />;
}
