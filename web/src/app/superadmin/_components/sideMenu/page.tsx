"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { FaSchool, FaUser, FaUsers } from "react-icons/fa";
import { RxExit, RxChevronDown, RxChevronUp } from "react-icons/rx";
import useLogout from "@/hooks/useLogout";

const links = [
  { key: 1, name: "Dashboard", path: "/superadmin", icon: <MdDashboard /> },
  {
    key: 2,
    name: "Schools",
    icon: <IoSchool />,
    menu: [
      {
        key: 2.1,
        name: "All Schools",
        path: "/superadmin/schools",
        icon: <IoSchool />,
      },
      {
        key: 2.2,
        name: "Create Schools",
        path: "/superadmin/schools/new",
        icon: <FaSchool />,
      },
    ],
  },
  {
    key: 3,
    name: "Users",
    icon: <FaUsers />,
    menu: [
      {
        key: 3.1,
        name: "All Users",
        path: "/superadmin/users",
        icon: <FaUsers />,
      },
      {
        key: 3.2,
        name: "Create Users",
        path: "/superadmin/users/new",
        icon: <FaUser />,
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
    <aside className="w-64 min-h-screen bg-gray-800 shadow-md flex flex-col">
      {/* Sidebar Header */}
      <div className="text-2xl font-bold text-center py-6 border-b">
        <Link className="text-white" href="/">
          CEMS
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4">
        {links.map((el) => (
          <div key={el.key} className="mb-2">
            {el.menu ? (
              <div>
                {/* Collapsible Menu Header */}
                <button
                  className="flex items-center justify-between w-full p-3 text-white hover:bg-black rounded-md"
                  onClick={() => toggleMenu(el.key)}
                >
                  <div className="flex items-center gap-2">
                    {el.icon}
                    <span className="font-medium">{el.name}</span>
                  </div>
                  {openMenu[el.key] ? <RxChevronUp /> : <RxChevronDown />}
                </button>

                {/* Dropdown Menu Items */}
                {openMenu[el.key] && (
                  <div className="ml-5 border-l pl-3 mt-2 space-y-1">
                    {el.menu.map((item) => (
                      <Link
                        key={item.key}
                        href={item.path}
                        className={`flex items-center gap-2 p-2 rounded-md text-white transition ${
                          pathname === item.path
                            ? "bg-black text-gray-900 font-semibold"
                            : "hover:bg-black"
                        }`}
                      >
                        {item.icon}
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
                className={`flex items-center gap-2 p-3 rounded-md text-white transition ${
                  pathname === el.path
                    ? "bg-black text-gray-900 font-semibold"
                    : "hover:bg-black"
                }`}
              >
                {el.icon}
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
          className="flex items-center gap-2 w-full p-3 bg-green-500 text-white rounded-md hover:bg-red-600 transition"
        >
          <RxExit />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
