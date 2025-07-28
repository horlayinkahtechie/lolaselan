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

export default function Bubu() {
  const bubu = [
    {
      id: "BUBU1",
      name: "Classic Bubu Gown",
      category: "Dresses",
      price: "£89.99",
      size: "S-XXL",
      gender: "Women",
      fabric: "African Wax",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/e0/13/fb/e013fbbe4a19429f2e6a7990c157c12f.jpg",
    },
    {
      id: "BUBU2",
      name: "Modern Bubu Kaftan",
      category: "Tops",
      price: "£49.99",
      size: "M-XXXL",
      gender: "Unisex",
      fabric: "Cotton Blend",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/cc/9d/46/cc9d461520fc2e107f5c0e45746c028e.jpg",
    },
    {
      id: "BUBU3",
      name: "Embroidered Bubu Dress",
      category: "Bottoms",
      price: "£59.99",
      size: "S-XL",
      gender: "Women",
      fabric: "African Print",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/b8/7d/dd/b87dddc68edd2f88e2a318d1b124d649.jpg",
    },
    {
      id: "BUBU4",
      name: "Chiffon Bubu Gown",
      category: "Tops",
      price: "£65.99",
      size: "XS-XXL",
      gender: "Men",
      fabric: "Handwoven Cotton",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/ab/bc/3d/abbc3d29b2d4558139fad75df92c322a.jpg",
    },
    {
      id: "BUBU5",
      name: "Silk Bubu Outfit",
      category: "Sets",
      price: "£99.99",
      size: "M-XXL",
      gender: "Unisex",
      fabric: "Traditional Cotton",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/ac/8e/eb/ac8eeb20f54517854c95759485e958b2.jpg",
    },
  ];

  return (
    <>
      <h2 className="text-3xl font-playfair font-bold flex items-center lg:pt-50 lg:p-5 pt-35 p-2">
        <FiZap className="mr-2 text-black" /> Bubu
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:pt-10 lg:pb-20 lg:p-5 pb-10 p-2 pt-5">
        {bubu.map((product) => (
          <div key={product.id} className="p-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                <Image
                  src={product.image}
                  fill
                  alt={product.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-primary text-white bg-[#7B2D26]  text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
                <AddToFavorite />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <span className="font-bold text-primary">
                    {product.price}
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
