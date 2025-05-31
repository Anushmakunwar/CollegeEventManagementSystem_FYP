"use client";
import useGet from "@/hooks/useGet";
import { SERVER_URL, URLS } from "@/constants";
import { useEffect, useState } from "react";
import useList from "@/hooks/useList";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import Modal from "../_components/modal/page";
import usePut from "@/hooks/usePut";
import { UserStore } from "@/store/UserStore";
import { ToastContainer, toast } from "react-toastify";

export default function AllSchools() {
  const { schoolSuffix } = UserStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(
    null,
  );
  const [page, setPage] = useState(1);

  const {
    data: faculties,
    isError: facultyError,
    isLoading: facultyLoading,
  } = useList(
    "FACULTY_API",
    `${URLS.SCHOOL}/faculty-by-suffix?suffix=${schoolSuffix}`,
    1,
    9,
  );

  const {
    putMutation,
    isError: assignFacultyAdminError,
    isSuccess,
    data: assignFacultyAdminData,
    error,
    success: assignedNewFaultyAdmin,
    isPending,
  } = usePut("FACULTY_API");

  const {
    data: admins,
    isError,
    isLoading,
  } = useList("FACULTY_API", `${URLS.USERS}/list?search=ADMIN`, 1, 10);

  const handleSelectItem = (id: string | number) => {
    putMutation({
      urls: `${URLS.USERS}/${id}`,
      data: { facultyId: selectedFacultyId },
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Faculty assign successfully!");
    } else if (assignFacultyAdminError) {
      toast.error(error || "An error occurred");
    }
  }, [isSuccess, assignFacultyAdminError]);

  const handleAssignClick = (facultyId: string) => {
    setSelectedFacultyId(facultyId);
    setIsModalOpen(true);
  };

  const totalFaculty = faculties?.data?.total || 0;
  const totalPages = Math.ceil(totalFaculty / 10);

  return (
    <div className="px-6 py-4">
      <p className="text-2xl font-semibold text-center mb-6">All Faculties</p>

      {/* Faculty List */}
      <div className="space-y-4">
        {faculties?.data?.length > 0 &&
          faculties.data.map((el, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-lg font-semibold">{el.name}</p>
                <button
                  onClick={() => handleAssignClick(el.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none transition duration-200"
                >
                  {el.users.length > 0 ? "Change Admin" : "Assign Admin"}
                </button>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200 disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200 disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal to assign admin */}
      <Modal
        isOpen={isModalOpen}
        items={admins?.data?.data?.filter((admin) => admin.facultyId === null)}
        onClose={() => setIsModalOpen(false)}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}
