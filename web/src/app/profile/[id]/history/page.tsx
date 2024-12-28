import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

function History() {
  return (
    <div className="mx-4">
      <p className="text-center mt-7 mb-8 text-xl text-[#1E0E62]">History</p>
      <div className="flex flex-col gap-4">
        <div className="border-black border-2 rounded-lg bg-[#D9D9D9]">
          <Link
            className="flex justify-between items-center px-3 py-1 leading-7"
            href={"#"}
          >
            Event 1{" "}
            <span className="text-[8px] font-bold text-[#E93A7D] uppercase tracking-wider">
              missed
            </span>{" "}
            <FaArrowRightLong />
          </Link>
        </div>
        <div className="border-black border-2 rounded-lg bg-[#D9D9D9]">
          <Link
            className="flex justify-between items-center px-3 py-1 leading-7"
            href={"#"}
          >
            Event 2{" "}
            <span className="text-[8px] font-bold text-[#40B4A6] uppercase tracking-wider">
              Attended
            </span>{" "}
            <FaArrowRightLong />
          </Link>
        </div>
        <div className="border-black border-2 rounded-lg bg-[#D9D9D9]">
          <Link
            className="flex justify-between items-center px-3 py-1 leading-7"
            href={"#"}
          >
            Event 3{" "}
            <span className="text-[8px] font-bold text-[#E93A7D] uppercase tracking-wider">
              missed
            </span>{" "}
            <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default History;
