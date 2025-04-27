import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";
import { URLS } from "../../../../../constants"; 
import useGet from "../../../../../hooks/useGet";
import { useNavigation } from "expo-router";


const EventDetails = () => {
  const route = useRoute();
    const navigation = useNavigation();
  
  const { id } = route.params || {};
  const { isError, isLoading, data } = useGet(
    "EVENT_API",
    `${URLS.EVENT}/counts`,
    id
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Event Details",
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="mt-2 text-lg font-semibold text-gray-700">
          Loading event details...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg font-semibold text-red-500">
          Error loading event details.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header Section */}
      <View className="mx-4  bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl shadow-lg">
        <Text className="text-4xl font-bold text-gray-900">
          {data?.data?.name}
        </Text>
        <Text className="text-lg mt-2 text-gray-900 opacity-90">
          {data?.data?.description}
        </Text>
      </View>

      {/* Event Details Grid */}
      <View className="mx-4 mt-3 space-y-5 gap-2 ">
        <DetailCard
          icon={<FontAwesome name="user" size={24}  color="#4f46e5" />}
          label="Host"
          value={data?.data?.hostNames?.join(", ") || "TBD"}
        
        />
        <DetailCard
          icon={<FontAwesome name="users" size={24} color="#4f46e5" />}
          label="Guests"
          value={data?.data?.guestNames?.join(", ") || "TBD"}
        />
        <DetailCard
          icon={<FontAwesome name="map-marker" size={24} color="#4f46e5" />}
          label="Venue"
          value={data?.data?.venue || "TBD"}
        />
        <DetailCard
          icon={<FontAwesome name="calendar" size={24} color="#4f46e5" />}
          label="Event Date"
          value={
            data?.data?.startTime
              ? format(new Date(data?.data?.startTime), "PPpp")
              : "TBD"
          }
        />
        <DetailCard
          icon={<FontAwesome name="clock-o" size={24} color="#4f46e5" />}
          label="Registration Deadline"
          value={
            data?.data?.registrationDeadline
              ? format(new Date(data?.data?.registrationDeadline), "P")
              : "TBD"
          }
        />
        <DetailCard
          icon={<FontAwesome name="users" size={24} color="#4f46e5" />}
          label="Total Registered Students"
          value={data?.data?.totalRegisterUser?.toString() || "0"}
        />
        <DetailCard
          icon={<FontAwesome name="users" size={24} color="#4f46e5" />}
          label="Total Attended Students"
          value={data?.data?.totalAttendedUser?.toString() || "0"}
        />
      </View>
    </ScrollView>
  );
};

// Reusable DetailCard Component
const DetailCard = ({ icon, label, value }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center gap-4 p-4 bg-white/80 shadow-lg rounded-xl active:opacity-80"
      activeOpacity={0.8}
    >
      <View className="text-indigo-600 bg-indigo-100 p-3 rounded-full">
        {icon}
      </View>
      <View>
        <Text className="text-lg font-semibold text-gray-900">{label}</Text>
        <Text className="text-md text-gray-700">{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventDetails;
