"use client";
import { UserStore } from "@/store/UserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {
  const { setIsLoggedIn, isLoggedIn, user, roles } = UserStore(
    (state) => state,
  );

  const router = useRouter();
  if (!isLoggedIn) {
    return router.push("/signin");
  }

  if (isLoggedIn) {
    if (roles.includes("SUPERADMIN")) {
      return router.push("/superadmin");
    } else if (roles.includes("SCHOOLADMIN")) {
      return router.push("/schooladmin");
    } else if (roles.includes("STUDENT")) {
      return router.push("/student");
    } else if (roles.includes("ADMIN")) {
      return router.push("/admin");
    }
  }

  return (
    <div className="mx-4 pt-8 flex flex-col gap-y-4">
      <p className="bg-[#7FC678] rounded-full shadow-[0_0_8px_4px_#ACE3A7]">
        <Link
          href="/events/todayevents"
          className="p-4 flex justify-between items-center"
        >
          Today's Events
          <FaArrowRightLong />
        </Link>
      </p>
      <p className="bg-[#F6D775] rounded-full shadow-[0_0_8px_4px_#FAE8B1]">
        <Link
          href="/events/upcomingevents"
          className="p-4 flex justify-between items-center"
        >
          Up-coming Events
          <FaArrowRightLong />
        </Link>
      </p>
      <p className="bg-[#4584E9] rounded-full shadow-[0_0_8px_4px_#8DB5F6]">
        <Link
          href="/events/pastevents"
          className="p-4 flex justify-between items-center"
        >
          Past Events
          <FaArrowRightLong />
        </Link>
      </p>
    </div>
  );
}
