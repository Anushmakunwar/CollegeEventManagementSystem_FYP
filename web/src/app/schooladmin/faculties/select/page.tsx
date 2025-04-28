"use client";
import useGet from "@/hooks/useGet";
import { SERVER_URL, URLS } from "@/constants";
import { useEffect, useState } from "react";
import useList from "@/hooks/useList";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import Modal from "../../_components/modal/page";
import usePut from "@/hooks/usePut";

export default function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(
    null,
  );
  const [admins, setAdmins] = useState({});
  const [page, setPage] = useState(1);

  const {
    data: faculties,
    isError: facultyError,
    isLoading: facultyLoading,
  } = useList("FACULTY_API", `${URLS.FACULTY}/list`, 1, 10);

  const {
    putMutation,
    isError: assignFacultyAdminError,
    isSuccess,
    data: assignFacultyAdminData,
    error,
    success: assignedNewFaultyAdmin,
    isPending,
  } = usePut("FACULTY_API");

  const { data, isError, isLoading } = useList(
    "user",
    `${URLS.USERS}/list?search=ADMIN`,
    1,
    10,
  );
  const handleSelectItem = (id: string | number) => { 
    putMutation({
      urls: `${URLS.USERS}/${id}`,
      data: { facultyId: selectedFacultyId },
    });
  };

  const handleAssignClick = (facultyId: string) => {
    setSelectedFacultyId(facultyId);
  };

  useEffect(() => {
    if (data) {
      setAdmins(data);
    }
  }, [data, setAdmins]);

  const totalFaculty = faculties?.data?.total || 0;
  const totalPages = Math.ceil(totalFaculty / 10);
  console.log(faculties?.data?.data);
  return (
    <div className="px-4">
      <p className="mt-7 mb-4 text-center">All Faculties</p>
      <div className="flex flex-col gap-4">
        {faculties?.data?.data?.map((el, i) => (
          <div
            key={i}
            className="border-black border-2 rounded-lg bg-[#D9D9D9]"
          >
            <div className="flex justify-between items-center px-3 py-1 leading-7">
              {el.name}
              <div
                onClick={() => {
                  handleAssignClick(el.id);
                  setIsModalOpen(true);
                }}
                className="cursor-pointer underline"
              >
                {el.adminId ? "Change Admin" : "Assign Admin"}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {assignedNewFaultyAdmin && (
          <p className="text-green-500">Admin changed successfully!</p>
        )}
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
      <Modal
        isOpen={isModalOpen}
        items={admins?.data?.data?.filter((admin) => admin.facultyId === null)}
        onClose={() => setIsModalOpen(false)}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}
