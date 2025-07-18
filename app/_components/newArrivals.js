// components/NewArrivals.js
import {
  FiShoppingCart,
  FiHeart,
  FiZap,
  FiUsers,
  FiLayers,
  FiTag,
  FiArrowRight,
} from "react-icons/fi";

const newArrivals = [
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
    isNew: true,
    image: "/wrap-skirt.jpg",
  },
];

export default function NewArrivals() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-playfair font-bold flex items-center">
            <FiZap className="mr-2 text-primary" /> New Arrivals
          </h2>
          <a
            href="/collections/new"
            className="flex items-center text-primary hover:underline"
          >
            View All <FiArrowRight className="ml-1" />
          </a>
        </div>

        {/* Products Grid - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-72 bg-gray-100 flex items-center justify-center">
                {/* Replace with Next/Image */}
                <span className="text-gray-400">{product.name} Image</span>
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
                  <button className="border border-primary text-primary hover:bg-primary hover:text-white hover:bg-black py-2 px-3 rounded text-sm transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
