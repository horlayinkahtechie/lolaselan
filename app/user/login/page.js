import Login from "./login";

export const metadata = {
  title: "Login - Lolaselan",
  description:
    "Log in to your Lolaselan account to access your profile, order history, and personalized shopping experience on our African fashion store.",
  keywords: [
    "Login",
    "Sign in",
    "Lolaselan account",
    "African fashion store login",
    "User account access",
  ],
  openGraph: {
    title: "Login - Lolaselan",
    description:
      "Access your Lolaselan account and enjoy a personalized shopping experience, view orders, and manage your profile.",
    url: "https://shoplolaselan.uk/user/login",
    siteName: "Lolaselan",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "Login to Lolaselan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login - Lolaselan",
    description:
      "Log in to your Lolaselan account for a seamless African fashion shopping experience.",
    images: ["/lolaselan.jpg"],
  },
};

export default function Page() {
  return <Login />;
}
