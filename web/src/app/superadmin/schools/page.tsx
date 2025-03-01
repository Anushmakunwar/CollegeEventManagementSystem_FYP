"use client";
import useGet from "@/hooks/useGet";
import { SERVER_URL, URLS } from "@/constants";
import { schoolKey } from "./keys/keys";
import { useEffect, useState } from "react";
import useList from "@/hooks/useList";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import Modal from "../_components/modal/page";
import usePut from "@/hooks/usePut";

export default function AllSchools() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [schools, setSchools] = useState({});
  const [admins, setAdmins] = useState({});
  const [page, setPage] = useState(1);
  const {
    data: Sdata,
    isError: SISError,
    isLoading: SIsLoading,
  } = useList("SCHOOL_API", `${URLS.SCHOOL}/list`, 1, 10);

  const {
    putMutation,
    isError: assignSchoolAdminError,
    isSuccess,
    data: assignAdminData,
    error,
    success: assignedNewSchoolAdmin,
    isPending,
  } = usePut("SCHOOL_API");

  const { data, isError, isLoading } = useList(
    "user",
    `${URLS.USERS}/list?search=SCHOOLADMIN`,
    1,
    10,
  );

  const handleSelectItem = (id: string | number) => {
    // setSelectedItemId(id);
    console.log("school adminId", id);
    console.log("schoolID", selectedSchoolId);
    // now do post req on backend with this id
    putMutation({
      urls: `${URLS.SCHOOL}/assign-admin/${selectedSchoolId}`,
      data: { adminId: id },
    });
  };

  const handleAssignClick = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
  };

  useEffect(() => {
    if (Sdata) {
      setSchools(Sdata);
    }
    if (data) {
      setAdmins(data);
    }
  }, [Sdata, setSchools, data, setAdmins]);

  const totalSchools = schools?.data?.total || 0;
  const totalPages = Math.ceil(totalSchools / 10);
  // console.log(admins?.data?.data);
  return (
    <div className="px-4">
      <p className="mt-7 mb-4 text-center">All Schools</p>
      <div className="flex flex-col gap-4">
        {schools?.data?.data?.map((el, i) => (
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
        {/* <div className="border-black border-2 rounded-lg bg-[#D9D9D9]">
          <Link
            className="flex justify-between items-center px-3 py-1 leading-7"
            href={"#"}
          >
            Event 1 <FaArrowRightLong />
          </Link>
        </div>
        <div className="border-black border-2 rounded-lg bg-[#D9D9D9]">
          <Link
            className="flex justify-between items-center px-3 py-1 leading-7"
            href={"#"}
          >
            Event 1 <FaArrowRightLong />
          </Link>
        </div> */}
      </div>
      <div>
        {assignedNewSchoolAdmin && (
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
        items={admins?.data?.data}
        onClose={() => setIsModalOpen(false)}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}
