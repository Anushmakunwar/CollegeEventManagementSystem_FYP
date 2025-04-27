"use client";
import { URLS } from "@/constants";
import useGet from "@/hooks/useGet";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import {
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaUsers,
} from "react-icons/fa";

export default function EventDetails() {
  const { id } = useParams();
  const { isError, isLoading, data } = useGet(
    "EVENT_API",
    `${URLS.EVENT}/counts`,
    id as string,
  );

  if (isLoading)
    return (
      <div className="text-center text-lg font-semibold text-gray-700 animate-pulse">
        Loading event details...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 font-semibold">
        Error loading event details.
      </div>
    );

  return (
    <div className="w-full mx-auto p-6">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold">{data?.data?.name}</h2>
        <p className="text-lg mt-2 opacity-90">{data?.data?.description}</p>
      </div>

      {/* Event Details Grid */}
      <div className="grid gap-5 mt-6">
        <DetailCard
          icon={<FaUser />}
          label="Host"
          value={data?.data?.hostNames?.join(", ") || "TBD"}
        />
        <DetailCard
          icon={<FaUsers />}
          label="Guests"
          value={data?.data?.guestNames?.join(", ") || "TBD"}
        />
        <DetailCard
          icon={<FaMapMarkerAlt />}
          label="Venue"
          value={data?.data?.venue || "TBD"}
        />
        <DetailCard
          icon={<FaCalendarAlt />}
          label="Event Date"
          value={
            data?.data?.startTime
              ? format(new Date(data?.data?.startTime), "PPpp")
              : "TBD"
          }
        />
        <DetailCard
          icon={<FaClock />}
          label="Registration Deadline"
          value={
            data?.data?.registrationDeadline
              ? format(new Date(data?.data?.registrationDeadline), "P")
              : "TBD"
          }
        />
        <DetailCard
          icon={<FaUsers />}
          label="Total Registered Students"
          value={data?.data?.totalRegisterUser || "0"}
        />
        <DetailCard
          icon={<FaUsers />}
          label="Total Attended Students"
          value={data?.data?.totalAttendedUser || "0"}
        />
      </div>
    </div>
  );
}

// Reusable DetailCard Component
function DetailCard({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/80 shadow-lg rounded-xl backdrop-blur-lg hover:scale-102 transition-all duration-200">
      <div className="text-indigo-600 bg-indigo-100 p-3 rounded-full text-xl">
        {icon}
      </div>
      <div>
        <span className="block text-lg font-semibold text-gray-900">
          {label}
        </span>
        <span className="text-md text-gray-700">{value}</span>
      </div>
    </div>
  );
}
