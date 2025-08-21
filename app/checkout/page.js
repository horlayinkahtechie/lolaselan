import CheckoutPage from "./checkout";
import { Suspense } from "react";

export const metadata = {
  title: "Checkout - Complete Your Order | Lolaselan",
  description:
    "Securely complete your order on Lolaselan. Review your products, provide shipping details, and pay safely online.",
  keywords: [
    "Checkout",
    "Online Shopping",
    "Secure Payment",
    "Lolaselan",
    "Order Summary",
  ],
  openGraph: {
    title: "Checkout - Complete Your Order | Lolaselan",
    description:
      "Finalize your purchase securely on Lolaselan. Easy checkout process and multiple payment options available.",
    url: "https://shoplolaselan.uk/checkout",
    siteName: "Lolaselan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "Checkout Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout - Complete Your Order | Lolaselan",
    description:
      "Securely complete your order on Lolaselan. Review your products, provide shipping details, and pay safely online.",
    images: ["/lolaselan.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense>
      <CheckoutPage />
    </Suspense>
  );
}
