"use client";

export default function CookiesPolicy() {
  return (
    <main className="max-w-4xl mx-auto p-6 text-gray-800 space-y-6 pt-40 pb-15">
      <h1 className="text-3xl font-bold text-[#7B2D26]">Cookies Policy</h1>

      <section>
        <p>
          At LolasÈlan, we use cookies to enhance your shopping experience. This
          policy explains what cookies are, how we use them, and how you can
          manage them.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. What Are Cookies?
        </h2>
        <p>
          Cookies are small data files stored on your device when you visit our
          site. They help us remember your preferences and improve
          functionality.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Cookies
        </h2>
        <p>
          We use cookies to:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Remember items in your cart</li>
            <li>Analyze site traffic</li>
            <li>Understand user behavior to improve our services</li>
            <li>Enable secure login</li>
          </ul>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Managing Cookies</h2>
        <p>
          You can disable cookies via your browser settings. Please note,
          disabling cookies may impact some features of our website.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Third-Party Cookies
        </h2>
        <p>
          We may use third-party services such as Google Analytics. These
          services may also place cookies to collect data.
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-10">Last updated: July 2025</p>
    </main>
  );
}
