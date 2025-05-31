"use client";
import { useRouter } from "next/navigation";

export default function AllEvents() {
  const previousEvents = [
    { name: "MERN Stack Workshop" },
    { name: "React Bootcamp" },
    { name: "Database Management Seminar" },
  ];

  const todayEvents = [
    { name: "AI & ML Conference" },
    { name: "Next.js Masterclass" },
    { name: "GraphQL Webinar" },
  ];

  const upcomingEvents = [
    { name: "Cybersecurity Summit" },
    { name: "Web3 & Blockchain Expo" },
    { name: "Tech Startup Pitch Day" },
  ];
  const router = useRouter();
  const onsubmit = (li) => {
    router.push(li);
  };
  return (
    <div className="w-full min-h-screen flex flex-col relative ">
      {/* Hero Section */}
      <div className="relative bg-red-200 h-[60vh] w-full overflow-hidden ">
        <img
          src="left.jpg"
          alt="Event Banner"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0  flex flex-col top-[45%] items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            One Centralized Event Management
          </h1>
          <h2 className="text-3xl md:text-4xl text-white mt-4 drop-shadow-lg">
            Track Your Event History
          </h2>
        </div>
      </div>

      {/* Event Sections */}
      <div className="flex flex-wrap justify-around gap-8 py-16 px-4">
        {/* Previous Events */}
        <EventCard
          title="Previous Events"
          events={previousEvents}
          textColor="text-red-600"
          bgColor="bg-red-100"
          buttonColor="bg-red-500"
          link="/student/events/list/previous/"
        />

        {/* Today Events */}
        <EventCard
          title="Today’s Events"
          events={todayEvents}
          textColor="text-green-600"
          bgColor="bg-green-100"
          buttonColor="bg-green-500"
          link="/student/events/list/today/"
        />

        {/* Upcoming Events */}
        <EventCard
          title="Upcoming Events"
          events={upcomingEvents}
          textColor="text-yellow-600"
          bgColor="bg-yellow-100"
          buttonColor="bg-yellow-500"
          link="/student/events/list/upcoming/"
        />
      </div>
    </div>
  );
}

// Event Card Component
const EventCard = ({
  title,
  events,
  textColor,
  bgColor,
  buttonColor,
  link,
}) => {
  const router = useRouter(); // Define router inside EventCard

  return (
    <div className="w-80 sm:w-96 bg-white shadow-lg rounded-lg overflow-hidden p-6 border border-gray-200 transition-all hover:shadow-2xl">
      <h3 className={`text-2xl font-semibold ${textColor}`}>{title}</h3>
      <p className="text-gray-600 mt-2">All the {title.toLowerCase()}</p>
      <div className={`h-1 w-full mt-2 ${bgColor}`} />

      <div className="mt-4 space-y-2">
        {events.length > 0 ? (
          events.map((ev, idx) => (
            <div
              key={idx}
              className={`${bgColor} text-lg font-medium h-10 flex items-center justify-center rounded-md`}
            >
              {ev.name}
            </div>
          ))
        ) : (
          <div
            className={`${bgColor} text-lg font-medium h-10 flex items-center justify-center rounded-md`}
          >
            No events available
          </div>
        )}
      </div>

      <button
        onClick={() => router.push(link)} // Use router.push directly
        className={`w-full text-white font-medium h-10 rounded-md mt-6 ${buttonColor} transition hover:opacity-90`}
      >
        View All
      </button>
    </div>
  );
};
