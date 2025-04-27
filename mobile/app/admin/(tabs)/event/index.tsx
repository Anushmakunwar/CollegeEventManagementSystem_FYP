// app/student/event/index.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const AllEvents = () => {
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
    <View className="px-6 py-10 bg-white flex-1">
      <View className="flex flex-col gap-6">
        {eventDate.map((el, i) => (
          <TouchableOpacity
            key={i}
            className={`flex flex-row items-center justify-between px-6 py-4 rounded-xl shadow-md border border-gray-200 transition-all hover:scale-[1.02] ${el.bg}`}
            onPress={() => {
              console.log("Navigating to:", {
                pathname: "admin/(tabs)/event/list/[key]",
                params: { key: el.name },
              });
              router.push({
                pathname: "/admin/(tabs)/event/list/[key]",
                params: { key: el.name },
              });
            }}
            activeOpacity={0.8}
          >
            <Text className={`text-xl font-semibold ${el.text}`}>
              {el.title}
            </Text>
            <Text className="text-gray-600 text-lg">→</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View  className="flex items-start bg-green-500 mt-5 p-3 w-44 justify-start mb-8 rounded-xl">
        <Text className="text-xl font-extrabold text-white ">
          Create Events
        </Text>
      </View> */}
      <TouchableOpacity
        className="flex flex-row items-center justify-between px-6 py-4 bg-white/70 border border-gray-200 shadow-md rounded-xl mt-[1rem]"
        onPress={() => {
          router.push({
            pathname: "/admin/(tabs)/event/new",
          });
        }}
        activeOpacity={0.8}
      >
        <Text className="text-lg font-semibold text-gray-800">
          Create Event
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllEvents;
