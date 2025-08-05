import AddToCart from "@/app/_components/addToCart";
import AddToFavorite from "@/app/_components/addToFavorite";
import Buy from "@/app/_components/buy";
import Image from "next/image";
import {
  FiHeart,
  FiLayers,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiZap,
} from "react-icons/fi";

export default function AsoOkeSkirt() {
  const asoOkeskirt = [
    {
      id: "ASOOKESKIRT1",
      name: "Royal Aso Oke Pleated Skirt",
      category: "Bottoms",
      price: 119.99,
      size: ["S", "M", "L", "XL", "XXL"],
      gender: "Women",
      fabric: "Handwoven Aso Oke",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/29/89/e5/2989e5c9398c1295d0b5f5beb290037b.jpg",
    },
    {
      id: "ASOOKESKIRT2",
      name: "Luxury Aso Oke High-Waist Skirt",
      category: "Bottoms",
      price: 139.99,
      size: ["S", "M", "L", "XL", "XXL"],
      gender: "Women",
      fabric: "Metallic Aso Oke Blend",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/11/88/2e/11882ee2482a1241da39b1f725b6c0bc.jpg",
    },
    {
      id: "ASOOKESKIRT3",
      name: "Heritage Aso Oke Fringe Skirt",
      category: "Bottoms",
      price: 129.99,
      size: ["S", "M", "L", "XL", "XXL"],
      gender: "Women",
      fabric: "Traditional Aso Oke with Fringe Detail",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/fe/9e/18/fe9e189d0de78541e1504161ca9248ba.jpg",
    },
    {
      id: "ASOOKESKIRT4",
      name: "Minimalist Aso Oke Panel Skirt",
      category: "Bottoms",
      price: 109.99,
      size: ["S", "M", "L", "XL", "XXL"],
      gender: "Women",
      fabric: "Soft Woven Aso Oke",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/56/c3/73/56c373c5b058bfa81f3ccf6f05702c9a.jpg",
    },
    {
      id: "ASOOKESKIRT5",
      name: "Glam Aso Oke Mermaid Skirt",
      category: "Bottoms",
      price: 149.99,
      size: ["S", "M", "L", "XL", "XXL"],
      gender: "Women",
      fabric: "Premium Aso Oke with Silk Lining",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/a7/2f/71/a72f714d7fe36fafac72a61ee1c769f1.jpg",
    },
  ];

  return (
    <>
      <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center lg:pt-50 lg:p-5 pt-35 p-2">
        <FiZap className="mr-2 text-black" /> Aso Oke Skirt
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:pt-10 lg:pb-20 lg:p-5 pb-10 p-2 pt-5">
        {asoOkeskirt.map((product) => (
          <div key={product.id} className="p-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                <Image
                  src={product.image}
                  fill
                  alt={product.name}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-primary text-white bg-[#7B2D26]  text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
                <AddToFavorite
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  size={product.size}
                  gender={product.gender}
                  fabric={product.fabric}
                  isNew={product.isNew}
                  image={product.image}
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <span className="font-bold text-primary">
                    £{product.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{product.category}</p>

                {/* Product Meta */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center">
                    <FiLayers className="mr-1" /> {product.size}
                  </span>
                  <span className="flex items-center">
                    <FiUsers className="mr-1" /> {product.gender}
                  </span>
                  <span className="flex items-center">
                    <FiTag className="mr-1" /> {product.fabric}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <AddToCart
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    size={product.size}
                    gender={product.gender}
                    fabric={product.fabric}
                    isNew={product.isNew}
                    image={product.image}
                  />
                  <Buy product={product} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
