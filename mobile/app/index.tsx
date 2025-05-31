import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import usePost from "../hooks/usePost";
import { setToken } from "../utils/session";
import { UserStore } from "../store/UserStore";
import { URLS } from "../constants";
import Toast from "react-native-toast-message";

import * as leftIMage from "../public/singin.jpg";
import { FormSchema } from "../validator/login.schema";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { withNativeWind } from "nativewind";

type LoginForm = z.infer<typeof FormSchema>;

type RootStackParamList = {
  SuperAdmin: undefined;
  SchoolAdmin: undefined;
  Student: undefined;
  Admin: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// type NavigationProp = StackNavigationProp<RootStackParamList>;

function LoginScreen() {
  const navigation = useNavigation();
  const { postMutation, data, isSuccess, isPending, error, errMsg } =
    usePost("");
  const { setIsLoggedIn, isLoggedIn, user, roles } = UserStore(
    (state) => state
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      if (roles.includes("SUPERADMIN")) {
        navigation.navigate("unavailable/index"); // Ensure this route exists
      } else if (roles.includes("SCHOOLADMIN")) {
        navigation.navigate("unavailable/index"); // Use scanner/index
      } else if (roles.includes("STUDENT")) {
        // navigation.navigate("student/event/index"); // Use camera/index
        navigation.navigate("student/(tabs)"); // Use camera/index
      } else if (roles.includes("ADMIN")) {
        navigation.navigate("admin/(tabs)"); // Use camera/index
      }
    }
  }, [isLoggedIn, roles, navigation]);
  useEffect(() => {
    if (isSuccess && data?.data?.accessToken) {
      setToken(data.data.accessToken);
      setIsLoggedIn(data.data);
    }
  }, [data, isSuccess, setIsLoggedIn]);
  useEffect(() => {
    if (errMsg) {
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: errMsg,
      });
    }
  }, [errMsg]);
  const onSubmit = async (formData: LoginForm) => {
    postMutation({ url: URLS.AUTH + "/login", data: formData });
  };
  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-black">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Background Image */}
      <Image
        source={require("../public/singin.jpg")}
        className="absolute w-full h-full opacity-30"
        resizeMode="cover"
      />

      {/* Form Container */}
      <View className="flex-1 justify-center px-5 bg-white/80">
        <Text className="text-4xl font-bold text-left">
          Welcome to the Event
        </Text>
        <Text className="text-4xl font-bold text-left mb-6">
          Management App
        </Text>

        {/* Form */}
        <View className="space-y-4">
          {/* Email Input */}
          <View>
            <Text className="text-2xl font-bold p-2">Email</Text>
            <TextInput
              className={`w-full h-12 px-4 border rounded-full focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              } bg-white`}
              placeholder="example@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setValue("email", text)}
            />
            {errors.email && (
              <Text className="text-red-500 mt-1">{errors.email.message}</Text>
            )}
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-2xl font-bold p-2">Password</Text>
            <TextInput
              className={`w-full h-12 px-4 border rounded-full focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              } bg-white`}
              placeholder="helloworld@2"
              secureTextEntry
              onChangeText={(text) => setValue("password", text)}
            />
            {errors.password && (
              <Text className="text-red-500 mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text className="text-right text-red-500 text-sm">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            className="w-full h-12 bg-green-400 rounded-full justify-center items-center"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white font-bold text-lg">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="my-6 flex-row items-center justify-between">
          <View className="w-5/12 border-t border-gray-300" />
          <Text className="text-sm px-2 text-gray-500">Or</Text>
          <View className="w-5/12 border-t border-gray-300" />
        </View>

        {/* Register Link */}
        <View className="flex-row justify-center items-center">
          <Text className="text-sm text-gray-600">New to the App?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-blue-500 font-bold ml-2">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;
