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

export default function AnkaraPants() {
  const AnkaraPants = [
    {
      id: "ANKARAPANTS1",
      name: "Ankara Palazzo Trousers",
      category: "Dresses",
      price: 89.99,
      size: "S-XXL",
      gender: "Women",
      fabric: "African Wax",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/b3/7e/f3/b37ef3b83e5e90ca4ce8b679bc18b74a.jpg",
    },
    {
      id: "ANKARAPANTS2",
      name: "Ankara Jogger Pants",
      category: "Tops",
      price: 49.99,
      size: "M-XXXL",
      gender: "Unisex",
      fabric: "Cotton Blend",
      isNew: true,
      image:
        "https://i.pinimg.com/1200x/bb/5a/09/bb5a0913ce1404e2a59caf62270451cd.jpg",
    },
    {
      id: "ANKARAPANTS3",
      name: "Ankara Harem Pants",
      category: "Bottoms",
      price: 59.99,
      size: "S-XL",
      gender: "Women",
      fabric: "African Print",
      isNew: false,
      image:
        "https://i.pinimg.com/736x/28/4b/58/284b58c96d7b7a76cfdab83ddfe5d684.jpg",
    },
    {
      id: "ANKARAPANTS4",
      name: "Ankara Slim-Fit Trousers",
      category: "Tops",
      price: 65.99,
      size: "XS-XXL",
      gender: "Men",
      fabric: "Handwoven Cotton",
      isNew: false,
      image:
        "https://i.pinimg.com/1200x/3f/e3/e7/3fe3e74bd2ee3226713a35bb7d11c474.jpg",
    },
    {
      id: "ANKARAPANTS5",
      name: "Ankara Cargo Pants",
      category: "Sets",
      price: 99.99,
      size: "M-XXL",
      gender: "Unisex",
      fabric: "Traditional Cotton",
      isNew: true,
      image:
        "https://i.pinimg.com/736x/cd/61/0e/cd610e7cdb98197ead5a0f833a3de8c4.jpg",
    },
  ];

  return (
    <>
      <h2 className="lg:text-3xl text-2xl font-playfair font-bold flex items-center lg:pt-50 lg:p-5 pt-35 p-2">
        <FiZap className="mr-2 text-black" /> Ankara Pants
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:pt-10 lg:pb-20 lg:p-5 pb-10 p-2 pt-5">
        {AnkaraPants.map((product) => (
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
