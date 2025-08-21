import AsoOkeSkirt from "./aso-oke-skirts";

export const metadata = {
  title: "Aso Oke Skirts - Traditional & Modern Styles | Lolaselan",
  description:
    "Discover our elegant Aso Oke skirts, blending tradition with modern fashion. Perfect for weddings, parties, and special occasions.",
  openGraph: {
    title: "Aso Oke Skirts - Traditional & Modern Styles | Lolaselan",
    description:
      "Elegant Aso Oke skirts for weddings, events, and stylish outings. Shop premium quality traditional fashion.",
    url: "https://shoplolaselan.uk/collections/aso-oke-skirts",
    images: [
      {
        url: "/lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "Aso Oke Skirt",
      },
    ],
  },
};

export default function Page() {
  return <AsoOkeSkirt />;
}
