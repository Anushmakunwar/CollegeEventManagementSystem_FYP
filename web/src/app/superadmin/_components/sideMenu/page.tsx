"use client";
import useLogout from "@/hooks/useLogout";

import Link from "next/link";

const links = [
  { name: "Dashboard", path: "/superadmin" },
  { name: "All Schools", path: "/superadmin/schools" },
  { name: "Create School", path: "/superadmin/schools/new" },
  { name: "All Users", path: "/superadmin/users" },
  { name: "Create Users", path: "/superadmin/users/new" },
];

export default function SideMenu() {
  const { isLoading, logout } = useLogout();

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="text-2xl font-bold text-center py-4">
        <Link href="/">CEMS</Link>
      </div>
      <nav className="pl-10 flex-grow space-y-2">
        {links.map((el, index) => (
          <li key={index}>
            <Link href={el.path}>{el.name}</Link>
          </li>
        ))}
        <li>
          <button
            onClick={logout}
            disabled={isLoading}
            className="text-red-500 hover:underline disabled:opacity-50"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </li>
      </nav>
    </div>
  );
}
