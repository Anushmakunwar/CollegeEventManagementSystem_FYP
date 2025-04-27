"use client";
import { URLS } from "@/constants";
import useList from "@/hooks/useList";
import { useState } from "react";

export default function AllUsers() {
  const [page, setPage] = useState(1);

  const {
    data: users,
    isError,
    isLoading,
  } = useList("user", `${URLS.USERS}/list?search=ADMIN`, page, 10);

  const totalUsers = users?.data?.total || 0;
  const totalPages = Math.ceil(totalUsers / 10);

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-6 text-center">All Users</h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load users.</p>
      ) : users?.data?.data?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-2xl text-left border-b font-semibold">
                  Full Name
                </th>
                <th className="px-4 py-2 text-2xl text-left border-b font-semibold">
                  Email
                </th>
                <th className="px-4 py-2 text-2xl text-left border-b font-semibold">
                  Active
                </th>
                <th className="px-4 py-2 text-2xl text-left border-b font-semibold">
                  Verified
                </th>
                <th className="px-4 py-2 text-2xl text-left border-b font-semibold">
                  Created At
                </th>
                {/* <th className="px-4 py-2 text-left border-b font-semibold">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody>
              {users.data.data.map((user, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{user.fullName}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b text-start">
                    {user.isActive ? (
                      <span className=" text-green-500 font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b text-start">
                    {user.isEmailVerified ? (
                      <span className="text-green-500 font-semibold">
                        Verified
                      </span>
                    ) : (
                      <span className="text-yellow-500 font-semibold">
                        Unverified
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  {/* <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => alert(`View details of ${user.fullName}`)}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
