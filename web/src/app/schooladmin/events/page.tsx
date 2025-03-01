"use client";
import { URLS } from "@/constants";
import useList from "@/hooks/useList";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function AllEvents() {
  const [events, setEvents] = useState({});

  const { data, isError, isLoading } = useList(
    "schoolAdminEvent",
    `${URLS.EVENT}/list`,
    1,
    10,
  );
  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data, setEvents]);
  console.log(events);
  return (
    <div>
      {events?.data?.data.map((el, i) => (
        <div key={i} className="border-black border-2 rounded-lg bg-[#D9D9D9]">
          <Link
            className="flex justify-between items-center px-3 py-1 leading-7"
            href={"#"}
          >
            {el.name} <FaArrowRightLong />
          </Link>
        </div>
      ))}
    </div>
  );
}
