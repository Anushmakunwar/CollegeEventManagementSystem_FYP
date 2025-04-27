import Link from "next/link";

import {
  FaSchool,
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  eve,
} from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";

export default function admin() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="mb-6 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-gray-900">
            School Events Management
          </h1>
          <p className="text-gray-600 pt-5">
            Manage schools, users, and events efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          {/* <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2> */}
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="/admin/events"
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <MdEmojiEvents className="text-4xl text-blue-600" />
              <span className="mt-2 font-bold">All Event</span>
              <p className="text-sm text-gray-500">
                View and manage all events.
              </p>
            </Link>
            <Link
              href="/admin/events/new"
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <MdEmojiEvents className="text-4xl text-blue-600" />
              <span className="mt-2 font-bold">Create Event</span>
              <p className="text-sm text-gray-500">
                Create new event.
              </p>
            </Link>
            <Link
              href="/admin/students/add"
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaUser className="text-4xl text-purple-600" />
              <span className="mt-2 font-bold">Create Student</span>
              <p className="text-sm text-gray-500">
                Add new student to the faculty.
              </p>
            </Link>
            <Link
              href="/admin/students/verify"
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaUsers className="text-4xl text-yellow-600" />
              <span className="mt-2 font-bold">Verify Students</span>
              <p className="text-sm text-gray-500">
                Verify newly registered students.
              </p>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}