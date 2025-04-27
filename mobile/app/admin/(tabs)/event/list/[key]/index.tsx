import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, router, useNavigation } from "expo-router";
import useList from "../../../../../../hooks/useList";
import { URLS } from "../../../../../../constants";

const EventList = () => {
  const { key } = useLocalSearchParams();
  console.log("Received key:", key);
  const navigation = useNavigation();

  const [page, setPage] = useState(1);

  const { data, isError, isLoading } = useList(
    "studentEvent",
    `${URLS.EVENT}/list?filter=${key}`,
    page,
    7
  );
  console.log(data, "dffffffffffff");

  const totalEvents = data?.data?.total || 0;
  const totalPages = Math.ceil(totalEvents / 10);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Event List",
    });
  }, [navigation]);

  return (
    <ScrollView
      className="px-8 py-9 bg-gray-100 w-full h-svh flex flex-col"
      contentContainerStyle={{ alignItems: "center" }}
    >
      {/* <Text className="text-4xl font-extrabold text-gray-800 mb-8">
        All Events
      </Text> */}

      <ScrollView className="w-[100vw] flex flex-col px-6 h-[60vh]">
        {isLoading ? (
          <Text className="text-lg text-gray-600 text-center">Loading...</Text>
        ) : isError ? (
          <Text className="text-lg text-red-600 text-center">
            Error loading events
          </Text>
        ) : data?.data?.data?.length > 0 ? (
          data.data.data.map((el, i) => (
            <TouchableOpacity
              key={i}
              className="flex flex-row items-center justify-between px-6 py-4 bg-white/70 border border-gray-200 shadow-md rounded-xl mt-[1rem]"
              onPress={() => {
                console.log("Navigating to EventDetail:", {
                  pathname: "admin/(tabs)/event/[id]",
                  params: { id: el.id },
                });
                router.push({
                  pathname: "/admin/(tabs)/event/[id]",
                  params: { id: el.id },
                });
              }}
              activeOpacity={0.8}
            >
              <Text className="text-lg font-semibold text-gray-800">
                {el.name}
              </Text>
              <Text className="text-gray-500 text-lg">→</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View className="flex items-center h-96 w-full">
            <View className="bg-white p-8 rounded-lg shadow-lg text-center w-full">
              <Text className="text-6xl text-gray-400 mb-4">📅</Text>
              <Text className="text-2xl font-semibold text-gray-800">
                No Event Available
              </Text>
              <Text className="text-gray-600 mt-2">
                It looks like there are no events right now. Please check back
                later!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {totalPages > 1 && (
        <View
          className={`flex flex-row justify-center items-center gap-4 mt-2 opacity-100`}
          style={{
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            className="px-5 py-2 bg-white/70 border border-gray-300 rounded-lg text-gray-700 font-medium"
            style={{
              opacity: page === 1 ? 0.5 : 1,
            }}
            onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <Text>Previous</Text>
          </TouchableOpacity>
          <Text className="text-gray-800 font-semibold">
            Page {page} of {totalPages || 1}
          </Text>
          <TouchableOpacity
            className="px-5 py-2 bg-white/70 border border-gray-300 rounded-lg text-gray-700 font-medium"
            style={{
              opacity: page === totalPages ? 0.5 : 1,
            }}
            onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default EventList;
