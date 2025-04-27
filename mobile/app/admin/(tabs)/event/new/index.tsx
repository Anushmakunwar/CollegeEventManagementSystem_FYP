import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { URLS } from "@/constants";
import usePost from "@/hooks/usePost";
import { FormSchema } from "@/validator/createEvent";
import { XCircle } from "react-native-feather";
import { format } from "date-fns";
import { router } from "expo-router";

export default function NewEvent() {
  const navigation = useNavigation();
  const { postMutation, isError, isSuccess, isPending } = usePost("adminEvent");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      hostNames: [{ name: "" }],
      guestNames: [{ name: "" }],
      venue: "",
      registrationDeadline: new Date(),
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const {
    fields: hosts,
    append: addHost,
    remove: removeHost,
  } = useFieldArray({
    control,
    name: "hostNames",
  });

  const {
    fields: guests,
    append: addGuest,
    remove: removeGuest,
  } = useFieldArray({
    control,
    name: "guestNames",
  });

  const [showDatePicker, setShowDatePicker] = useState({
    registrationDeadline: false,
    startTime: false,
    endTime: false,
  });

  useEffect(() => {
    if (isSuccess) {
      router.push({
        pathname: "/admin/(tabs)/event",
      });
    }
    if (isError) {
      console.error("Error creating event:", isError);
    }
  }, [isSuccess, isError, navigation]);

   useEffect(() => {
      navigation.setOptions({
        headerTitle: "Create Event",
      });
    }, [navigation]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      guestNames: data.guestNames.map((el) => el.name),
      hostNames: data.hostNames.map((el) => el.name),
      registrationDeadline: data.registrationDeadline,
      startTime: data.startTime,
      endTime: data.endTime,
    };
    console.log("Payload:", formattedData); // Debug payload
    postMutation({ url: URLS.EVENT, data: formattedData });
  };

  const renderDatePicker = (field, fieldName) => (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <>
          <TouchableOpacity
            onPress={() =>
              setShowDatePicker({ ...showDatePicker, [fieldName]: true })
            }
            className="w-full h-12 px-4 border border-gray-300 rounded-lg flex-row items-center"
          >
            <Text className="flex-1 text-black">
              {value ? format(new Date(value), "PPpp") : "Select Date"}
            </Text>
          </TouchableOpacity>
          {showDatePicker[fieldName] && (
            <DateTimePicker
              value={value instanceof Date ? value : new Date()}
              mode={fieldName === "registrationDeadline" ? "date" : "datetime"}
              textColor="#000"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker({ ...showDatePicker, [fieldName]: false });
                if (selectedDate) onChange(selectedDate);
              }}
            />
          )}
        </>
      )}
    />
  );

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <Animated.View entering={FadeInDown.duration(500)} className="p-6 pt-10">
        <View className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <Text className="text-2xl font-bold text-gray-900 text-center mb-6">
            Create Event
          </Text>
          <View className="space-y-6">
            {/* Event Name */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Event Name
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Basic IT Literacy"
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
                  />
                )}
              />
              {errors.name && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.name.message}
                </Text>
              )}
            </View>

            {/* Event Description */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Event Description
              </Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Your event description here"
                    multiline
                    numberOfLines={4}
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg bg-white"
                  />
                )}
              />
              {errors.description && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.description.message}
                </Text>
              )}
            </View>

            {/* Hosts */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Hosts
              </Text>
              {hosts.map((host, index) => (
                <View key={host.id} className="flex-row items-center mb-3">
                  <Controller
                    control={control}
                    name={`hostNames.${index}.name`}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        placeholder="Host Name"
                        className="flex-1 h-12 px-4 border border-gray-300 rounded-lg bg-white"
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => removeHost(index)}
                    className="ml-2 p-2 bg-red-500 rounded-lg"
                  >
                    <XCircle width={20} height={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => addHost({ name: "" })}
                className="px-4 py-2 bg-blue-500 rounded-lg"
              >
                <Text className="text-white text-sm font-semibold text-center">
                  Add Host
                </Text>
              </TouchableOpacity>
              {errors.hostNames && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.hostNames.message}
                </Text>
              )}
            </View>

            {/* Guests */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Guests
              </Text>
              {guests.map((guest, index) => (
                <View key={guest.id} className="flex-row items-center mb-3">
                  <Controller
                    control={control}
                    name={`guestNames.${index}.name`}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        value={value}
                        onChangeText={onChange}
                        placeholder="Guest Name"
                        className="flex-1 h-12 px-4 border border-gray-300 rounded-lg bg-white"
                      />
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => removeGuest(index)}
                    className="ml-2 p-2 bg-red-500 rounded-lg"
                  >
                    <XCircle width={20} height={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => addGuest({ name: "" })}
                className="px-4 py-2 bg-blue-500 rounded-lg"
              >
                <Text className="text-white text-sm font-semibold text-center">
                  Add Guest
                </Text>
              </TouchableOpacity>
              {errors.guestNames && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.guestNames.message}
                </Text>
              )}
            </View>

            {/* Venue */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Venue
              </Text>
              <Controller
                control={control}
                name="venue"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Event Venue"
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white"
                  />
                )}
              />
              {errors.venue && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.venue.message}
                </Text>
              )}
            </View>

            {/* Registration Deadline */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Registration Deadline
              </Text>
              {renderDatePicker(null, "registrationDeadline")}
              {errors.registrationDeadline && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.registrationDeadline.message}
                </Text>
              )}
            </View>

            {/* Event Date-Time */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Event Date-Time
              </Text>
              {renderDatePicker(null, "startTime")}
              {errors.startTime && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.startTime.message}
                </Text>
              )}
            </View>

            {/* Event End Date-Time */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Event End Date-Time
              </Text>
              {renderDatePicker(null, "endTime")}
              {errors.endTime && (
                <Text className="text-red-600 text-xs mt-1">
                  {errors.endTime.message}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className={`w-full h-12 bg-green-600 rounded-lg flex-row items-center justify-center ${
                isPending ? "opacity-50" : "shadow-sm"
              }`}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                    className="mr-2"
                  />
                  <Text className="text-white text-base font-semibold">
                    Creating...
                  </Text>
                </>
              ) : (
                <Text className="text-white text-base font-semibold">
                  Create Event
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
