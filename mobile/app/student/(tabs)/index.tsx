import React from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { URLS } from "@/constants";
import useGet from "@/hooks/useGet";
import { format } from "date-fns";
import { Calendar } from "react-native-feather";

export default function StudentProfile() {
  const { isLoading, data } = useGet(
    "eventregister",
    `${URLS.USERS}/std-profile/`
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4B5563" />
      </View>
    );
  }

  const student = data?.data;

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Animated.View entering={FadeInDown.duration(500)} className="p-6 pt-[49px]">
        <View className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <View className="flex-row items-center gap-4 mb-6">
            <Image
              source={{
                uri:
                  student?.images ||
                  "https://png.pngtree.com/png-clipart/20221216/original/pngtree-passport-photo-cartoon-design-png-image_8750031.png",
              }}
              style={{ width: 80, height: 80, borderRadius: 40 }}
              className="border border-gray-200 shadow-sm"
            />
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900">
                {student?.fullName}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">
                {student?.email}
              </Text>
            </View>
          </View>
          <View className="border-t border-gray-200 pt-4 space-y-4">
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Registered Events
              </Text>
              {student?.attendance?.length > 0 ? (
                student.attendance.map((att) => (
                  <View
                    key={att.id}
                    className="flex-row items-center justify-between py-1"
                  >
                    <Text className="text-sm text-gray-600 flex-1">
                      {att.event.name}
                    </Text>
                    <Text
                      className={`text-xs font-semibold ${
                        att.isAttended ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {att.isAttended ? "Attended" : "Not Attended"}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-sm text-gray-500">
                  No events registered.
                </Text>
              )}
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold text-gray-700 w-24">
                Faculty
              </Text>
              <Text className="text-sm text-gray-600 flex-1">
                {student?.faculty?.name || "N/A"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold text-gray-700 w-24">
                School
              </Text>
              <Text className="text-sm text-gray-600 flex-1">
                {student?.school?.name || "N/A"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold text-gray-700 w-24">
                Joined
              </Text>
              <View className="flex-row items-center flex-1">
                <Calendar
                  width={16}
                  height={16}
                  color="#6B7280"
                  className="mr-2"
                />
                <Text className="text-sm text-gray-600">
                  {format(new Date(student?.createdAt), "PPpp")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
