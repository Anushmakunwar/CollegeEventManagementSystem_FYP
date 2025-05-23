"use client";
import { URLS } from "@/constants";
import useList from "@/hooks/useList";
import usePut from "@/hooks/usePut";
import { useEffect, useState } from "react";

export default function AllUsers() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState();
  const { data, putMutation, isPending, error } = usePut("user");
  const {
    data: users,
    isError,
    isLoading,
  } = useList("user", `${URLS.FACULTY}/list-approval-student`, page, 10);

  const totalUsers = users?.data?.total || 0;
  const totalPages = Math.ceil(totalUsers / 10);
  const handleStatusChange = (status: boolean, id: string) => {
    setStatus(status);
    putMutation({
      urls: `${URLS.FACULTY}/approve-student/${id}`,
      data: { status },
    });
    console.log(status);
  };

  return (
    <div className="px-4">
      <p className="mt-7 mb-4 text-center">All Users</p>
      <div className="flex flex-col gap-4">
        {users?.data?.data?.map((el, i) => (
          <div
            key={i}
            className="border-black border-2 rounded-lg bg-[#D9D9D9]"
          >
            <div className="flex justify-between items-center px-3 py-1 leading-7">
              {el.fullName}
              <button onClick={() => handleStatusChange(true, el.id)}>
                approve
              </button>
              <button onClick={() => handleStatusChange(false, el.id)}>
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
