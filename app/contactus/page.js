import ContactPage from "./contact";

export const metadata = {
  title: "Contact Us - Lolaselan",
  description:
    "Get in touch with Lolaselan. Reach out for inquiries, support, or collaborations related to authentic African fashion.",
  keywords: [
    "Contact Lolaselan",
    "African fashion support",
    "Customer service",
    "Inquiries",
    "Collaborations",
  ],
  openGraph: {
    title: "Contact Us - Lolaselan",
    description:
      "Reach out to Lolaselan for inquiries, support, or collaborations. We're here to assist you with our African fashion collections.",
    url: "https://shoplolaselan.uk/contact",
    siteName: "Lolaselan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Lolaselan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Lolaselan",
    description:
      "Reach out to Lolaselan for inquiries, support, or collaborations. We're here to assist you with our African fashion collections.",
    images: ["/lolaselan.jpg"],
  },
};

export default function ContactUs() {
  return <ContactPage />;
}
