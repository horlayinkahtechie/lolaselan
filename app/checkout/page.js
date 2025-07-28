import CheckoutPage from "./checkout";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <CheckoutPage />
    </Suspense>
  );
}
