import useLogout from "@/hooks/useLogout";
import Link from "next/link";

const links = [
  { name: "Dashboard", path: "/admin" },
  { name: "All Events", path: "/admin/events/" },
  { name: "Add Events", path: "/admin/events/new" },
  { name: "Create Student", path: "/admin/students/new" },
  { name: "Verify Student", path: "/admin/students/verify" },
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
