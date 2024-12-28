import Link from "next/link";

export default function Header() {
  return (
    <div className="h-[64px] bg-[#E4E4E4] w-full px-4 flex items-center justify-between">
      <div className="text-2xl font-bold">
        <Link href="/">CEMS</Link>
      </div>
      <p className="text-xs underline">Log-out</p>
    </div>
  );
}
