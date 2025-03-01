"use client";
import useLogout from "@/hooks/useLogout";
import Link from "next/link";

const links = [
  { name: "Dashboard", path: "/schooladmin" },
  { name: "All Events", path: "/schooladmin/events/" },
  { name: "Add Events", path: "/schooladmin/events/new" },
  { name: "Assign Admin", path: "/schooladmin/faculties" },
  { name: "Select Faculty", path: "/schooladmin/faculties/select" },
  { name: "Create Faculty", path: "/schooladmin/faculties/new" },
  { name: "Add Admin", path: "/schooladmin/users/new" },
  { name: "All Admins", path: "/schooladmin/users" },
];

export default function SideMenu() {
  const { isLoading, logout } = useLogout();

  return (
    <nav className="bg-slate-500 pl-10">
      {links.map((el) => (
        <li>
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
  );
}
