// components/FeaturedCollections.js
export default function FeaturedCollections() {
  const collections = [
    {
      title: "Ankara Dresses",
      image: "/ankara-dresses.jpg",
      link: "/collections/ankara-dresses",
    },
    {
      title: "Modern Wraps",
      image: "/wraps.jpg",
      link: "/collections/wraps",
    },
    {
      title: "Modern Wraps",
      image: "/wraps.jpg",
      link: "/collections/wraps",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">
          Our Signature Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Image placeholder - replace with Next/Image */}
              <div className="h-80 bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <h3 className="absolute bottom-6 left-6 text-2xl font-playfair text-white group-hover:text-primary transition-colors">
                  {collection.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
