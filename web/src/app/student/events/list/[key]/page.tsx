"use client";
import { URLS } from "@/constants";
import useList from "@/hooks/useList";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllEvents() {
  const { key } = useParams();
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState({});

  const { data, isError, isLoading } = useList(
    "studentEvent",
    `${URLS.EVENT}/list?filter=${key}`,
    page,
    9,
  );

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  const totalEvents = data?.data?.total || 0;
  const totalPages = Math.ceil(totalEvents / 10);

  return (
    <div className="px-8 py-12 bg-gray-100 min-h-screen flex flex-col items-center w-full">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-10">
        All Events
      </h2>

      {/* Event List */}
      <div className="w-full  flex flex-col gap-6">
        {events?.data?.data?.length > 0 ? (
          events?.data?.data?.map((el, i) => (
            <Link
              href={`/student/events/${el.id}#${key}/`}
              key={i}
              className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-lg border border-gray-200 shadow-md rounded-xl transition-all hover:scale-102 hover:shadow-xl hover:bg-white"
            >
              <span className="text-lg font-semibold text-gray-800">
                {el.name}
              </span>
              <span className="text-gray-500 text-lg">&rarr;</span>
            </Link>
          ))
        ) : (
          <div className="flex  items-center h-full w-full">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v8m0 0v8m0-8H4m8 0h8"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800">
                No Event Available
              </h2>
              <p className="text-gray-600 mt-2">
                It looks like there are no events right now. Please check back
                later!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center  gap-4 mt-8">
          <button
            className="px-5 py-2 bg-white/70 border border-gray-300 rounded-lg text-gray-700 font-medium shadow-md hover:bg-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-gray-800 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-5 py-2 bg-white/70 border border-gray-300 rounded-lg text-gray-700 font-medium shadow-md hover:bg-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
