"use client";

import { URLS } from "@/constants";
import useGet from "@/hooks/useGet";
import { useParams } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";

export default function StudentProfile() {
  const { isLoading, data } = useGet("eventregister", `${URLS.USERS}/std-profile/`);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const student = data?.data;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={student?.images || "https://png.pngtree.com/png-clipart/20221216/original/pngtree-passport-photo-cartoon-design-png-image_8750031.png"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full border shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{student?.fullName}</h2>
            <p className="text-gray-600">{student?.email}</p>
          </div>
        </div>
        <div className="space-y-4 border-t pt-4">
          <div>
            <span className="font-semibold text-gray-700">Registered Events:</span>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {student?.attendance?.length > 0 ? (
                student.attendance.map((att) => (
                  <li key={att.id}>
                    {att.event.name} - {att.isAttended ? "Attended" : "Not Attended"}
                  </li>
                ))
              ) : (
                <p>No events registered.</p>
              )}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Faculty:</span>
            <p className="text-gray-600">{student?.faculty?.name || "N/A"}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">School:</span>
            <p className="text-gray-600">{student?.school?.name || "N/A"}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Account Created:</span>
            <p className="text-gray-600">{format(new Date(student?.createdAt), "PPpp")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
