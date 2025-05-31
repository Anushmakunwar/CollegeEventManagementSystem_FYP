"use client";
import useLogout from "@/hooks/useLogout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaSchool, FaUser, FaUsers } from "react-icons/fa";
import { RxExit, RxChevronDown, RxChevronUp } from "react-icons/rx";

import { IoSchool } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
// import { RxExit } from "react-icons/rx";

const links = [
  { key: 1, name: "Dashboard", path: "/schooladmin", icon: <MdDashboard /> },
  {
    key: 2,
    name: "Events",
    menu: [
      {
        key: 2.1,
        name: "All Events",
        path: "/schooladmin/events",
        icon: <IoSchool />,
      },
      {
        key: 2.2,
        name: "Create Event",
        path: "/schooladmin/events/new",
        icon: <FaSchool />,
      },
    ],
  },
  {
    key: 3,
    name: "Faculty",
    menu: [
      {
        key: 3.1,
        name: "Assign Admin",
        path: "/schooladmin/faculties",
        icon: <FaUsers />,
      },
      // {
      //   key: 3.2,
      //   name: "Select Faculty",
      //   path: "/schooladmin/faculties/select",
      //   icon: <IoSchool />,
      // },
      {
        key: 3.3,
        name: "Create Faculty",
        path: "/schooladmin/faculties/new",
        icon: <IoSchool />,
      },
    ],
  },
  {
    key: 4,
    name: "Users",
    menu: [
      {
        key: 4.1,
        name: "All Admins",
        path: "/schooladmin/users",
        icon: <FaUsers />,
      },
      {
        key: 4.2,
        name: "All Students",
        path: "/schooladmin/students",
        icon: <FaUsers />,
      },
      {
        key: 4.3,
        name: "Create Admin",
        path: "/schooladmin/users/new",
        icon: <FaUser />,
      },
    ],
  },
  // { name: "All Events", path: "/schooladmin/events/" },
  // { name: "Add Events", path: "/schooladmin/events/new" },
  // { name: "Assign Admin", path: "/schooladmin/faculties" },
  // { name: "Select Faculty", path: "/schooladmin/faculties/select" },
  // { name: "Create Faculty", path: "/schooladmin/faculties/new" },
  // { name: "Add Admin", path: "/schooladmin/users/new" },
  // { name: "All Admins", path: "/schooladmin/users" },
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
          className="flex items-center gap-2 w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          <RxExit />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
