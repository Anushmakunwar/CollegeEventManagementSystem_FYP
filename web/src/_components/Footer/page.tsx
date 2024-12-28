import Link from "next/link";
import { FaHome, FaBell } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="absolute bottom-0 flex justify-between items-center px-[16px] h-[64px] bg-[#E4E4E4] w-full">
      <Link href="/">
        <FaHome className="text-[32px]" />
      </Link>
      <Link href="/profile">
        <img
          src="/profile.jpg"
          alt="myprofile"
          className="h-[35px] w-[35px] rounded-full object-cover"
        />
      </Link>
      <Link href="/notifications">
        <FaBell className="text-[32px]" />
      </Link>
    </div>
  );
};

export default Footer;
