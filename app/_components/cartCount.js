import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useSession } from "next-auth/react";

export default function CartCount() {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    if (!session?.user?.email) return;

    const { data, error } = await supabase
      .from("cart")
      .select("id", { count: "exact" })
      .eq("email", session.user.email);

    if (!error && data) {
      setCartCount(data.length);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Listen for custom event
    const handleCartUpdated = () => {
      fetchCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, [session]);

  return (
    <Link
      href="/cart"
      className="relative p-2 text-[#FFE9D9] hover:text-[#FFB38A] cursor-pointer"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
