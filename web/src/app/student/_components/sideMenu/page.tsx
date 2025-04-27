"use client";
import useLogout from "@/hooks/useLogout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaSchool, FaUser, FaUsers } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RxExit, RxChevronDown, RxChevronUp } from "react-icons/rx";

const links = [
  { key: 1, name: "Dashboard", path: "/student", icon: <MdDashboard /> },
  {
    key: 2,
    name: "Events",
    menu: [
      {
        key: 2.1,
        name: "Events",
        path: "/student/events",
        icon: <IoSchool />,
      },
    ],
  },
  {
    key: 3,
    name: "User",
    menu: [
      {
        key: 3.1,
        name: "Profile",
        path: "/student/profile",
        icon: <IoSchool />,
      },
    ],
  },


];

export default function SideMenu() {
  const pathname = usePathname();
  const { logout } = useLogout();
  const [openMenu, setOpenMenu] = useState({});

  const toggleMenu = (key) => {
    setOpenMenu((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
   <aside className="w-64 min-h-screen bg-gray-900 text-white shadow-lg flex flex-col ">
  {/* Sidebar Header */}
  <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
    <Link className="text-white tracking-wide" href="/">
      CEMS
    </Link>
  </div>

  {/* Navigation Links */}
  <nav className="flex-grow p-4 space-y-2">
    {links.map((el) => (
      <div key={el.key}>
        {el.menu ? (
          <div>
            {/* Menu Header */}
            <button
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
              onClick={() => toggleMenu(el.key)}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{el.icon}</span>
                <span className="font-medium">{el.name}</span>
              </div>
              {openMenu[el.key] ? <RxChevronUp /> : <RxChevronDown />}
            </button>

            {/* Dropdown Items */}
            {openMenu[el.key] && (
              <div className="ml-5 pl-3 border-l border-gray-700 mt-1 space-y-2">
                {el.menu.map((item) => (
                  <Link
                    key={item.key}
                    href={item.path}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      pathname === item.path
                        ? "bg-gray-800 text-blue-400 font-semibold"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={el.key}
            href={el.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              pathname === el.path
                ? "bg-gray-800 text-blue-400 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            <span className="text-lg">{el.icon}</span>
            <span>{el.name}</span>
          </Link>
        )}
      </div>
    ))}
  </nav>

  {/* Logout Button */}
  <div className="p-4">
    <button
      onClick={logout}
      className="flex items-center gap-3 w-full p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
    >
      <RxExit />
      <span>Logout</span>
    </button>
  </div>
</aside>

  );
}
