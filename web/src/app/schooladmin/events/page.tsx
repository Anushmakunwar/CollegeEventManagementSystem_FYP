"use client";
import Link from "next/link";

export default function AllEvents() {
  const eventDate = [
    {
      name: "today",
      title: "Today Events",
      bg: "bg-green-500/10",
      text: "text-green-600",
    },
    {
      name: "previous",
      title: "Previous Events",
      bg: "bg-red-500/10",
      text: "text-red-600",
    },
    {
      name: "upcoming",
      title: "Upcoming Events",
      bg: "bg-yellow-500/10",
      text: "text-yellow-600",
    },
  ];

  return (
    <div className="px-6 py-10">
      <div className="flex align-middle justify-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          All Events
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {eventDate.map((el, i) => (
          <Link
            href={`/schooladmin/events/list/${el.name}`}
            key={i}
            className={`flex items-center justify-between px-6 py-4 rounded-xl shadow-md border border-gray-200 transition-all hover:scale-[1.02] hover:shadow-lg ${el.bg}`}
          >
            <span className={`text-xl font-semibold ${el.text}`}>
              {el.title}
            </span>
            <span className="text-gray-600 text-lg">&#8594;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
