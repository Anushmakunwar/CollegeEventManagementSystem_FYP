import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Student() {
  return (
    <div className="mx-4 pt-8 flex flex-col gap-y-4">
      <p className="bg-[#7FC678] rounded-full shadow-[0_0_8px_4px_#ACE3A7]">
        <Link
          href="/student/events/todayevents"
          className="p-4 flex justify-between items-center"
        >
          Today's Events
          <FaArrowRightLong />
        </Link>
      </p>
      <p className="bg-[#F6D775] rounded-full shadow-[0_0_8px_4px_#FAE8B1]">
        <Link
          href="/student/events/upcomingevents"
          className="p-4 flex justify-between items-center"
        >
          Up-coming Events
          <FaArrowRightLong />
        </Link>
      </p>
      <p className="bg-[#4584E9] rounded-full shadow-[0_0_8px_4px_#8DB5F6]">
        <Link
          href="/student/events/pastevents"
          className="p-4 flex justify-between items-center"
        >
          Past Events
          <FaArrowRightLong />
        </Link>
      </p>
    </div>
  );
}
