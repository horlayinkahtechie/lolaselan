export default function PrivacyPolicy() {
  return (
    <div className="px-4 py-12 md:px-20 max-w-5xl mx-auto pt-40 pb-15">
      <h1 className="text-3xl md:text-4xl font-bold text-[#7B2D26] text-center mb-8">
        Privacy Policy
      </h1>

      <p className="text-gray-600 text-sm mb-8 text-center">
        Last Updated: July 19, 2025
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mt-2">
            When you browse our site or place an order, we may collect:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>
              Personal Information: Name, email address, phone number, delivery
              address.
            </li>
            <li>
              Payment Information: Securely processed via third-party gateways
              (we don’t store card details).
            </li>
            <li>
              Usage Information: IP address, browser type, device type, and site
              activity.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>To process and fulfill your orders</li>
            <li>To send order confirmations and shipping updates</li>
            <li>To provide customer support</li>
            <li>To improve our website and services</li>
            <li>To send promotions or product updates (only if opted-in)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            3. Information Security
          </h2>
          <p className="text-gray-700 mt-2">
            At <strong>LolasElan</strong>, your personal information is
            encrypted and stored securely. Access is restricted to trusted staff
            members only.
          </p>
          <p className="text-green-600 font-semibold mt-2">
            🔒 Your personal information is secured and cannot be accessed by
            any unauthorized user.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">4. Cookies</h2>
          <p className="text-gray-700 mt-2">
            We use cookies to improve your shopping experience. You may disable
            cookies in your browser, but certain features may be affected.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            5. Your Rights
          </h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Opt out of marketing emails</li>
            <li>Request a copy of your data</li>
          </ul>
          <p className="mt-2 text-gray-700">
            To exercise these rights, contact us at{" "}
            <a
              href="mailto:support@lolaselan.co.uk"
              className="text-blue-600 hover:underline"
            >
              support@lolaselan.co.uk
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            6. Changes to This Policy
          </h2>
          <p className="text-gray-700 mt-2">
            We may update this Privacy Policy. All changes will be posted here
            with a revised date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">7. Contact Us</h2>
          <p className="text-gray-700 mt-2">For any questions, reach out to:</p>
          <ul className="text-gray-700 list-inside list-disc mt-2">
            <li>
              <strong>LolasElan</strong>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:support@lolaselan.co.uk"
                className="text-blue-600 hover:underline"
              >
                support@lolaselan.co.uk
              </a>
            </li>
            <li>Location: United Kingdom</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
