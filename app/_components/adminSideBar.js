import Link from "next/link";
import { FaMailBulk } from "react-icons/fa";
import {
  FiShoppingBag,
  FiUsers,
  FiActivity,
  FiPackage,
  FiSettings,
  FiBarChart2,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: FiActivity,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: FiShoppingBag,
  },
  {
    name: "Subscribers",
    href: "/admin/subscribers",
    icon: FaMailBulk,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: FiUsers,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: FiPackage,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: FiBarChart2,
  },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setOpen(!open);
  const closeSidebar = () => setOpen(false);

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden p-4 fixed top-0 left-0 z-30 w-full bg-[#5E2BFF] text-white shadow flex justify-between items-center pt-35">
        <span className="text-xl font-bold">Lolaselan</span>
        <button onClick={toggleSidebar} className="p-2">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 min-h-screen w-64 bg-[#5E2BFF] text-white transform transition-transform duration-300 ease-in-out pt-27 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold border-b border-white/10 mt-16 md:mt-0">
          Lolaselan
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeSidebar}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-white text-black"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon className="text-lg" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
