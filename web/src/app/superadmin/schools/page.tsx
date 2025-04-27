"use client";

import { useState, useEffect } from "react";
import useList from "@/hooks/useList";
import usePut from "@/hooks/usePut";
import { URLS } from "@/constants";
import Modal from "../_components/modal/page";
import { FaArrowRightLong } from "react-icons/fa6";

export default function AllSchools() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { data: schoolData, isLoading: loadingSchools } = useList(
    "SCHOOL_API",
    `${URLS.SCHOOL}/list`,
    page,
    10,
  );
  const { data: adminData, isLoading: loadingAdmins } = useList(
    "user",
    `${URLS.USERS}/list?search=SCHOOLADMIN`,
    1,
    10,
  );

  const { putMutation, success: assignedNewSchoolAdmin } = usePut("SCHOOL_API");

  const handleAssignClick = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    setIsModalOpen(true);
  };

  const handleSelectItem = (adminId: string | number) => {
    if (selectedSchoolId) {
      putMutation({
        urls: `${URLS.SCHOOL}/assign-admin/${selectedSchoolId}`,
        data: { adminId },
      });
    }
  };

  const totalSchools = schoolData?.data?.total || 0;
  const totalPages = Math.ceil(totalSchools / 10);

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">All Schools</h2>
      {loadingSchools ? (
        <p className="text-center text-gray-500">Loading schools...</p>
      ) : (
        <div className="space-y-4">
          {schoolData?.data?.data?.map((school) => (
            <div
              key={school.id}
              className="p-4 bg-gray-100 rounded-lg flex justify-between items-center shadow-sm"
            >
              <span className="text-gray-800 font-medium">{school.name}</span>
              <button
                onClick={() => handleAssignClick(school.id)}
                className="text-blue-600 hover:underline"
              >
                {school.adminId ? "Change Admin" : "Assign Admin"}
              </button>
            </div>
          ))}
        </div>
      )}

      {assignedNewSchoolAdmin && (
        <p className="text-green-500 mt-4 text-center">
          Admin changed successfully!
        </p>
      )}

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
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
        items={adminData?.data?.data}
        onClose={() => setIsModalOpen(false)}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}
