import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import supabase from "../lib/supabase";
import { useSession } from "next-auth/react";

// Move debounce function outside the component
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export default function CartCount() {
  const { data: session, status } = useSession();
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = useCallback(async () => {
    if (session?.user?.email) {
      // Fetch from database for authenticated users
      const { count, error } = await supabase
        .from("cart")
        .select("*", { count: "exact", head: true })
        .eq("email", session.user.email);

      if (!error && count !== null) {
        setCartCount(count);
      }
    } else {
      // Fetch from localStorage for unauthenticated users
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(storedCart.length);
    }
  }, [session]);

  useEffect(() => {
    fetchCartCount();

    // Create debounced version of the handler
    const debouncedHandler = debounce(() => {
      fetchCartCount();
    }, 300);

    window.addEventListener("cartUpdated", debouncedHandler);

    // Also listen for storage events (for changes from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        fetchCartCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", debouncedHandler);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [session, fetchCartCount]);

  // Also update count when authentication status changes
  useEffect(() => {
    fetchCartCount();
  }, [session, fetchCartCount]);

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
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </Link>
  );
}