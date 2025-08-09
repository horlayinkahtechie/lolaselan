"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import supabase from "../lib/supabase";
import {
  FiPackage,
  FiCheckCircle,
  FiTruck,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function WishlistHistory() {
  const { data: session } = useSession();
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlists = async () => {
      if (!session?.user?.email) {
        toast.error("Failed to load wishlists.");
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

        setWishlists(data || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlists();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your wishlists</h1>
        <p className="text-gray-600 mt-1">
          {wishlists.length} {wishlists.length === 1 ? "wishlist" : "wishlists"}{" "}
          placed
        </p>
      </div>

      {wishlists.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FiPackage className="mx-auto text-4xl text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No wishlists yet
          </h2>
          <p className="text-gray-600 mb-6">
            Your wishlist history will appear here once you make a purchase
          </p>
          <Link
            href="/collections/all"
            className="inline-flex items-center px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlists.map((order) => {
            return (
              <div
                key={order.wishlist_id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order No{" "}
                        <span className="font-bold">{order.wishlist_id}</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Added on{" "}
                        <span className="font-bold">
                          {" "}
                          {new Date(order.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">£{order.price}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                        <Image
                          src={order.image}
                          alt={order.orderName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {order.orderName}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {order.length > 2 && (
                    <p className="text-sm text-gray-500 mt-4">
                      + {order.length - 2} more item
                      {order.length - 2 !== 1 ? "s" : ""}
                    </p>
                  )}

                  <div className="mt-6 flex justify-end">
                    <Link
                      href={`/checkout/${order.wishlist_id}`}
                      className="flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
                    >
                      Check out <FiChevronRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
