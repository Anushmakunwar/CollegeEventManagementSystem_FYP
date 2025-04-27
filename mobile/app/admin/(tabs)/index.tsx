import React from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { URLS } from "../../../constants"; // Adjust path to your constants file
import useGet from "../../../hooks/useGet"; // Adjust path to your useGet hook
import { format } from "date-fns";
import { Feather } from "@expo/vector-icons";

export default function AdminProfile() {
  const { isLoading, data } = useGet(
    "adminProfile",
    `${URLS.USERS}/admin-profile/`
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4B5563" />
      </View>
    );
  }

  const admin = data?.data;

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Animated.View entering={FadeInDown.duration(500)} className="p-6 pt-12">
        <View className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <View className="flex-row items-center gap-4 mb-6">
            <Image
              source={{
                uri:
                  admin?.images ||
                  "https://png.pngtree.com/png-clipart/20221216/original/pngtree-passport-photo-cartoon-design-png-image_8750031.png",
              }}
              style={{ width: 80, height: 80, borderRadius: 40 }}
              className="border border-gray-200 shadow-sm"
            />
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900">
                {admin?.fullName || "N/A"}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">
                {admin?.email || "N/A"}
              </Text>
            </View>
          </View>
          <View className="border-t border-gray-200 pt-4 space-y-4">
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold text-gray-700 w-24">
                Username
              </Text>
              <Text className="text-sm text-gray-600 flex-1">
                {admin?.fullName || "N/A"}{" "}
                {/* Replace with admin?.username if available */}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold text-gray-700 w-24">
                Faculty
              </Text>
              <Text className="text-sm text-gray-600 flex-1">
                {admin?.faculty?.name || "N/A"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold text-gray-700 w-24">
                School
              </Text>
              <Text className="text-sm text-gray-600 flex-1">
                {admin?.school?.name || "N/A"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm font-semibold text-gray-700 w-24">
                Joined
              </Text>
              <View className="flex-row items-center flex-1">
                <Feather
                  name="calendar"
                  size={16}
                  color="#6B7280"
                  className="mr-2"
                />
                <Text className="text-sm text-gray-600">
                  {admin?.createdAt
                    ? format(new Date(admin?.createdAt), "PPpp")
                    : "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
