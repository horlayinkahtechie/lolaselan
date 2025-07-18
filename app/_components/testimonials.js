// components/Testimonials.js
export default function Testimonials() {
  const testimonials = [
    {
      quote: "The Ankara dress fits perfectly and the fabric is amazing!",
      author: "Amina K.",
      role: "Loyal Customer",
    },

    {
      quote: "The Ankara dress fits perfectly and the fabric is amazing!",
      author: "Amina K.",
      role: "Loyal Customer",
    },

    {
      quote: "The Ankara dress fits perfectly and the fabric is amazing!",
      author: "Amina K.",
      role: "Loyal Customer",
    },
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-primary">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
