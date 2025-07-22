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
        id: 1,
        name: "Ankara Palazzo Trousers",
        category: "Dresses",
        price: "£89.99",
        size: "S-XXL",
        gender: "Women",
        fabric: "African Wax",
        isNew: true,
        image:
          "https://i.pinimg.com/736x/b3/7e/f3/b37ef3b83e5e90ca4ce8b679bc18b74a.jpg",
      },
      {
        id: 2,
        name: "Ankara Jogger Pants",
        category: "Tops",
        price: "£49.99",
        size: "M-XXXL",
        gender: "Unisex",
        fabric: "Cotton Blend",
        isNew: true,
        image:
          "https://i.pinimg.com/1200x/bb/5a/09/bb5a0913ce1404e2a59caf62270451cd.jpg",
      },
      {
        id: 3,
        name: "Ankara Harem Pants",
        category: "Bottoms",
        price: "£59.99",
        size: "S-XL",
        gender: "Women",
        fabric: "African Print",
        isNew: false,
        image:
          "https://i.pinimg.com/736x/28/4b/58/284b58c96d7b7a76cfdab83ddfe5d684.jpg",
      },
      {
        id: 4,
        name: "Ankara Slim-Fit Trousers",
        category: "Tops",
        price: "£65.99",
        size: "XS-XXL",
        gender: "Men",
        fabric: "Handwoven Cotton",
        isNew: false,
        image:
          "https://i.pinimg.com/1200x/3f/e3/e7/3fe3e74bd2ee3226713a35bb7d11c474.jpg",
      },
      {
        id: 5,
        name: "Ankara Cargo Pants",
        category: "Sets",
        price: "£99.99",
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
      <h2 className="text-3xl font-playfair font-bold flex items-center lg:pt-50 lg:p-5 pt-35 p-2">
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
                  alt={product.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <FiHeart className="text-gray-600 hover:text-red-500" />
                </button>
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
                  <button className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-2 px-3 rounded text-sm transition-colors">
                    <FiShoppingCart className="mr-2" /> Add
                  </button>
                  <button className="border border-primary text-primary hover:bg-black cursor-pointer hover:text-white py-2 px-3 rounded text-sm transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
