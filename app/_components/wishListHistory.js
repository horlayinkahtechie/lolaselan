"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import supabase from "../lib/supabase";
import { FiPackage, FiCheckCircle, FiTruck, FiClock } from "react-icons/fi";
import Link from "next/link";

export default function WishlistHistory() {
  const { data: session } = useSession();
  const [wishlist, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishList = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("wishlist")
          .select("*")
          .eq("email", session.user.email)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setWishList(data || []);
      } catch (error) {
        console.error("Error fetching wishlists:", error);
        toast.error("Failed to load wishlists");
      } finally {
        setLoading(false);
      }
    };

    fetchWishList();
  }, [session]); // Re-fetch when session changes

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Wishlist History</h2>
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <FiPackage className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-600">Nothing to be found here.</p>
          <Link
            href="/collections/all"
            className="mt-4 inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlist.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 hover:shadow-sm transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Order #{order.order_id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                  {order.status === "delivered" ? (
                    <>
                      <FiCheckCircle /> Delivered
                    </>
                  ) : order.status === "shipped" ? (
                    <>
                      <FiTruck /> Shipped
                    </>
                  ) : (
                    <>
                      <FiClock /> Processing
                    </>
                  )}
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{wishlist.length} items</span>
                  <span className="font-bold">£{order.price}</span>
                </div>
                <Link
                  href={`/profile/wishlist/${order.order_id}`}
                  className="text-sm text-amber-600 hover:text-amber-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
