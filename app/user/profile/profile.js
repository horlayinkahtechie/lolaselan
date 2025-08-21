"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import OrderHistory from "@/app/_components/orderHistory";
import WishlistHistory from "@/app/_components/wishListHistory";

// import SavedAddresses from "@/components/SavedAddresses";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("orders");

  const tabs = [
    { id: "orders", label: "My Orders", icon: <FiShoppingBag /> },
    { id: "wishlist", label: "Wishlist", icon: <FiHeart /> },
    { id: "addresses", label: "Saved Addresses", icon: <FiMapPin /> },
  ];

  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to view your profile.
          </p>
          <Link
            href="/auth/signin"
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors inline-flex items-center"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-25">
      {/* Profile Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-amber-500">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-amber-100 text-amber-600">
                  <FiUser size={32} />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {session.user.name || "Welcome Back!"}
              </h1>
              <p className="text-gray-600">{session.user.email}</p>
              <Link
                href="/api/auth/signout"
                // onClick={handleSignOut}
                className="mt-2 text-sm text-red-500 hover:text-red-600 flex items-center"
              >
                <FiLogOut className="mr-1" /> Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-amber-50 text-amber-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Panel */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {activeTab === "orders" && <OrderHistory />}
              {activeTab === "wishlist" && <WishlistHistory />}
              {activeTab === "addresses" && <p>Your address</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
