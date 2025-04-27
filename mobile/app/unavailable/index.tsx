import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Animated, { FadeInDown, ZoomIn } from "react-native-reanimated";
import { Lock, Smartphone } from "react-native-feather";
import { Redirect, router } from "expo-router";

export default function NotAvailable() {
  const openAppStore = () => {
    // Replace with actual app store links
    router.push({
      pathname: "..",
    });
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center p-6">
      <Animated.View
        entering={FadeInDown.duration(500)}
        className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 p-6 items-center"
      >
        <Animated.View entering={ZoomIn.delay(200).springify()}>
          <Lock width={48} height={48} color="#EF4444" className="mb-4" />
        </Animated.View>
        <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
          Feature Not Available
        </Text>
        <Text className="text-sm text-gray-600 leading-6 text-center mb-4">
          This application is only available for{" "}
          <Text className="font-semibold">Admin</Text> and{" "}
          <Text className="font-semibold">Student</Text> roles as of now.
          SchoolAdmin and SuperAdmin roles do not have access right now.
        </Text>
        <Text className="text-sm text-gray-500 text-center mb-6">
          Ensure you're using the correct role in the app!
        </Text>
        <TouchableOpacity
          onPress={openAppStore}
          className="bg-green-600 py-3 px-6 rounded-lg flex-row items-center justify-center"
        >
          <Smartphone width={20} height={20} color="#FFFFFF" className="mr-2" />
          <Text className="text-white text-base font-semibold">Go Back</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
