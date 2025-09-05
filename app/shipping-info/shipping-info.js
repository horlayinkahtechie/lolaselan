"use client";

export default function ShippingInfo() {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-35 pb-10">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Shipping Information
      </h1>
      <p className="text-gray-600 mb-8">
        We aim to deliver your orders quickly and safely. Below are our shipping
        policies and timelines.
      </p>

      {/* Shipping Options */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Shipping Options
        </h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium text-gray-800">Standard Shipping</h3>
            <p className="text-gray-600 text-sm">
              Delivery within 2-4 wprking days. Available nationwide.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium text-gray-800">Next-Day Delivery</h3>
            <p className="text-gray-600 text-sm">
              Available in select cities. Order before 12PM.
            </p>
          </div>
        </div>
      </section>

      {/* Rates & Fees */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Shipping Rates
        </h2>
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Method</th>
              <th className="py-2 px-4 text-left">Estimated Delivery</th>
              <th className="py-2 px-4 text-left">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-2 px-4">Standard</td>
              <td className="py-2 px-4">2-4 Working Days</td>
              <td className="py-2 px-4">£3.99</td>
            </tr>

            <tr>
              <td className="py-2 px-4">Next-Day</td>
              <td className="py-2 px-4">Next Working Day</td>
              <td className="py-2 px-4">£4.99</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Additional Info */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Additional Information
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>We do not ship on weekends or public holidays.</li>
          <li>
            Tracking details will be provided via email once your order is
            shipped.
          </li>
        </ul>
      </section>
    </div>
  );
}
