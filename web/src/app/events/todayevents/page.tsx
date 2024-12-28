import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

function TodayEvents() {
  return (
    <div className="px-4">
      <p className="mt-7 mb-4 text-center">Todays Event's</p>
      <div className="flex flex-col gap-4">
        <div className="border-black border-2 rounded-lg bg-[#D9D9D9]">
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
        </div>
        <div className="border-black border-2 rounded-lg bg-[#D9D9D9]">
          <Link
            className="flex justify-between items-center px-3 py-1 leading-7"
            href={"#"}
          >
            Event 1 <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TodayEvents;
