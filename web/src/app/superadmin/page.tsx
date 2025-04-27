import Link from "next/link";
import { FaSchool, FaUser, FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";

export default function SuperAdmin() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
  

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="mb-6 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-gray-900">School Events Management</h1>
          <p className="text-gray-600 pt-5">
            Manage schools, users, and events efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          {/* <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2> */}
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/superadmin/schools"
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <IoSchool className="text-4xl text-blue-600" />
              <span className="mt-2 font-bold">All Schools</span>
              <p className="text-sm text-gray-500">
                View and manage all registered schools.
              </p>
            </Link>
            <Link
              href="/superadmin/schools/new"
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaSchool className="text-4xl text-green-600" />
              <span className="mt-2 font-bold">Create School</span>
              <p className="text-sm text-gray-500">
                Register a new school in the system.
              </p>
            </Link>
            <Link
              href="/superadmin/users"
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaUsers className="text-4xl text-yellow-600" />
              <span className="mt-2 font-bold">All Users</span>
              <p className="text-sm text-gray-500">
                Manage and view all system users.
              </p>
            </Link>
            <Link
              href="/superadmin/users/new"
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaUser className="text-4xl text-purple-600" />
              <span className="mt-2 font-bold">Create User</span>
              <p className="text-sm text-gray-500">
                Add new users to the system.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
