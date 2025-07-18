// components/ProductCard.js
import {
  FiShoppingCart,
  FiHeart,
  FiZap,
  FiUsers,
  FiLayers,
  FiTag,
  FiArrowRight,
} from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Ankara Maxi Dress",
    category: "Dresses",
    price: "£89.99",
    size: "S-XXL",
    gender: "Women",
    fabric: "African Wax",
    isNew: true,
    image: "/ankara-dress.jpg",
  },
  {
    id: 2,
    name: "Kente Print Shirt",
    category: "Tops",
    price: "£49.99",
    size: "M-XXXL",
    gender: "Unisex",
    fabric: "Cotton Blend",
    isNew: true,
    image: "/kente-shirt.jpg",
  },
  {
    id: 3,
    name: "Adire Wrap Skirt",
    category: "Bottoms",
    price: "£59.99",
    size: "S-XL",
    gender: "Women",
    fabric: "African Print",
    isNew: false,
    image: "/wrap-skirt.jpg",
  },
  {
    id: 4,
    name: "Dashiki Tunic",
    category: "Tops",
    price: "£65.99",
    size: "XS-XXL",
    gender: "Men",
    fabric: "Handwoven Cotton",
    isNew: true,
    image: "/dashiki.jpg",
  },
];

export default function ProductCard() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold font-playfair flex">
          <FiZap className="mr-2 text-primary" />
          Just For You
        </h2>
        <button className="text-primary hover:underline flex items-center">
          View All <FiArrowRight className="ml-1" />
        </button>
      </div>

      {/* Responsive Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {/* Product Image */}
            <div className="relative aspect-square">
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">{product.name} Image</span>
              </div>

              {/* New Arrival Badge */}
              {product.isNew && (
                <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                  <FiZap className="mr-1" /> NEW
                </div>
              )}

              {/* Wishlist Button */}
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <FiHeart className="text-gray-600 hover:text-red-500" />
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
                <span className="font-bold text-primary whitespace-nowrap ml-2">
                  {product.price}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-3">{product.category}</p>

              {/* Product Meta */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  <FiLayers className="mr-1" /> {product.size}
                </span>
                <span className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  <FiUsers className="mr-1" /> {product.gender}
                </span>
                {product.fabric && (
                  <span className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    <FiTag className="mr-1" /> {product.fabric}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-2 px-3 rounded text-sm transition-colors">
                  <FiShoppingCart className="mr-2" /> Add
                </button>
                <button className="border border-primary text-primary hover:bg-primary hover:text-white hover:bg-black py-2 px-3 rounded text-sm transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
