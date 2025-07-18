// components/Newsletter.js
export default function Newsletter() {
  return (
    <section className="bg-accent text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-playfair font-bold mb-4">Stay Updated</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Subscribe for exclusive offers and new collection alerts
        </p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-2 rounded text-gray-900"
          />
          <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
