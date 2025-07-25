import { Suspense } from "react";
import CheckoutPage from "./checkout";

export default function page() {
  return;
  <>
    <Suspense fallback={<p>Loading</p>}>
      <CheckoutPage />;
    </Suspense>
  </>;
}
