import Profile from "./profile";

export const metadata = {
  title: "My Profile - Lolaselan",
  description:
    "Access and manage your Lolaselan account, view order history, update personal details, and manage your preferences for a seamless shopping experience.",
  keywords: [
    "Profile",
    "Account",
    "Order history",
    "Lolaselan user account",
    "Manage profile",
    "African fashion store account",
  ],
  openGraph: {
    title: "My Profile - LolasÈlan",
    description:
      "Manage your LolasÈlan account and access your order history, personal information, and preferences for a personalized shopping experience.",
    url: "https://shoplolaselan.uk/user/profile",
    siteName: "LolasÈlan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "User Profile - LolasÈlan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Profile - LolasÈlan",
    description:
      "Manage your LolasÈlan account, view your orders, and update your preferences for a better shopping experience.",
    images: ["/lolaselan.jpg"],
  },
};

export default function Page() {
  return <Profile />;
}
