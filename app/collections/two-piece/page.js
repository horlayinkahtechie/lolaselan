import AdireTwoPiece from "./adire-two-piece";

export const metadata = {
  title: "Adire Two Piece - Stylish & Comfortable | LolasÈlan",
  description:
    "Shop our Adire two-piece outfits made with authentic tie-dye fabric. Perfect blend of comfort, culture, and style.",
  openGraph: {
    title: "Adire Two Piece - Stylish & Comfortable | LolasÈlan",
    description:
      "Authentic Adire two-piece sets for modern and traditional looks. Perfect for casual and special occasions.",
    url: "https://shoplolaselan.uk/collections/adire-two-piece",
    images: [
      {
        url: "lolaselan.jpg",
        width: 1200,
        height: 630,
        alt: "Adire Two Piece",
      },
    ],
  },
};

export default function Page() {
  return <AdireTwoPiece />;
}
