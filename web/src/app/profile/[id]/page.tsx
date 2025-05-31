import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

function Profile() {
  return (
    <div className="mx-4">
      <p className="mt-7 mb-8 text-center text-xl">Profile</p>
      <div className="flex justify-center mb-[32px]">
        <img
          src="/profile.jpg"
          alt="my profile"
          className="w-[86px] h-[86px] object-cover rounded-full"
        />
      </div>
      <p className="text-center text-xl font-bold text-[#1E0E62] mb-4">
        Saira Willams
      </p>
      <p className="text-xs text-center text-[#808080] mb-8">
        example@gmail.com
      </p>
      <div className="text-xs text-[#808080] flex justify-evenly">
        <div>
          <span>13</span> Events
        </div>
        <div>
          <span>6</span> Attended
        </div>
        <div>
          <span>7</span> Missed
        </div>
      </div>
      <div className="flex justify-evenly mt-4">
        <button
          type="submit"
          className="w-[150px] block text-xs font-semibold text-[#1E0E62] bg-[#F0F0F0] rounded-full py-[10px]"
        >
          Change Password
        </button>
        <Link
          href={`/profile/unique/history`}
          type="submit"
          className="w-[150px] text-center block text-xs font-semibold text-[#1E0E62] bg-[#F0F0F0] rounded-full py-[10px]"
        >
          Event History
        </Link>
      </div>
      <div className="mt-4">
        <p className="text-[#808080] text-xs mb-4 text-center">Recent Events</p>
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
    </div>
  );
}

export default Profile;
