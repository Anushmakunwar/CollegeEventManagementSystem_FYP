import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useGet from "../../../../../hooks/useGet";
import usePost from "../../../../../hooks/usePost";
import { URLS } from "../../../../../constants";
import { format, isBefore, isPast } from "date-fns";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation, useLocalSearchParams } from "expo-router";
const EventDetail = () => {
  const route = useRoute();
  const { id: eventId } = route.params || {};
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);

  const { isLoading, data } = useGet(
    "eventregister",
    `${URLS.EVENT}/`,
    eventId
  );
  const { postMutation, isPending } = usePost("eventregister");
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Event Details",
    });
  }, [navigation]);
  const onSubmit = async () => {
    try {
      await postMutation({
        url: `${URLS.EVENT}/register-event/${data?.data?.id}`,
        data,
      });
    } catch (error) {
      console.log("err");
      // setErrorMessage("Failed to register. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#4B5563" />
      </View>
    );
  }

  const isRegistrationClosed =
    data?.data?.registrationDeadline &&
    isBefore(new Date(data?.data?.registrationDeadline), new Date());

  const isEventPast =
    data?.data?.startTime && isPast(new Date(data?.data?.startTime));

  const isRegistered = data?.data?.isRegister;

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Animated.View entering={FadeInDown.duration(600)} className="p-6 mt-4">
        <View className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <View className="p-6">
            <Text className="text-3xl font-bold text-gray-900 mb-3">
              {data?.data?.name}
            </Text>
            <Text className="text-base text-gray-600 leading-6">
              {data?.data?.description}
            </Text>
          </View>

          <View className="px-6 pb-6 space-y-4">
            <View className="flex-row items-center">
              <Text className="text-gray-700 font-semibold w-32">Host:</Text>
              <Text className="text-gray-600 flex-1">
                {data?.data?.hostNames?.join(", ") || "N/A"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-700 font-semibold w-32">Guests:</Text>
              <Text className="text-gray-600 flex-1">
                {data?.data?.guestNames?.join(", ") || "N/A"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-700 font-semibold w-32">Venue:</Text>
              <Text className="text-gray-600 flex-1">
                {data?.data?.venue || "TBD"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-700 font-semibold w-32">Date:</Text>
              <Text className="text-gray-600 flex-1">
                {data?.data?.startTime
                  ? format(new Date(data?.data?.startTime), "PPpp")
                  : "TBD"}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-700 font-semibold w-32">
                Deadline:
              </Text>
              <Text className="text-gray-600 flex-1">
                {data?.data?.registrationDeadline
                  ? format(new Date(data?.data?.registrationDeadline), "P")
                  : "TBD"}
              </Text>
            </View>

            {errorMessage && (
              <View className="p-4 rounded-lg bg-red-100">
                <Text className="text-sm text-red-800">{errorMessage}</Text>
              </View>
            )}

            {isRegistered ? (
              <View className="mt-6 p-4 bg-blue-100 rounded-lg">
                <Text className="text-blue-800 text-center font-semibold">
                  You are already registered for this event!
                </Text>
              </View>
            ) : isEventPast ? (
              <View className="mt-6 p-4 bg-gray-100 rounded-lg">
                <Text className="text-gray-600 text-center font-semibold">
                  This event has already occurred
                </Text>
              </View>
            ) : isRegistrationClosed ? (
              <View className="mt-6 p-4 bg-gray-100 rounded-lg">
                <Text className="text-gray-600 text-center font-semibold">
                  Registration is closed
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                className={`mt-6 w-full bg-green-600 py-4 rounded-xl flex-row items-center justify-center ${
                  isPending ? "opacity-50" : "shadow-md"
                }`}
                onPress={onSubmit}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <ActivityIndicator
                      size="small"
                      color="#FFFFFF"
                      className="mr-2"
                    />
                    <Text className="text-white text-lg font-semibold">
                      Registering...
                    </Text>
                  </>
                ) : (
                  <Text className="text-white text-lg font-semibold">
                    Register Now
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default EventDetail;
