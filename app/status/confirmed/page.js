import { Suspense } from "react";
import PaymentSuccessPage from "./confirmed";

export default function page() {
  return (
    <Suspense>
      <PaymentSuccessPage />
    </Suspense>
  );
}
